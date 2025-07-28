<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VibracionSystem README</title>
    <style>
        /* --- General Styles & Dark Theme --- */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            line-height: 1.6;
            background-color: #0d1117;
            color: #c9d1d9;
            margin: 0;
            padding: 20px;
        }

        /* --- Main Container --- */
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 2rem;
        }

        /* --- Header & Badges --- */
        .header {
            text-align: center;
            border-bottom: 1px solid #30363d;
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
        }
        .header h1 {
            font-size: 2.5em;
            margin: 0.5em 0;
            color: #ffffff;
        }
        .header .emojis {
            font-size: 2.5em;
        }
        .header .badges img {
            margin: 5px;
        }

        /* --- Headings --- */
        h2 {
            font-size: 1.75em;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.5em;
            margin-top: 2em;
            margin-bottom: 1em;
            color: #ffffff;
        }
        h3 {
            font-size: 1.25em;
            margin-top: 1.5em;
            color: #ffffff;
        }

        /* --- Links --- */
        a {
            color: #58a6ff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }

        /* --- Code Blocks --- */
        pre {
            background-color: #0d1117;
            padding: 1em;
            border-radius: 6px;
            border: 1px solid #30363d;
            overflow-x: auto;
        }
        code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 0.9em;
        }
        /* Inline code */
        p code, li code {
            background-color: rgba(110,118,129,0.4);
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            border-radius: 6px;
        }

        /* --- Lists --- */
        ul, ol {
            padding-left: 20px;
        }
        li {
            margin-bottom: 0.5em;
        }

        /* --- Tables --- */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1em;
            border: 1px solid #30363d;
        }
        th, td {
            text-align: left;
            padding: 12px;
            border: 1px solid #30363d;
        }
        th {
            background-color: #161b22;
            color: #ffffff;
        }
        
        /* --- Details/Summary for ToC --- */
        details {
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 0.5em 1em;
            margin-bottom: 1.5em;
        }
        summary {
            cursor: pointer;
            font-weight: bold;
        }

        /* --- Images --- */
        img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
        }

        /* --- Horizontal Rule --- */
        hr {
            border: 0;
            height: 1px;
            background-color: #30363d;
            margin: 2em 0;
        }
    </style>
</head>
<body>

    <div class="container">

        <div class="header">
            <p class="emojis">📈 ⚙️ 📊</p>
            <h1>VibracionSystem</h1>
            <p>
                <b>Una aplicación web moderna para el monitoreo y análisis de datos de vibraciones en tiempo real.</b>
            </p>
            <div class="badges">
                <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
                <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
                <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
                <img src="https://img.shields.io/badge/status-active-success.svg?style=for-the-badge" alt="Status">
                <img src="https://img.shields.io/github/license/willor16/vibracionsystem?style=for-the-badge" alt="License">
            </div>
        </div>

        <details>
            <summary><strong>Table of Contents</strong></summary>
            <ol>
                <li><a href="#about">About The Project</a></li>
                <li><a href="#features">Key Features</a></li>
                <li><a href="#tech-stack">Tech Stack</a></li>
                <li><a href="#structure">Project Structure</a></li>
                <li><a href="#getting-started">Getting Started</a></li>
                <li><a href="#usage">Usage</a></li>
                <li><a href="#screenshots">Screenshots</a></li>
                <li><a href="#contributing">Contributing</a></li>
                <li><a href="#license">License</a></li>
                <li><a href="#contact">Contact</a></li>
            </ol>
        </details>

        <hr>

        <h2 id="about">🚀 About The Project</h2>
        <p><strong>VibracionSystem</strong> es una aplicación web dinámica construida con <strong>React</strong> y <strong>Firebase</strong>, diseñada para monitorear y analizar datos de vibraciones de sensores. Proporciona una interfaz de usuario interactiva que permite a los usuarios visualizar datos en tiempo real a través de un dashboard. Este sistema es ideal para escenarios de mantenimiento predictivo y monitoreo industrial donde el acceso remoto e instantáneo a los datos es crucial.</p>

        <h2 id="features">✨ Key Features</h2>
        <ul>
            <li>👤 <strong>Autenticación Segura:</strong> Sistema de registro e inicio de sesión de usuarios gestionado con <strong>Firebase Authentication</strong>.</li>
            <li>📈 <strong>Dashboard en Tiempo Real:</strong> Visualización de datos de vibraciones en vivo a través de gráficos interactivos.</li>
            <li>🎛️ <strong>Gestión de Sensores:</strong> Permite a los usuarios seleccionar y monitorear diferentes sensores o dispositivos.</li>
            <li>☁️ <strong>Base de Datos en la Nube:</strong> Todos los datos se persisten de forma segura y escalable en <strong>Cloud Firestore</strong>.</li>
            <li>📱 <strong>Diseño Responsivo:</strong> Interfaz de usuario moderna construida con React, asegurando una experiencia fluida en computadoras y dispositivos móviles.</li>
        </ul>

        <h2 id="tech-stack">🛠️ Tech Stack</h2>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Technology / Library</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Frontend</strong></td>
                    <td><img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"></td>
                </tr>
                <tr>
                    <td><strong>Backend (BaaS)</strong></td>
                    <td><img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"> (Authentication, Firestore, Hosting)</td>
                </tr>
                <tr>
                    <td><strong>Build Tool</strong></td>
                    <td><img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"></td>
                </tr>
                <tr>
                    <td><strong>Librerías Clave</strong></td>
                    <td><code>react-router-dom</code> (para enrutamiento), <code>chart.js</code> (para gráficos)</td>
                </tr>
            </tbody>
        </table>

        <h2 id="structure">📂 Project Structure</h2>
        <p>Una vista general de la estructura de carpetas de un proyecto típico con React y Vite. <em>(Ajusta esto si tu estructura es diferente)</em>.</p>
        <pre><code>vibracionsystem/
