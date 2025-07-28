<div align="center">

  <br/>
  <br/>
  <p>
    📈 ⚙️ 📊
  </p>
  <h1>VibracionSystem</h1>
  <p>
    <b>A robust desktop application for real-time monitoring and analysis of vibration data from sensors.</b>
  </p>
  <br/>

  <p>
    <img src="https://img.shields.io/badge/Java-11+-blue.svg?style=for-the-badge&logo=openjdk" alt="Java">
    <img src="https://img.shields.io/badge/Maven-3.8-red.svg?style=for-the-badge&logo=apache-maven" alt="Maven">
    <img src="https://img.shields.io/badge/MySQL-8.0-orange.svg?style=for-the-badge&logo=mysql" alt="MySQL">
    <img src="https://img.shields.io/badge/status-active-success.svg?style=for-the-badge" alt="Status">
    <img src="https://img.shields.io/github/license/willor16/vibracionsystem?style=for-the-badge" alt="License">
  </p>
  <br/>
  <br/>
</div>

<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li><a href="#-about-the-project">About The Project</a></li>
    <li><a href="#-key-features">Key Features</a></li>
    <li><a href="#-tech-stack">Tech Stack</a></li>
    <li><a href="#-project-structure">Project Structure</a></li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation--setup">Installation & Setup</a></li>
      </ul>
    </li>
    <li><a href="#-usage">Usage</a></li>
    <li><a href="#-screenshots">Screenshots</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
    <li><a href="#-contact">Contact</a></li>
  </ol>
</details>

---

## 🚀 About The Project

**VibracionSystem** is a comprehensive Java-based desktop application designed to manage and interpret vibration data collected from multiple sensors. It provides a user-friendly interface for registering users, managing sensor data, and generating detailed PDF reports. This system is ideal for scenarios where continuous monitoring and analysis of mechanical vibrations are crucial for maintenance and operational safety.

---

## ✨ Key Features

* 👤 **User Authentication:** Secure login and registration system for operators and administrators.
* 📡 **Sensor Management:** Easily add, view, update, and delete sensor information and their data points.
* 📊 **Data Analysis:** Process and analyze vibration data to identify patterns, peaks, and potential anomalies.
* 📄 **PDF Report Generation:** Automatically generate professional, detailed PDF reports of the analysis using the iText library.
* 💾 **Database Integration:** Persists all user and sensor data in a robust MySQL database for reliability and scalability.
* 🖥️ **Intuitive GUI:** A clean and straightforward graphical user interface built with Java for ease of use and efficient workflow.

---

## 🛠️ Tech Stack

This project is built with a solid foundation of modern and reliable technologies.

| Category          | Technology / Library                                                                    |
| ----------------- | --------------------------------------------------------------------------------------- |
| **Core Language** | ![Java](https://img.shields.io/badge/Java-11+-blue?style=flat-square&logo=openjdk)      |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)      |
| **Build Tool** | ![Maven](https://img.shields.io/badge/Maven-3.8-red?style=flat-square&logo=apache-maven)  |
| **Libraries** | `iTextPDF` (for PDF reports), `MySQL Connector/J` (for DB connectivity)                   |
| **Environment** | Desktop Application (GUI)                                                               |

---

## 📂 Project Structure

Here is a brief overview of the project's directory structure.

```
vibracionsystem/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/vibracion/vibracionsystem/
│   │   │       ├── controllers/   // Logic for UI interactions
│   │   │       ├── models/        // Data objects (User, Sensor)
│   │   │       ├── services/      // Business logic (DB operations)
│   │   │       ├── utils/         // Utility classes (DB Connection, Report Generator)
│   │   │       └── Main.java      // Application entry point
│   │   └── resources/             // UI files (.fxml), images, etc.
│   └── test/
└── pom.xml                        // Maven project configuration
```

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following software installed on your system:
* **Java Development Kit (JDK) 11** or higher.
* **Apache Maven**.
* **MySQL Server** (Community Edition is fine).
* An IDE of your choice, like **IntelliJ IDEA**, **Eclipse**, or **VS Code**.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/willor16/vibracionsystem.git](https://github.com/willor16/vibracionsystem.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd vibracionsystem
    ```

3.  **Database Setup:**
    * Start your MySQL server.
    * Create a new database for the project (e.g., `vibration_db`).
    * Locate the database connection utility class (e.g., in `src/.../utils/`) and update the `URL`, `username`, and `password` with your local MySQL credentials.

4.  **Build with Maven:**
    * Open a terminal in the root directory and run:
    ```sh
    mvn clean install
    ```
    * This will download all necessary dependencies.

5.  **Run the Application:**
    * You can run the `Main.java` class directly from your IDE or execute the generated JAR file from the `target/` directory.

---

## 📖 Usage

Once the application is running:
1.  Register a new user account or log in with existing credentials.
2.  Navigate to the sensor management panel to add new sensors.
3.  View the data associated with each sensor.
4.  Select a dataset or a time range to perform an analysis.
5.  Generate a PDF report to save or share the findings.

---

## 🖼️ Screenshots

Here is a sneak peek into the application's interface.

*(Replace the placeholder URLs below with direct links to your actual screenshots)*

### **Main Dashboard**
![Your Screenshot Here](https://via.placeholder.com/800x450.png?text=Main+Dashboard+Screenshot)

### **Sensor Management**
![Your Screenshot Here](https://via.placeholder.com/800x450.png?text=Sensor+Management+Screenshot)

### **Data Analysis View**
![Your Screenshot Here](https://via.placeholder.com/800x450.png?text=Data+Analysis+Screenshot)

### **Generated PDF Report**
![Your Screenshot Here](https://via.placeholder.com/800x450.png?text=PDF+Report+Screenshot)

---

## 🙌 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.
*(Please add a LICENSE file to your repository if you haven't already)*

---

## 📞 Contact

**willor16** - [GitHub Profile](https://github.com/willor16)

Project Link: [https://github.com/willor16/vibracionsystem](https://github.com/willor16/vibracionsystem)
