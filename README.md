# Thrift Savings App 🚀

Thrift Savings App is a modernized cooperative savings (Ajo/Esusu) platform for managing group contributions, tracking thrift pools, and automating payout schedules.

## 📁 Project Architecture

This project uses a decoupled Monorepo structure. While the code lives in one repository, the frontend and backend operate and are deployed independently.

- **/client**: The React.js frontend (Vite). Deployed on **Vercel**.
- **/server**: The Node.js/Express REST API. Deployed on **Render**.

---

## 🛠️ Local Setup & Installation

To run this project locally, you must start the client and the server in two separate terminal windows. 

### Prerequisites
- Node.js installed
- MongoDB installed locally OR a MongoDB Atlas connection URI

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/MicahBala/thrift-savings-app.git   
cd thrift-savings-app
\`\`\`

### 2. Backend Setup (`/server`)
The backend runs on port 5000 by default.
\`\`\`bash
cd server
npm install
\`\`\`
Create a `.env` file in the `/server` directory:
\`\`\`text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
INTERSWITCH_CLIENT_ID=your_test_client_id
INTERSWITCH_SECRET_KEY=your_test_secret_key
\`\`\`
Start the development server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup (`/client`)
Open a **new** terminal window. The Vite frontend runs on port 5173 by default.
\`\`\`bash
cd client
npm install
\`\`\`
Create a `.env` file in the `/client` directory to point to your local API:
\`\`\`text
VITE_API_BASE_URL=http://localhost:5000/api/v1
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

---

## 🤝 Contribution Guidelines

We strictly use a Git Flow branching strategy to avoid merge conflicts. **Do not push directly to `main` or `develop`.**

### Workflow
1. **Pull the latest changes:** Always branch off the latest `develop` branch.
   \`\`\`bash
   git checkout develop
   git pull origin develop
   \`\`\`
2. **Create a feature branch:** \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
3. **Commit your changes:**
   \`\`\`bash
   git add .
   git commit -m "feat: added login modal to dashboard"
   \`\`\`
4. **Push and PR:** Push your branch to GitHub and open a Pull Request against the `develop` branch.
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
5. **Link Issues:** In your PR description, mention the issue number you are solving (e.g., "Closes #4") so GitHub closes it automatically upon merge.

---

## 📄 License
This project is licensed under the MIT License.