├── public/                 // Archivos estáticos
├── src/
│   ├── assets/             // Imágenes, CSS, fuentes, etc.
│   ├── components/         // Componentes reutilizables de React
│   ├── pages/              // Componentes de página (Login, Dashboard)
│   ├── services/           // Configuración y servicios de Firebase
│   └── main.jsx            // Punto de entrada de la aplicación
├── .env                    // Variables de entorno (claves de Firebase)
├── index.html              // Plantilla HTML principal
├── package.json            // Dependencias y scripts del proyecto
└── vite.config.js          // Configuración de Vite
</code></pre>

        <h2 id="getting-started">🏁 Getting Started</h2>
        <h3>Prerequisites</h3>
        <p>Asegúrate de tener instalado Node.js y npm en tu sistema.</p>
        <ul>
            <li><strong>Node.js</strong> (versión 16 o superior)</li>
            <li><strong>npm</strong> (se instala automáticamente con Node.js)</li>
        </ul>
        <h3>Installation & Setup</h3>
        <ol>
            <li><strong>Clona el repositorio:</strong>
                <pre><code>git clone https://github.com/willor16/vibracionsystem.git</code></pre>
            </li>
            <li><strong>Navega al directorio del proyecto:</strong>
                <pre><code>cd vibracionsystem</code></pre>
            </li>
            <li><strong>Instala las dependencias:</strong>
                <pre><code>npm install</code></pre>
            </li>
            <li><strong>Configura Firebase:</strong>
                <p>Crea un archivo <code>.env</code> en la raíz del proyecto y añade tus claves de configuración del proyecto de Firebase.</p>
                <pre><code>VITE_FIREBASE_API_KEY="TU_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="TU_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="TU_SENDER_ID"
VITE_FIREBASE_APP_ID="TU_APP_ID"</code></pre>
            </li>
            <li><strong>Ejecuta la aplicación en modo de desarrollo:</strong>
                <pre><code>npm run dev</code></pre>
            </li>
        </ol>

        <h2 id="usage">📖 Usage</h2>
        <p>Una vez que la aplicación esté en funcionamiento en tu navegador:</p>
        <ol>
            <li>Crea una nueva cuenta de usuario o inicia sesión si ya tienes una.</li>
            <li>Serás redirigido al dashboard principal.</li>
            <li>Desde el dashboard, puedes ver los datos de vibración en tiempo real y seleccionar los diferentes sensores disponibles para monitorear.</li>
        </ol>

        <h2 id="screenshots">🖼️ Screenshots</h2>
        <p>Aquí un vistazo de la interfaz de la aplicación. <em>(Reemplaza las URLs de abajo con enlaces directos a tus capturas de pantalla)</em></p>
        
        <h3>Página de Inicio de Sesión</h3>
        <img src="https://via.placeholder.com/800x450.png?text=Login+Screen+Screenshot" alt="Login Screen Screenshot">
        
        <h3>Dashboard Principal</h3>
        <img src="https://via.placeholder.com/800x450.png?text=Main+Dashboard+Screenshot" alt="Main Dashboard Screenshot">
        
        <h3>Gráficos de Datos en Tiempo Real</h3>
        <img src="https://via.placeholder.com/800x450.png?text=Data+Analysis+Screenshot" alt="Data Analysis Screenshot">
        
        <h3>Vista en Dispositivos Móviles</h3>
        <img src="https://via.placeholder.com/800x450.png?text=Mobile+View+Screenshot" alt="Mobile View Screenshot">

        <h2 id="contributing">🙌 Contributing</h2>
        <p>Las contribuciones hacen de la comunidad de código abierto un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será <strong>muy apreciada</strong>.</p>
        <ol>
            <li>Haz un Fork del Proyecto.</li>
            <li>Crea tu Rama de Característica (<code>git checkout -b feature/AmazingFeature</code>).</li>
            <li>Confirma tus Cambios (<code>git commit -m 'Add some AmazingFeature'</code>).</li>
            <li>Empuja a la Rama (<code>git push origin feature/AmazingFeature</code>).</li>
            <li>Abre una Pull Request.</li>
        </ol>

        <h2 id="license">📜 License</h2>
        <p>Distribuido bajo la Licencia MIT. Consulta el archivo <code>LICENSE</code> para más información. <em>(Asegúrate de tener un archivo LICENSE en tu repositorio)</em>.</p>

        <h2 id="contact">📞 Contact</h2>
        <p><strong>willor16</strong> - <a href="https://github.com/willor16">GitHub Profile</a></p>
        <p>Link del Proyecto: <a href="https://github.com/willor16/vibracionsystem">https://github.com/willor16/vibracionsystem</a></p>

    </div>

</body>
</html>
