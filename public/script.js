// script.js completo con navegación SPA y funcionalidades existentes

// ===== 1. Configuración Firebase =====
const firebaseConfig = {
  apiKey: "AIzaSyAj2p3jlAfrssl_cVFCCmm0V6HQkAA2siM",
  authDomain: "monitoreovibracion.firebaseapp.com",
  databaseURL: "https://monitoreovibracion-default-rtdb.firebaseio.com",
  projectId: "monitoreovibracion",
  storageBucket: "monitoreovibracion.appspot.com",
  messagingSenderId: "630972539103",
  appId: "1:630972539103:web:b2f799725e752aa31c896a"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ===== 2. Referencias al DOM =====
const timeDomainChartCanvas = document.getElementById('timeDomainChart');
const accYInstantSpan   = document.getElementById('accY-instant');
const amplitudeYPpSpan  = document.getElementById('amplitudeY-pp');
const frequencyYDomSpan = document.getElementById('frequencyY-dom');
const periodYSpan       = document.getElementById('periodY');
const fetchDataButton   = document.getElementById('fetch-data-btn');
const statusMessageDiv  = document.getElementById('status-message');
const clearPageButton   = document.getElementById('clear-page-btn');
const exportPdfButton   = document.getElementById('export-pdf-btn');

let timeDomainChart = null;

// ===== 3. Crear/Actualizar Gráfica =====
function createOrUpdateChart(timeData, displacementData) {
  if (timeDomainChart) timeDomainChart.destroy();
  timeDomainChart = new Chart(
    timeDomainChartCanvas.getContext('2d'),
    {
      type: 'line',
      data: {
        labels: timeData,
        datasets: [{
          label: 'Desplazamiento Eje Y (mm)',
          data: displacementData,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: 'Tiempo Relativo (ms)' },
            min: Math.min(...timeData),
            max: Math.max(...timeData)
          },
          y: {
            title: { display: true, text: 'Desplazamiento (mm)' },
            min: Math.min(...displacementData) - 10,
            max: Math.max(...displacementData) + 10
          }
        }
      }
    }
  );
}

// ===== 4. Cálculo de Métricas =====
function calculateMetrics(dataPoints, intervalMs, timeData) {
  if (!dataPoints.length) {
    return { instant: '--', peakToPeak: '--', dominantFrequency: '--', period: '--', displacement: [] };
  }

  const gravity  = 9.81;
  const baseline = 11.35;
  const corrected = dataPoints.map(p => (p - baseline) * gravity);
  const intervalSec = intervalMs / 1000;
  const displacementData = corrected.map(a => 0.5 * a * intervalSec * intervalSec * 1000);

  const instantAcceleration = corrected.at(-1).toFixed(2) + ' m/s²';
  const peakToPeakAmplitude = Math.abs(Math.max(...displacementData) - Math.min(...displacementData));
  const peakToPeak = peakToPeakAmplitude.toFixed(2) + ' mm';

  // Zero-crossing frequency estimation
  let dominantFrequency = '--', period = '--';
  let crossings = 0;
  for (let i = 1; i < displacementData.length; i++) {
    if (displacementData[i-1] < 0 && displacementData[i] >= 0) crossings++;
    if (displacementData[i-1] > 0 && displacementData[i] <= 0) crossings++;
  }
  if (crossings >= 2) {
    const totalTimeSec = (timeData.at(-1) - timeData[0]) / 1000;
    const cycles = crossings / 2;
    const freq = cycles / totalTimeSec;
    dominantFrequency = freq.toFixed(2) + ' Hz';
    period = (1 / freq).toFixed(2) + ' s';
  }

  return { instant: instantAcceleration, peakToPeak, dominantFrequency, period, displacement: displacementData.map(d => +d.toFixed(2)) };
}

// ===== 5. Fetch y UI update =====
async function fetchLatestVibrationData() {
  statusMessageDiv.textContent = 'Buscando datos...';
  try {
    let snap = await database.ref('lecturas').once('value');
    if (!snap.exists()) {
      snap = await database.ref('vibration_batches/lote/lecturas').once('value');
      if (!snap.exists()) throw new Error('No hay datos disponibles.');
    }
    const raw = snap.val();
    const timeData = [], amplitudeData = [];
    Object.values(raw).forEach(p => { timeData.push(p.tiempo_ms); amplitudeData.push(p.amplitud); });
    const interval = timeData.length >= 2 ? timeData[1] - timeData[0] : 20;
    const metrics = calculateMetrics(amplitudeData, interval, timeData);
    createOrUpdateChart(timeData, metrics.displacement);
    accYInstantSpan.textContent = metrics.instant;
    amplitudeYPpSpan.textContent = metrics.peakToPeak;
    frequencyYDomSpan.textContent = metrics.dominantFrequency;
    periodYSpan.textContent = metrics.period;
    statusMessageDiv.textContent = 'Datos cargados correctamente';
  } catch (e) {
    console.error(e);
    statusMessageDiv.textContent = 'Error: ' + e.message;
    clearChartAndMetrics();
  }
}

// ===== 6. Limpiar UI =====
function clearChartAndMetrics() {
  if (timeDomainChart) timeDomainChart.destroy();
  accYInstantSpan.textContent = '--';
  amplitudeYPpSpan.textContent = '--';
  frequencyYDomSpan.textContent = '--';
  periodYSpan.textContent = '--';
  statusMessageDiv.textContent = 'Pantalla limpiada.';
}

// ===== 7. Exportar a PDF =====
async function exportToPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Reporte de Vibración', 10, 10);
  const img = timeDomainChartCanvas.toDataURL('image/png');
  doc.addImage(img, 'PNG', 10, 20, 180, 80);
  doc.setFontSize(12);
  doc.text('Métricas:', 10, 110);
  doc.text('Aceleración Instantánea: ' + accYInstantSpan.textContent, 10, 120);
  doc.text('Amplitud Pico-Pico: ' + amplitudeYPpSpan.textContent, 10, 130);
  doc.text('Frecuencia Dominante: ' + frequencyYDomSpan.textContent, 10, 140);
  doc.text('Período: ' + periodYSpan.textContent, 10, 150);
  const now = new Date();
  doc.text('Fecha y hora del reporte: ' + now.toLocaleString(), 10, 160);
  doc.save('reporte_vibracion.pdf');
}

// ===== 8. Listeners y navegación SPA =====
document.addEventListener('DOMContentLoaded', () => {
  fetchDataButton.addEventListener('click', fetchLatestVibrationData);
  clearPageButton.addEventListener('click', clearChartAndMetrics);
  exportPdfButton.addEventListener('click', exportToPdf);

  // Navegación SPA y menú hamburguesa
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav     = document.querySelector('.navbar-nav');
  navbarToggler.addEventListener('click', () => navbarNav.classList.toggle('active'));

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.dataset.target).classList.add('active');
      navbarNav.classList.remove('active');
    });
  });
});
    