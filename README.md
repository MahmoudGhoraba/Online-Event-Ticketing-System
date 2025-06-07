# Online Event Ticketing System

A comprehensive full-stack web application that allows users to discover, search, and purchase tickets for a wide variety of events—including concerts, sports matches, theater performances, and more.

---

## 🚀 Features

### Event Discovery & Browsing
- **Curated Events:** Hand-picked and categorized events tailored to user interests.
- **Search & Filtering:** Search events by keywords, filter by date, price, and availability.
- **Event Listings:** Clear presentation of featured, ongoing, and upcoming events.

### Ticketing & Booking
- **Instant Ticket Booking:** Secure and fast ticket reservation with real-time seat availability.
- **Group Discounts:** Special pricing for group bookings to encourage friends and family attendance.
- **Live Ticket Status:** “Available”, “Sold Out”, or remaining ticket count displayed.

### User Roles & Permissions
- **User:** 
  - Browse and book tickets.
  - Manage personal bookings, reviews, and favorite events.
  - Access a personalized profile page.
- **Organizer:**
  - Create, edit, and manage events.
  - View bookings and attendee lists for their own events.
- **Admin:**
  - Approve or decline events submitted by organizers.
  - Manage all users, events, and platform-wide settings.

### User Profile & Account Management
- **Profile Dashboard:** Review total bookings, reviews given, favorite events, and account activity.
- **Security Settings:** Change password, enable two-factor authentication, manage connected devices.
- **Notification Preferences:** Customize email, push, and event reminder notifications.
- **Favorites:** Add or remove favorite events for quick access.
- **Activity History:** View booking and review history.

### Modern UI & Experience
- **Responsive Design:** Fully mobile-friendly and works on all screen sizes.
- **Themed Components:** Supports dark mode and modern UI elements.
- **Animated Feedback:** Loading indicators, progress bars, and modern dropdowns for smooth interaction.

### Social & Communication
- **Email Subscription:** Users can subscribe to newsletters and event alerts.
- **Social Media Integration:** Share events and connect with the platform via social media links.

---

## 🛠️ Tech Stack

- **Frontend:** React, CSS (custom, modern styles)
- **Backend:** Node.js, Express (RESTful API)
- **Database:** (e.g., MongoDB, connect via backend `.env`)
- **Other:** Axios (API requests), React Router (navigation), modern icon libraries

---

## 🏗️ Project Structure

```
backend/           # Express backend API
  ├── controllers/
  ├── models/
  ├── routes/
  └── README.md
frontend/          # React client app
  ├── src/
  │   ├── eventComponents/
  │   ├── HomePageComponents/
  │   ├── UserProfileComponent/
  │   ├── sharedComponents/
  │   └── cssStyles/
  └── public/
```

---

## 🌐 Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MahmoudGhoraba/Online-Event-Ticketing-System.git
   cd Online-Event-Ticketing-System
   ```

2. **Install dependencies for frontend and backend:**
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in `backend/` with your database URI and secrets.

4. **Start the servers:**
   - Backend:
     ```sh
     npm start
     ```
   - Frontend (in a new terminal window/tab):
     ```sh
     cd frontend
     npm start
     ```

5. **Open the app:**  
   Visit `http://localhost:3000/` in your browser.

---

## 💡 Usage Examples

- **Browse Events:** See all available events on the homepage with filters for date, price, and status.
- **Book Tickets:** Click on an event, select “Book Now!”, and complete the reservation steps.
- **Manage Events:** (Organizers) Add new events, edit details, and monitor ticket sales.
- **Admin Approval:** (Admins) Approve or decline events submitted by organizers.
- **Profile Dashboard:** Review bookings, favorites, activity, and update account security.

---

## 🤝 Contribution

1. Fork the repository
2. Create your branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

**Author:** Mahmoud Ghoraba
