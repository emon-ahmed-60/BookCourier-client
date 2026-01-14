## BookCourier – Library-to-Home Delivery System

## Project Overview

BookCourier is a library delivery management system where users can request book pickup or delivery from their nearby libraries. The system helps students, researchers, and readers borrow and return books without physically visiting the library.

### ✨ Key Features

## 📚 Reader-Centric Features (For the User)

- **Vast Book Catalog:**  
  Access a comprehensive catalog of books from 12+ libraries spread across multiple cities within a single platform.

- **Doorstep Delivery & Pickup:**  
  Seamless service allowing readers to receive their borrowed books at home and schedule hassle-free pickups for returns.

- **Real-Time Order Tracking:**  
  Full visibility into the request lifecycle, allowing readers to track the real-time status (Pending, Out for Delivery, Delivered) of their orders.

- **Smart Search & Filtering:**  
  Advanced search functionality based on Title, Author, ISBN, or Library Location for quick discovery of books.

## 🏦 Library Management Features (For Library Staff)

- **Inventory Management System:**  
  Tools for Library Staff to easily manage their stock count (stock_count), update book pricing (rental_rate_per_day), and maintain accurate book details.

- **Request Dashboard:**  
  A centralized dashboard to view incoming delivery and pickup requests, with the ability to Confirm or Reject orders efficiently.

- **Courier Assignment:**  
  Functionality to seamlessly assign confirmed delivery requests to available couriers based on geographic location.

## 🏍️ Courier & Logistics Features (For Drivers)

- **Assigned Task Tracking:**  
  Couriers receive a clear list of assigned tasks (delivery/pickup) with necessary addresses and contact information.

- **Easy Status Update:**  
  Couriers can quickly update the order status (e.g., "Out for Delivery," "Delivered") through the app interface.

- **Coverage Map View:**  
  Visualization of the delivery zones and specific pickup/drop-off points to assist with efficient route planning.

## ⚙️ Technical & Architectural Highlights

- **Modern MERN Stack:**  
  Built using Node.js, Express, React, and MongoDB, ensuring a scalable and flexible application structure.

- **Efficient MongoDB Referencing:**  
  Utilization of manual referencing (ObjectId) across the books, libraries, and users collections for fast and consistent data linking.

- **Clean RESTful API Design:**  
  Clear and well-documented API endpoints for reliable data exchange between the React frontend and the Express backend.

## Tech Stack

- **Frontend** : React.js
- **Backend** : Node.js, Express.js
- **Database** : MongoDB
- **Authentication** : Firebase,JWT
<!-- - **Deployment** : Vercel  -->

## Dependencies

- `axios`
- `react-router`
- `react-toastify`
- `tailwindcss`
- `tanstack/react-query`
- `react-hook-form`
- `react-leaflet`
- `react-responsive-carousel`
- `framer-motion`
- `react-icons`
- `firebase`

## Installation

Clone the repo and install dependencies

```bash
  git clone https://github.com/emon-ahmed-60/BookCourier-client.git
  cd HomeHero-client
  npm install
```

Set up environment variables by creating a .env file in the root directory:

```bash
  DATABASE_URL=your_database_url
  Firebase_SECRET=your_firebase_secret
```

Run the application:

```bash
  npm run dev
```

## 🌐 Live URL

https://bookcourier-5924d.web.app/
