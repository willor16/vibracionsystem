// rellenar estos espacios con los datos de firebase
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const timeDomainChartCanvas = document.getElementById('timeDomainChart');
const accYInstantSpan = document.getElementById('accY-instant');
const amplitudeYPpSpan = document.getElementById('amplitudeY-pp');
const frequencyYDomSpan = document.getElementById('frequencyY-dom');
const periodYSpan = document.getElementById('periodY');
const fetchDataButton = document.getElementById('fetch-data-btn');
const statusMessageDiv = document.getElementById('status-message');
const clearPageButton = document.getElementById('clear-page-btn');
const exportPdfButton = document.getElementById('export-pdf-btn');

const resetZoomBtn = document.getElementById('reset-zoom-btn');

let timeDomainChartInstance = null; 

function createOrUpdateChart(chartData) {
    if (timeDomainChartInstance) {
        timeDomainChartInstance.destroy();
    }
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y'
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Tiempo (ms)',
                    font: { size: 14, weight: 'bold' }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Desplazamiento (mm)',
                    font: { size: 14, weight: 'bold' }
                }
            }
        },
        plugins: {
            legend: { display: false },

            decimation: {
                enabled: true,
                algorithm: 'lttb', 
                samples: 500,     
                threshold: 1000   
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    onPanComplete: () => { resetZoomBtn.style.display = 'inline-block'; }
                },
                zoom: {
                    wheel: { enabled: true },
                    pinch: { enabled: true },
                    mode: 'x',
                    onZoomComplete: () => { resetZoomBtn.style.display = 'inline-block'; }
                }
            }
        }
    };

    timeDomainChartInstance = new Chart(timeDomainChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            datasets: [{
                label: 'Desplazamiento Eje Y (mm)',
                data: chartData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
                borderWidth: 1.5,
                pointRadius: 0 
            }]
        },
        options: chartOptions
    });
}

function computeFFT(data, sampleRate) {
  const n = data.length;
  if (n & (n - 1)) {
    const pow2 = Math.pow(2, Math.ceil(Math.log2(n)));
    while (data.length < pow2) data.push(0);
  }
  const re = data.slice();
  const im = new Array(data.length).fill(0);

  function fft(re, im) {
    const N = re.length;
    if (N <= 1) return;
    const evenRe = [], evenIm = [], oddRe = [], oddIm = [];
    for (let i = 0; i < N / 2; i++) {
      evenRe.push(re[i * 2]); evenIm.push(im[i * 2]);
      oddRe.push(re[i * 2 + 1]); oddIm.push(im[i * 2 + 1]);
    }
    fft(evenRe, evenIm);
    fft(oddRe, oddIm);
    for (let k = 0; k < N / 2; k++) {
      const tRe = Math.cos(-2 * Math.PI * k / N) * oddRe[k] - Math.sin(-2 * Math.PI * k / N) * oddIm[k];
      const tIm = Math.sin(-2 * Math.PI * k / N) * oddRe[k] + Math.cos(-2 * Math.PI * k / N) * oddIm[k];
      re[k] = evenRe[k] + tRe;
      im[k] = evenIm[k] + tIm;
      re[k + N / 2] = evenRe[k] - tRe;
      im[k + N / 2] = evenIm[k] - tIm;
    }
  }
  fft(re, im);
  return re.map((r, i) => Math.sqrt(r * r + im[i] * im[i]));
}

function calculateMetrics(dataPoints, intervalMs, timeData) {
    if (!dataPoints.length) {
        return { instant: '--', peakToPeak: '--', dominantFrequency: '--', period: '--', chartData: [] };
    }
    const gravity = 9.81;
    const baseline = 11.35;
    const corrected = dataPoints.map(p => (p - baseline) * gravity);
    const intervalSec = intervalMs / 1000;
    const displacementData = corrected.map(a => 0.5 * a * intervalSec * intervalSec * 1000);

    const instantAcceleration = corrected.at(-1).toFixed(2) + ' m/s²';
    const peakToPeakAmplitude = Math.abs(Math.max(...displacementData) - Math.min(...displacementData));
    const peakToPeak = peakToPeakAmplitude.toFixed(2) + ' mm';

    let dominantFrequency = '--', period = '--';
    if (displacementData.length >= 16) {
        const fftMag = computeFFT(displacementData.slice(), 1);
        const maxIndex = fftMag.slice(1, fftMag.length / 2).reduce((maxIdx, val, idx, arr) => val > arr[maxIdx] ? idx : maxIdx, 0) + 1;
        const sampleRate = 1000 / intervalMs;
        const freq = maxIndex * sampleRate / displacementData.length;
        dominantFrequency = freq.toFixed(2) + ' Hz';
        period = (1 / freq).toFixed(2) + ' s';
    }

    const chartData = timeData.map((time, index) => ({
        x: time,
        y: parseFloat(displacementData[index].toFixed(2))
    }));

    return { instant: instantAcceleration, peakToPeak, dominantFrequency, period, chartData };
}

