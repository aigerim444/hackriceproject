# Afya Quest Deployment Guide

## Step 2: MongoDB Atlas Setup

### 2.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project (e.g., "Afya Quest")

### 2.2 Create Free Cluster
1. Click "Create" → "Deploy a cloud database"
2. Choose "M0 Sandbox" (FREE tier)
3. Select provider: AWS, Google Cloud, or Azure
4. Choose region closest to your users
5. Cluster Name: `AfyaQuest` or similar
6. Click "Create Cluster"

### 2.3 Configure Database Access
1. **Database Access** → Add Database User:
   - Username: `afyaquest-user` (or your choice)
   - Password: Generate secure password (SAVE IT!)
   - Database User Privileges: "Read and write to any database"

2. **Network Access** → Add IP Address:
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (`0.0.0.0/0`)
   - Description: "Render deployment access"

### 2.4 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2.5 Replace Placeholder Values
Replace `<username>` and `<password>` with your database user credentials:
```
mongodb+srv://afyaquest-user:your-password-here@cluster0.xxxxx.mongodb.net/afyaquest?retryWrites=true&w=majority
```

---

## Step 3: Create Render Backend Service

### 3.1 Sign up for Render
1. Go to [Render](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### 3.2 Create Web Service
1. Dashboard → "New" → "Web Service"
2. Connect your `hackriceproject` repository
3. Configure service:
   - **Name**: `afya-quest-backend`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `afya-quest-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

---

## Step 4: Create Render Frontend Static Site

### 4.1 Create Static Site
1. Dashboard → "New" → "Static Site"
2. Connect same `hackriceproject` repository
3. Configure site:
   - **Name**: `afya-quest-frontend`
   - **Branch**: `main`
   - **Root Directory**: `afya-quest-frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`

---

## Environment Variables Needed

### Backend Environment Variables (Step 5)
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/afyaquest?retryWrites=true&w=majority
JWT_SECRET=generate-a-secure-random-string-here
PORT=5000
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-pro
```

### Required External Services
- **Cloudinary**: Free tier for image/video storage
- **Google AI Studio**: Free tier for Gemini API
- **MongoDB Atlas**: Free tier database (already set up above)

---

## What's Your GitHub Repository?

To proceed with Render setup, I need to know:
1. Your GitHub username
2. Repository name (is it `hackriceproject`?)
3. Is the repository public or private?

This information will help me give you the exact steps for connecting to Render.
