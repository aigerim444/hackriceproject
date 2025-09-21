# 🚀 Afya Quest Render Deployment Checklist

## ✅ Prerequisites (Already Done)
- [x] Repository cloned: `aigerim444/hackriceproject`
- [x] Dependencies installed
- [x] JWT secret generated

---

## Step 2: MongoDB Atlas Setup

### 📍 Go to MongoDB Atlas
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create project: "Afya Quest"

### 📍 Create Free Cluster
1. Click "Create" → "Deploy a cloud database"
2. Choose **M0 Sandbox (FREE)**
3. Provider: AWS (recommended)
4. Region: Choose closest to your users
5. Cluster Name: `AfyaQuest`

### 📍 Configure Access
**Database User:**
- Username: `afyaquest-user`
- Password: Generate strong password (SAVE IT!)
- Role: "Read and write to any database"

**Network Access:**
- Add IP Address: `0.0.0.0/0` (Allow from anywhere)
- Description: "Render deployment"

### 📍 Get Connection String
1. Click "Connect" on cluster
2. "Connect your application"
3. Copy string (looks like):
   ```
   mongodb+srv://afyaquest-user:PASSWORD@cluster0.xxxxx.mongodb.net/afyaquest?retryWrites=true&w=majority
   ```

---

## Step 3: Render Backend Service

### 📍 Sign up for Render
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Authorize repository access

### 📍 Create Web Service
1. Dashboard → "New" → "Web Service"
2. Connect repository: `aigerim444/hackriceproject`
3. **Service Configuration:**
   ```
   Name: afya-quest-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: afya-quest-backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

---

## Step 4: Render Frontend Static Site

### 📍 Create Static Site
1. Dashboard → "New" → "Static Site"
2. Connect same repository: `aigerim444/hackriceproject`
3. **Site Configuration:**
   ```
   Name: afya-quest-frontend
   Branch: main
   Root Directory: afya-quest-frontend
   Build Command: npm run build
   Publish Directory: build
   ```

---

## Step 5: Environment Variables

### 📍 Backend Environment Variables
In your Render backend service settings, add these:

**Required Variables:**
```
MONGODB_URI=mongodb+srv://afyaquest-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/afyaquest?retryWrites=true&w=majority
JWT_SECRET=ccb67a20126cacd68d5afbb870ffde7e56654f87d72767fe23dd96714424710636f96a83e228db2243e3d718710662230cb9a4f51b9b843ed16a08be9738c771
PORT=5000
NODE_ENV=production
```

**Optional (for full functionality):**
```
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-pro
```

### 📍 Get API Keys (Optional Services)

**Cloudinary (Image/Video Upload):**
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get Cloud Name, API Key, and API Secret from dashboard

**Google AI Studio (Gemini API):**
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Get API key for Gemini access

---

## Step 6: Update Frontend API URL

✅ **Already Updated**: Frontend will point to `https://afya-quest-backend.onrender.com/api`

---

## 📋 Deployment Order

1. **Deploy Backend First**: Create and configure backend service
2. **Add Environment Variables**: Especially MongoDB connection
3. **Deploy Frontend**: Create static site (will automatically use production API URL)
4. **Test**: Visit your frontend URL and verify API connectivity

---

## 🔗 Your URLs Will Be:
- **Backend API**: `https://afya-quest-backend.onrender.com`
- **Frontend App**: `https://afya-quest-frontend.onrender.com`

---

## ⚠️ Important Notes

- **First visit**: Backend may take 30-60 seconds to wake up
- **Free tier limits**: 750 hours/month (24/7 for 1 month)
- **Auto-sleep**: Services sleep after 15 minutes of inactivity
- **MongoDB**: Free tier gives 512MB storage

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check environment variables (especially MONGODB_URI)
- View logs in Render dashboard
- Ensure all dependencies are in package.json

**Frontend can't reach API:**
- Verify backend is deployed and running
- Check CORS settings in backend
- Confirm API URL in frontend .env.production

**Database connection failed:**
- Verify MongoDB connection string
- Check database user permissions
- Ensure network access allows 0.0.0.0/0

---

Ready to deploy? Start with MongoDB Atlas setup! 🚀
