# 🚀 Thrift Savings App

**Thrift Savings App** brings the traditional cooperative savings model (Ajo / Esusu / Adashe) into the digital age. It is a secure, modernized platform designed to help communities and friends easily manage group contributions, pool funds, and transparently track payout cycles.

🌍 **Live Demo:** [Visit Thrift Savings on ](https://thrift-savings-app.vercel.app/)

---

## ✨ What You Can Do (MVP Features)

- **Secure Authentication:** Create a personal account and safely log in to your dashboard.
- **Create Savings Groups:** Start a new thrift group, set the contribution amount, and define the cycle goal.
- **Join via Invite Code:** Easily join an existing group using a secure 6-character code.
- **Make Contributions:** Pay your cycle dues directly into the group vault.
- **Transparent Tracking:** See exactly who has paid, who is pending, and watch the total pool grow in real-time.
- **Automated Disbursements:** Group Admins can disburse the total pool to a selected member once the cycle goal is reached.

---

## 📖 User Guide: How to Use Thrift Savings

Whether you want to lead a savings group or just participate, here is how to get started:

### 1. Create an Account

- Click the **Sign Up** link on the homepage.
- Enter your Name, Email, and a secure password.
- Once registered, you will be redirected to your personal Dashboard.

### 2. Join or Create a Group

When you log in for the first time, your vault will be empty. You have two choices:

- **Create a Group (Become an Admin):** Click "Create New Group". Set the name, how much everyone needs to contribute, and the target goal. You will be given a 6-character **Invite Code** to share with your friends.
- **Join a Group (Become a Member):** Click "Join via Invite Code" and paste the 6-character code given to you by a group Admin.

### 3. Make Your Contribution

- Once inside a group, you will see the Vault Overview and the Group Roster.
- Click **Pay Due Contribution**.
- _Testing Note:_ The app uses a secure simulated payment gateway for this MVP. You can easily test this by clicking "Pay Now" and watching the vault balance update automatically! Once paid, your status turns green.

### 4. Group Disbursements (Admins Only)

- The **Disburse Funds** button is strictly locked until the `Total Pool` reaches the `Cycle Goal`.
- Once the vault is full, the Admin can click the button, select a member from the dropdown, and empty the vault.
- All members will automatically be reset to "Pending" so the next savings cycle can begin!

---

## 👥 Team & Contributions

This project was built with a clear division of labor to ensure high-quality delivery across all layers of the application. Below is the detailed breakdown of each team member's contributions:

### 💻 Technical Contributions

**Micah Bala** _Lead Frontend Engineer & Backend Contributor_ \* **Frontend Development:** Architected the entire React.js (Vite) application structure, implemented the responsive UI, and integrated state management for the user dashboard.

- **Payment Integration:** Engineered the Interswitch WebPAY inline checkout logic and created the transaction simulation flow for the MVP.
- **Backend Support:** Collaborated on the Express.js API design, specifically focusing on the payment verification and disbursement logic.
- **DevOps:** Managed the frontend deployment on Vercel and configured environment variables for secure API communication.

**Echanny Idagu** _Backend Engineer_ \* **API Architecture:** Designed and implemented the RESTful API endpoints for User Authentication (JWT), Group Management, and Roster tracking.

- **Database Design:** Architected the MongoDB schemas to handle complex relational-like data between Users, Groups, and Transaction records.
- **Logic Implementation:** Developed the backend controllers for the automated vault cycle and the administrative disbursement triggers.
- **Server Deployment:** Managed the backend deployment on Render and handled CORS/Security configurations for production.

---

### 🎨 Non-Technical & Design Contributions

**Iorver Sur** _UI/UX Designer & Product Strategy_ \* **Visual Design:** Created the high-fidelity mockups and design system, focusing on a clean, FinTech-inspired "Trust & Security" aesthetic.

- **User Experience:** Conducted the user flow research to simplify the traditional "Thrift" process into a three-step digital journey.
- **Prototyping:** Built the interactive prototypes used to guide the frontend development phase.
- **Product Research:** Analyzed traditional thrift models (Ajo/Esusu) to ensure the digital version maintained the core cultural values of cooperative savings.

---

### 📄 Documentation & Management

- **Technical Documentation:** Micah Bala & Echanny Idagu
- **Project Vision & README:** Micah Bala
- **Quality Assurance (Testing):** Entire Team

## 🤝 Want to contribute?

We welcome community feedback! If you find a bug or have a feature request, please open an Issue in this repository.