async function fetchLatestVibrationData() {
    statusMessageDiv.textContent = 'Buscando y procesando datos...';
    statusMessageDiv.style.color = '#007bff';
    statusMessageDiv.style.display = 'block';
    try {
        let snap = await database.ref('lecturas').once('value');
        if (!snap.exists()) {
            snap = await database.ref('vibration_batches/lote/lecturas').once('value');
            if (!snap.exists()) throw new Error('No se encontraron datos en las rutas esperadas.');
        }
        const raw = snap.val();
        const timeData = [], amplitudeData = [];
        Object.values(raw).forEach(p => { timeData.push(p.tiempo_ms); amplitudeData.push(p.amplitud); });
        const interval = timeData.length >= 2 ? timeData[1] - timeData[0] : 20;
        
        const metrics = calculateMetrics(amplitudeData, interval, timeData);
        
        createOrUpdateChart(metrics.chartData);
        
        accYInstantSpan.textContent = metrics.instant;
        amplitudeYPpSpan.textContent = metrics.peakToPeak;
        frequencyYDomSpan.textContent = metrics.dominantFrequency;
        periodYSpan.textContent = metrics.period;
        statusMessageDiv.textContent = 'Datos cargados correctamente. ¡Puedes hacer zoom y pan en la gráfica!';
        statusMessageDiv.style.color = '#28a745';
    } catch (e) {
        console.error(e);
        statusMessageDiv.textContent = 'Error: ' + e.message;
        statusMessageDiv.style.color = '#dc3545';
        clearChartAndMetrics();
    }
}

function clearChartAndMetrics() {
    if (timeDomainChartInstance) {
        timeDomainChartInstance.destroy();
        timeDomainChartInstance = null;
    }
    accYInstantSpan.textContent = '--';
    amplitudeYPpSpan.textContent = '--';
    frequencyYDomSpan.textContent = '--';
    periodYSpan.textContent = '--';
    statusMessageDiv.textContent = 'Pantalla limpiada. Listo para una nueva búsqueda.';
    statusMessageDiv.style.display = 'block';
    
    resetZoomBtn.style.display = 'none';
}

async function exportToPdf() {
    const { jsPDF } = window.jspdf;
    const chartExportContainer = document.getElementById('chart-export-container');
    const metricsPanel = document.querySelector('.metrics-panel');
    
    if (!timeDomainChartInstance) {
        statusMessageDiv.textContent = 'No hay datos para exportar. Por favor, busca un lote primero.';
        statusMessageDiv.style.color = '#dc3545';
        statusMessageDiv.style.display = 'block';
        return;
    }

    statusMessageDiv.textContent = 'Generando PDF de alta resolución...';
    statusMessageDiv.style.color = '#007bff';
    statusMessageDiv.style.display = 'block';
    
    try {
        const chartCanvas = await html2canvas(chartExportContainer, { 
            scale: 3, 
            useCORS: true, 
            backgroundColor: '#ffffff' 
        });
        const chartImageData = chartCanvas.toDataURL('image/png', 1.0);

        const metricsCanvas = await html2canvas(metricsPanel, { 
            scale: 2, 
            backgroundColor: '#ffffff' 
        });
        const metricsImageData = metricsCanvas.toDataURL('image/png', 1.0);
        
        const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;

        // Añadir Título
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.text('Reporte de Análisis de Vibraciones', pdfWidth / 2, margin, { align: 'center' });
        pdf.setFontSize(10);
        pdf.text(`Fecha: ${new Date().toLocaleString()}`, pdfWidth / 2, margin + 8, { align: 'center' });

        const chartImgProps = pdf.getImageProperties(chartImageData);
        const chartAspectRatio = chartImgProps.height / chartImgProps.width;
        const chartWidth = pdfWidth - 2 * margin;
        const chartHeight = chartWidth * chartAspectRatio;
        pdf.addImage(chartImageData, 'PNG', margin, margin + 20, chartWidth, chartHeight);


        const metricsImgProps = pdf.getImageProperties(metricsImageData);
        const metricsAspectRatio = metricsImgProps.height / metricsImgProps.width;
        const metricsWidth = pdfWidth - 2 * margin;
        const metricsHeight = metricsWidth * metricsAspectRatio;
        pdf.addImage(metricsImageData, 'PNG', margin, margin + 30 + chartHeight, metricsWidth, metricsHeight);
        
        pdf.save(`Reporte_Vibraciones_${Date.now()}.pdf`);
        statusMessageDiv.textContent = 'PDF generado exitosamente.';
        statusMessageDiv.style.color = '#28a745';

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        statusMessageDiv.textContent = 'Error al generar el PDF. Revisa la consola.';
        statusMessageDiv.style.color = '#dc3545';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchDataButton.addEventListener('click', fetchLatestVibrationData);
    clearPageButton.addEventListener('click', clearChartAndMetrics);
    exportPdfButton.addEventListener('click', exportToPdf);

  
    resetZoomBtn.addEventListener('click', () => {
        if (timeDomainChartInstance) {
            timeDomainChartInstance.resetZoom();
            resetZoomBtn.style.display = 'none'; 
        }
    });

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-nav');
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