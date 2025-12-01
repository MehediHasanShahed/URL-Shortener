# **URL Shortener – Modern Link Management App**

A fast, modern, and fully responsive **URL Shortening Web Application** built with **React + Vite**, **Supabase**, and **ShadCN UI**.
This app allows users to shorten URLs, manage links, track analytics such as click counts, and authenticate using Supabase Auth.

---

## 🚀 **Features**

### **🔗 URL Shortening**

* Create short and customizable links
* Instant link generation
* Persistent storage on Supabase

### **📊 Analytics**

* Track number of clicks per link
* Automatic redirect tracking
* Real-time dashboard updates

### **👤 Authentication**

* Email/password login and signup (Supabase Auth)
* User-specific URLs & analytics
* Secure protected routes

### **📁 Dashboard**

* View all shortened links
* Edit or delete URLs
* Copy links with one click
* Clean UI built with ShadCN components

### **📱 PWA Support**

* App installable on mobile and desktop
* Offline support using `sw.js`

---

## 🛠️ **Tech Stack**

### **Frontend**

* **React (Vite)**
* **TailwindCSS**
* **ShadCN UI**
* **Lucide Icons**

### **Backend**

* **Supabase Database**
* **Supabase Auth**
* **Supabase Edge Functions (optional)**

### **Tools**

* ESLint
* Vercel for deployments
* PWA service worker

---

## 📂 **Project Structure**

```
URL-Shortener-main/
│
├── public/
│   ├── banner.png
│   ├── logo.png
│   └── sw.js
│
├── src/
│   ├── components/        # UI components (buttons, dropdowns, inputs, etc)
│   ├── db/                # Supabase API helpers
│   │   ├── apiAuth.js
│   │   ├── apiClicks.js
│   │   ├── apiUrls.js
│   │   └── supabase.js
│   ├── layouts/           # Shared layouts like AppLayout
│   ├── hooks/             # Custom hooks (e.g., useFetch)
│   ├── pages/             # Page-level components (Dashboard, Auth, Redirect, etc)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

## ⚙️ **Installation & Setup**

### **1. Clone the repository**

```bash
git clone https://github.com/your-repo/URL-Shortener.git
cd URL-Shortener
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_URL_SHORTENER=your_deployed_website_url
```

### **4. Run the development server**

```bash
npm run dev
```

---

## 🧪 **API Overview**

### 🔐 **Authentication**

* **Login:** `apiAuth.login()`
* **Signup:** `apiAuth.signup()`
* **Get current user:** `apiAuth.getUser()`

### 🔗 **URL Management**

* **Create short URL** → `apiUrls.createUrl()`
* **Fetch user URLs** → `apiUrls.getUrls()`
* **Delete or update URL**

### 📈 **Click Tracking**

* **Increment click count on redirect**
  `apiClicks.createClick(urlId)`

---

## 🌐 **Redirect Handling**

The route `/r/:shortId` handles:

1. Fetching the original long URL
2. Logging the click
3. Redirecting the user

This logic is located in:

```
src/pages/redirect-link.jsx
```

---

## 📦 **Production Build**

```bash
npm run build
npm run preview
```

Deploy easily using **Vercel**, which is preconfigured via `vercel.json`.

---

## 🧑‍💻 **Contributing**

Contributions are welcome!
Feel free to open issues or submit pull requests.

