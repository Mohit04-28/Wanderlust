# Wanderlust 🌍✈️

Wanderlust is a full-stack web application built to help users discover, list, and book accommodations around the world. It provides a platform where people can explore various travel destinations, check out property details, leave reviews, and share their own properties with fellow travelers.

## 🚀 Features

- **User Authentication**: Secure sign-up, login, and logout functionalities.
- **Listing Management**: Users can create, view, edit, and delete their own travel listings.
- **Image Uploads**: Seamless property image uploading and storage via Cloudinary integrated with Multer.
- **Review System**: Authenticated users can leave reviews and ratings for different properties.
- **Session & Flash Messages**: Secure session handling and user-friendly success/error notifications.
- **Data Validation & Error Handling**: Robust server-side validation using Joi and custom error handling.
- **Responsive Design**: Styled UI using EJS-Mate and Bootstrap (or custom CSS) for an engaging user experience.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, EJS (Embedded JavaScript templates), EJS-Mate
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose Object Data Modeling)
- **Authentication**: Passport.js (Local Strategy, `passport-local-mongoose`)
- **Cloud Storage**: Cloudinary (via `multer-storage-cloudinary`)
- **Other Tools**: `connect-mongo`, `express-session`, `connect-flash`, `dotenv`, `joi`

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas cluster)
- A [Cloudinary](https://cloudinary.com/) account for managing image uploads.

## ⚙️ Installation & Local Setup

**1. Clone the repository:**
```bash
git clone <your-repo-url>
cd MAJORPROJECT
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure Environment Variables:**
Create a `.env` file in the root directory of the project and provide the following required keys:
```env
# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MongoDB Connection
ATLASDB_URL=your_mongodb_connection_string

# Session Secret
SECRET=your_custom_secret_key
```

**4. Start the application:**
```bash
node app.js
```
*(Alternatively, you can run `nodemon app.js` for development purposes if nodemon is installed globally).*

**5. Access the App:**
Open your browser and navigate to `http://localhost:8080`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is licensed under the ISC License.
