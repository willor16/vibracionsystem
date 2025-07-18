// --- 1. CONFIGURACIÓN DE FIREBASE ---
// --todos estos es informacion que debe colocarse con informacion de la base de datos del usuario---
const firebaseConfig = {
    apiKey: "", // aca va la clave de apikey
    authDomain: "<>.firebaseapp.com", //aca ba el link del proyecto
    databaseURL: "", //url por defecto del proyecto
    projectId: "<monitoreovibracion>",
    storageBucket: "<>.appspot.com",
    messagingSenderId: "",
    appId: "", //appid
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

const ctx = timeDomainChartCanvas.getContext('2d');
let timeDomainChart;

function createOrUpdateChart(timeData, amplitudeData) {
    if (timeDomainChart) timeDomainChart.destroy();

    timeDomainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 'Aceleración Eje Y (g)',
                data: amplitudeData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Tiempo Relativo (ms)'
                    },
                    min: 0,
                    ticks: {
                        callback: (value) => value + 'ms'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amplitud (g)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (context) => `Tiempo: ${context[0].label}ms`,
                        label: (context) => `${context.dataset.label}: ${context.raw.toFixed(4)}g`
                    }
                }
            }
        }
    });
}

function calculateMetrics(dataPoints, samplingIntervalMs) {
    if (dataPoints.length === 0) return { instant: '--', peakToPeak: '--', dominantFrequency: '--', period: '--' };

    const samplingIntervalSec = samplingIntervalMs / 1000;
    const samplingFrequencyHz = 1 / samplingIntervalSec;

    const instantAmplitude = dataPoints[dataPoints.length - 1];
    const minVal = Math.min(...dataPoints);
    const maxVal = Math.max(...dataPoints);
    const peakToPeakAmplitude = maxVal - minVal;

    let dominantFrequency = '--';
    let period = '--';

    try {
        if (typeof DSP !== 'undefined' && DSP.FFT) {
            let fftSize = 1;
            while (fftSize < dataPoints.length) fftSize <<= 1;
            const paddedData = [...dataPoints];
            while (paddedData.length < fftSize) paddedData.push(0);

            const fft = new DSP.FFT(fftSize, samplingFrequencyHz);
            fft.forward(paddedData);

            let maxMagnitude = 0, maxIndex = 0;
            for (let i = 0; i < fft.spectrum.length / 2; i++) {
                const magnitude = fft.spectrum[i];
                if (magnitude > maxMagnitude) {
                    maxMagnitude = magnitude;
                    maxIndex = i;
                }
            }
            dominantFrequency = (maxIndex * samplingFrequencyHz / fftSize);
            if (dominantFrequency > 0) period = 1 / dominantFrequency;
        }
    } catch (e) {
        console.error("Error calculando FFT:", e);
    }

    return {
        instant: instantAmplitude.toFixed(4) + ' g',
        peakToPeak: peakToPeakAmplitude.toFixed(4) + ' g',
        dominantFrequency: dominantFrequency !== '--' ? dominantFrequency.toFixed(2) + ' Hz' : '--',
        period: period !== '--' ? period.toFixed(2) + ' s' : '--'
    };
}

async function fetchLatestVibrationData() {
    statusMessageDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando datos...';
    const loteRef = database.ref('vibration_batches/lote');

    try {
        const snapshot = await loteRef.once('value');

        if (snapshot.exists()) {
            const latestBatchData = snapshot.val();
            console.log("Datos encontrados:", latestBatchData);

            const timeData = [];
            const amplitudeData = [];
            let currentSamplingInterval = 20;

            const lecturas = latestBatchData.lecturas;

            if (lecturas && Object.keys(lecturas).length > 0) {
                const sortedKeys = Object.keys(lecturas).sort((a, b) => parseInt(a) - parseInt(b));

                sortedKeys.forEach(key => {
                    const punto = lecturas[key];
                    timeData.push(punto.tiempo_ms);
                    amplitudeData.push(punto.amplitud);
                });

                if (timeData.length > 1) {
                    const interval = timeData[1] - timeData[0];
                    if (interval > 0 && interval < 1000) currentSamplingInterval = interval;
                }

                createOrUpdateChart(timeData, amplitudeData);

                const metrics = calculateMetrics(amplitudeData, currentSamplingInterval);
                accYInstantSpan.textContent = metrics.instant;
                amplitudeYPpSpan.textContent = metrics.peakToPeak;
                frequencyYDomSpan.textContent = metrics.dominantFrequency;
                periodYSpan.textContent = metrics.period;

                console.log("Duración total (ms):", latestBatchData.duracion_ms);
                statusMessageDiv.innerHTML = `<i class="fas fa-check-circle"></i> Datos cargados.`;
            } else {
                statusMessageDiv.innerHTML = '<i class="fas fa-info-circle"></i> El lote está vacío.';
                clearChartAndMetrics();
            }
        } else {
            statusMessageDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> No hay datos.';
            clearChartAndMetrics();
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
        statusMessageDiv.innerHTML = `<i class="fas fa-times-circle"></i> Error: ${error.message}`;
        clearChartAndMetrics();
    }
}

function clearChartAndMetrics() {
    if (timeDomainChart) {
        timeDomainChart.destroy();
        timeDomainChart = null;
    }
    accYInstantSpan.textContent = '--';
    amplitudeYPpSpan.textContent = '--';
    frequencyYDomSpan.textContent = '--';
    periodYSpan.textContent = '--';
    statusMessageDiv.innerHTML = '<i class="fas fa-info-circle"></i> Pantalla limpia.';
}

document.addEventListener('DOMContentLoaded', () => {
    if (fetchDataButton) fetchDataButton.addEventListener('click', fetchLatestVibrationData);
    if (clearPageButton) clearPageButton.addEventListener('click', clearChartAndMetrics);

    if (document.getElementById('dashboard-section')?.classList.contains('active')) {
        fetchLatestVibrationData();
    }
});
