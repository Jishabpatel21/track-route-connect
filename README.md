# 🚂 Track Route Connect

A modern train booking and management system built with React, TypeScript, and Vite.

---

## 🚀 How to Run This Project

### 📋 Prerequisites

Make sure the following software is installed on your system:

- **Node.js (LTS version)**  
  Download from: https://nodejs.org  

- **Git (for version control)**  
  Download from: https://git-scm.com/download/win  

Verify installation:

```bash
node -v
npm -v
git --version
```

If version numbers appear, everything is installed correctly ✅

---

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/track-route-connect.git
```

---

### 📂 Step 2: Navigate to Project Directory

```bash
cd Downloads
cd track-route-connect-main
cd track-route-connect-main
```

Make sure you are inside the folder that contains:

```
package.json
src/
vite.config.ts
```

---

### 📦 Step 3: Install Dependencies

```bash
npm install
```

This command installs all required project packages.

---

### ▶️ Step 4: Start the Development Server

```bash
npm run dev
```

After running the command, you will see something like:

```
Local:   http://localhost:5173/
```

---

### 🌐 Step 5: Open in Browser

Open the following URL in your browser:

```
http://localhost:5173
```

Your application should now be running successfully 🎉

---

## 📤 How to Upload This Project to GitHub

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Enter repository name: `track-route-connect`
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README" (we already have one)
7. Click **"Create repository"**

---

### Step 2: Initialize Git in Your Project

Open PowerShell in your project directory:

```bash
cd C:\Users\jisha\Downloads\track-route-connect-main\track-route-connect-main
```

Initialize Git:

```bash
git init
```

---

### Step 3: Add All Files

```bash
git add .
```

This stages all your project files for commit.

---

### Step 4: Commit Your Files

```bash
git commit -m "Initial commit: Train booking system"
```

---

### Step 5: Connect to GitHub Repository

Replace `your-username` with your actual GitHub username:

```bash
git remote add origin https://github.com/your-username/track-route-connect.git
```

---

### Step 6: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

Enter your GitHub credentials when prompted.

---

### ✅ Success!

Your project is now on GitHub! 🎉  
Visit: `https://github.com/your-username/track-route-connect`

---

### 🔄 Update Your Code Later

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## ❗ Common Issues & Fixes

### 🔴 Error: `npm not recognized`

➡ Install Node.js properly and restart your terminal.

### 🔴 Error: `package.json not found`

➡ Make sure you are inside the correct project directory.

### 🔴 Port already in use

Run the server on a different port:

```bash
npm run dev -- --port 3000
```

Then open:

```
http://localhost:3000
```

---

## 🛠️ Tech Stack

- **React** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component Library

---

## 📁 Project Structure

```
track-route-connect-main/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── context/        # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── data/           # Mock data
├── public/             # Static assets
└── package.json        # Project dependencies
```

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

