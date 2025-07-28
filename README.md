<div align="center">
  <br/>
  <h1>VibracionSystem 📈</h1>
  <br/>
</div>

<p align="center">
  <strong>A robust desktop application for real-time monitoring and analysis of vibration data from sensors.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-11-blue?style=for-the-badge&logo=java" alt="Java 11">
  <img src="https://img.shields.io/badge/Maven-3.8-red?style=for-the-badge&logo=apache-maven" alt="Maven">
  <img src="https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql" alt="MySQL">
</p>

---

## 🚀 About The Project

**VibracionSystem** is a comprehensive Java-based desktop application designed to manage and interpret vibration data collected from multiple sensors. It provides a user-friendly interface for registering users, managing sensor data, and generating detailed PDF reports. This system is ideal for scenarios where continuous monitoring and analysis of mechanical vibrations are crucial for maintenance and operational safety.

---

## ✨ Features

* **User Management:** Secure login and registration system for different user roles.
* **Sensor Data Management:** Easily add, view, and manage sensor information and their collected data points.
* **Data Analysis:** Process and analyze vibration data to identify patterns and anomalies.
* **PDF Report Generation:** Automatically generate professional and detailed reports of the analysis with iTextPDF.
* **Database Integration:** Persists all user and sensor data in a robust MySQL database.
* **Intuitive GUI:** Clean and straightforward graphical user interface built for ease of use.

---

## 🛠️ Built With

This project is built with a solid foundation of modern and reliable technologies:

* **[Java](https://www.java.com/)**: The core programming language.
* **[Maven](https://maven.apache.org/)**: Dependency management and project build tool.
* **[MySQL](https://www.mysql.com/)**: Relational database for data storage.
* **[iTextPDF](https://itextpdf.com/)**: Library for creating and manipulating PDF documents.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following software installed on your system:

* **Java Development Kit (JDK) 11** or higher.
* **Apache Maven**.
* **MySQL Server**.
* An IDE of your choice, like **IntelliJ IDEA** or **Eclipse**.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/willor16/vibracionsystem.git](https://github.com/willor16/vibracionsystem.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd vibracionsystem
    ```
3.  **Database Setup:**
    * Create a new database in MySQL for the project.
    * Import the database schema if provided, or configure the application to create tables automatically.
    * Update the database connection details in the source code (e.g., in a `config.properties` or a connection manager class).

4.  **Build the project with Maven:**
    ```sh
    mvn clean install
    ```
5.  **Run the application:**
    * You can run the main class directly from your IDE or use the generated JAR file.

---

## 🖼️ Screenshots

Here is a sneak peek into the application's interface.

*(Replace the placeholder links below with direct links to your actual screenshots)*

|                                       |                                       |
| :-----------------------------------: | :-----------------------------------: |
| *Login Screen / Main Dashboard* | *Sensor Management Interface* |
| ![Screenshot 1](URL_A_TU_CAPTURA_1.png) | ![Screenshot 2](URL_A_TU_CAPTURA_2.png) |
| *Data Analysis View* | *Sample PDF Report* |
| ![Screenshot 3](URL_A_TU_CAPTURA_3.png) | ![Screenshot 4](URL_A_TU_CAPTURA_4.png) |

---
