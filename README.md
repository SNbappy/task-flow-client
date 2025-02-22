# 📝 Task Management Application  

A sleek and intuitive task management application that allows users to seamlessly create, edit, delete, and reorder tasks using a drag-and-drop interface. With Firebase authentication and real-time database updates, users can efficiently manage tasks across three categories: **To-Do, In Progress, and Done**.  

🔗 **Live Demo:** [Insert Live Link Here]  

📂 **GitHub Repository:**  
- **Frontend:** [Insert Frontend Repo Link]  
- **Backend:** [Insert Backend Repo Link]  

---

## 📖 Table of Contents  
- [Features](#-features)  
- [Technologies Used](#-technologies-used)  
- [Installation & Setup](#-installation--setup)  
- [API Endpoints](#-api-endpoints)  
- [Usage](#-usage)  
- [Screenshots](#-screenshots)  
- [Bonus Features](#-bonus-features)  
- [Contributors](#-contributors)  
- [License](#-license)  

---

## ✨ Features  
✅ **User Authentication** – Google sign-in via Firebase.  
✅ **Task Management** – Create, edit, delete, and reorder tasks effortlessly.  
✅ **Drag-and-Drop Functionality** – Move tasks between categories smoothly.  
✅ **Real-Time Updates** – Changes are instantly saved in MongoDB.  
✅ **Mobile-Responsive Design** – Fully optimized for both desktop and mobile.  
✅ **Persistent Data** – Tasks remain saved even after a refresh.  
✅ **Modern UI** – Minimalistic and clean interface with a four-color theme.  

---

## 🛠 Technologies Used  

### **Frontend (React + Vite.js)**  
- React.js  
- Vite.js  
- Firebase Authentication  
- react-beautiful-dnd (Drag & Drop)  
- Tailwind CSS / Styled Components  

### **Backend (Express.js + MongoDB)**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- WebSockets / MongoDB Change Streams (for real-time updates)  

---

## 🚀 Installation & Setup  

### **1️⃣ Clone the Repository**
git clone [Your Repo Link]
cd task-management-app


### **1️⃣ Backend Setup**  
cd backend
npm install
npm start
🔹 Create a .env file and add the MongoDB connection string.

### **3️⃣ Frontend Setup**
sh
Copy
Edit
cd ../frontend
npm install
npm run dev
🔹 Configure Firebase authentication in the .env file.

📡 API Endpoints
Method	Endpoint	Description
POST	/tasks	Add a new task
GET	/tasks	Retrieve all tasks for the user
PUT	/tasks/:id	Update task details
DELETE	/tasks/:id	Delete a task
🎮 Usage
1️⃣ Sign in with Google to access the application.
2️⃣ Create a task by adding a title and an optional description.
3️⃣ Drag & Drop tasks between categories (To-Do, In Progress, Done).
4️⃣ Edit or delete tasks instantly.
5️⃣ Tasks persist even after a page refresh.


🌟 Bonus Features
⭐ Dark Mode – Toggle between light and dark themes.
⭐ Task Due Dates – Color indicators for overdue tasks.
⭐ Activity Log – Track task movements and changes.

👨‍💻 Contributors
Md. Sabbir Hossain Bappy – Full-Stack Developer
📩 Feel free to contribute or report issues!

📜 License
This project is licensed under the MIT License.

yaml
Copy
Edit

### **4️⃣ Save the File**  
After pasting the content, save the `README.md` file.  

### **5️⃣ Preview the README (Optional)**  
If you're using VS Code, you can preview the markdown file:  
- Right-click `README.md` and select **"Open Preview"**  

Or, if you're using GitHub, commit and push the file, then check how it looks on your repository page.  

---

### **That's It! 🎉**  