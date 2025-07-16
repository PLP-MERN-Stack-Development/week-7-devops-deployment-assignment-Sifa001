# MERN Stack Blog Platform

## 🚀 Project Overview
A full-featured MERN stack blog platform with user authentication, post creation, and modern deployment practices.

---

## 🌐 Deployed Applications
- **Frontend:** [https://blog-platform-sigma-drab.vercel.app/]
- **Backend API:** [https://blog-platform-s4hg.onrender.com]

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Express.js, Node.js
- **Database:** MongoDB Atlas
- **Deployment:** Render (backend), Vercel/Netlify (frontend)
- **CI/CD:** GitHub Actions
- **Monitoring:** (e.g., UptimeRobot, Sentry, etc.)

---

## 📦 Environment Variables

### Frontend (`client/.env.example`)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (`server/.env.example`)
```
MONGODB_URI=your-mongodb-atlas-uri
PORT=5000
JWT_SECRET=your-secret
```

---

## 🚀 Deployment Instructions
1. Clone the repository
2. Set up environment variables in both `client` and `server`
3. Deploy backend to Render (or similar)
4. Deploy frontend to Vercel/Netlify (or similar)
5. Set up CI/CD and monitoring (see below)

---

## 🔄 CI/CD Pipeline
- Automated with GitHub Actions
- Runs tests, linting, and builds on every push
- Deploys to production on successful build

---

## 📊 Monitoring & Maintenance
- **Health Check Endpoints:** `/api/health` (backend)
- **Uptime Monitoring:** (e.g., UptimeRobot, BetterStack)
- **Error Tracking:** (e.g., Sentry)
- **Performance Monitoring:** (e.g., New Relic, Datadog)
- **Database Backups:** Enabled in MongoDB Atlas

### 📝 Monitoring Setup Documentation
- [ ] Describe how to access monitoring dashboards
- [ ] List alerting/notification setup
- [ ] Add screenshots of monitoring tools

---

## 📝 Maintenance Plan
- Regular dependency updates
- Scheduled database backups
- Documented deployment and rollback procedures

---

## 👤 Author
- [Vivian Sifa] 
