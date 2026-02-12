# 🛒 TapBuy – E-Commerce Web Application

<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Servlets-4B8BBE?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/NetBeans-1B6AC6?style=for-the-badge&logo=apachenetbeanside&logoColor=white"/>
</p>

<p align="center">
  A full-featured Java-based E-Commerce Web Application built using Servlets and Hibernate.
</p>

---

## 🚀 Overview

**TapBuy** is a dynamic e-commerce web platform that allows users to browse products, manage shopping carts, and securely place orders.

Built using **Java Servlets and Hibernate ORM**, following the **MVC (Model-View-Controller) architecture**, and deployed using **GlassFish Server**.

This project demonstrates strong backend development skills using Java EE technologies and database integration.

---

## ✨ Key Features

### 👤 User Module
- User Registration & Login
- Email Verification
- Forgot Password System
- Product Browsing & Search
- Add to Cart & Wishlist
- Checkout & Payment Integration
- Order History
- Profile Management

### 🛠️ Admin Module
- Admin Dashboard
- Product Management (Add / Update / Delete)
- User Management
- Order Monitoring & Status Updates

---

## 🏗️ Architecture

This project follows the **MVC (Model-View-Controller)** design pattern:

- **Controller** → Java Servlets  
- **Model** → Hibernate ORM + Business Logic  
- **View** → HTML, CSS, Bootstrap, JavaScript  
- **Database** → MySQL  

---

## 🗂️ Project Structure

```
TapBuy/
│
├── src/
│ └── java/
│ ├── controller/ # Servlets (Controllers)
│ ├── model/ # Business Logic
│ ├── entity/ # Hibernate Entities
│ └── dto/ # Data Transfer Objects
│
├── web/ # Frontend (HTML, CSS, JS, JSP)
├── lib/ # External Libraries
├── nbproject/ # NetBeans Configuration
└── build.xm
```

---

## ⚙️ Installation & Setup

### 🔹 Requirements
- Java JDK 8+
- NetBeans IDE
- GlassFish Server
- MySQL Server

---

### 🔹 Database Configuration

Update your database credentials inside:

hibernate.cfg.xml

Example configuration:

```xml
<property name="hibernate.connection.url">jdbc:mysql://localhost:3306/tapbuy</property>
<property name="hibernate.connection.username">root</property>
<property name="hibernate.connection.password">your_password</property>
```

### 🔹 Run the Application

- Open project in NetBeans
- Clean & Build the project
- Deploy to GlassFish Server
- Run the application

### 💳 Payment Integration

- Integrated with PayHere Payment Gateway for secure online transactions.

### 📈 Future Improvements

- REST API implementation
- Migration to Spring Boot
- React frontend version
- Docker containerization
- JWT Authentication

### 👩‍💻 Author

Hashini
Undergraduate Software Engineering Student

🔗 GitHub: https://github.com/Hashini-Dev

### 📌 Project Status

🟢 Completed – Academic / Portfolio Project
🚀 Open for improvements and feature extensions



