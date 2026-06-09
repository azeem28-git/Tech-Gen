# TechGen – Firebase Setup Guide

Step-by-step instructions to connect TechGen to Firebase for **Authentication**, **Firestore database**, and **Storage**.

---

## Step 1 – Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it `techgen` (or anything you like)
4. Disable Google Analytics (optional)
5. Click **Create project**

---

## Step 2 – Register a Web App

1. On the project overview page, click the **`</>`** (Web) icon
2. App nickname: `TechGen Web`
3. Check **"Also set up Firebase Hosting"** if you want free hosting
4. Click **Register app**
5. Copy the `firebaseConfig` object — you'll need it next

---

## Step 3 – Paste Your Config

Open `src/firebase/config.js` and replace the placeholder values:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",          // ← your key
  authDomain:        "techgen-xxx.firebaseapp.com",
  projectId:         "techgen-xxx",
  storageBucket:     "techgen-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc123",
};
```

---

## Step 4 – Enable Authentication

1. In Firebase Console → **Authentication** → **Get started**
2. Enable **Email/Password** provider
3. Enable **Google** provider
   - Set your project's support email
   - Save

---

## Step 5 – Create Firestore Database

1. Firebase Console → **Firestore Database** → **Create database**
2. Choose **"Start in production mode"** (we'll set rules next)
3. Select a region: `asia-south1` (Mumbai) — best for Indian users
4. Click **Enable**

---

## Step 6 – Deploy Security Rules

Copy and paste the contents of `firestore.rules` into:

**Firebase Console → Firestore Database → Rules tab**

Then click **Publish**.

The rules ensure:
- Anyone can **read** products and categories
- Only the **owner** can read/write their cart, wishlist, orders
- Only **admins** (role = 'admin') can write products and update orders

---

## Step 7 – Set Up Firebase Storage (for product images)

1. Firebase Console → **Storage** → **Get started**
2. Start in production mode
3. Choose same region as Firestore
4. In the **Rules** tab, paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{imageId} {
      allow read: if true;
      allow write: if request.auth != null
        && get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Step 8 – Make Yourself an Admin

After you first sign up on the app, go to:

**Firebase Console → Firestore → users → [your uid]**

Edit the document and change:
```
role: "user"  →  role: "admin"
```

This gives you access to the Admin Dashboard.

---

## Step 9 – Seed Products (Optional)

To populate Firestore with the starter product catalog, open the browser console on your running app and run:

```js
import { seedProducts } from './firebase/firestore';
import { products } from './data/products';
await seedProducts(products);
```

Or use this one-liner in the browser DevTools console after the app loads:

```js
window.__seedTechGen && window.__seedTechGen()
```

---

## Step 10 – Run the App

```bash
npm install
npm start
```

---

## Step 11 – Deploy to Firebase Hosting (Free)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Public directory: build
# Single page app: Yes
npm run build
firebase deploy
```

Your app will be live at `https://your-project-id.web.app` 🎉

---

## Firestore Collections Created Automatically

| Collection | Created by |
|---|---|
| `users/{uid}` | On first sign-up |
| `users/{uid}/cart` | On add-to-cart (logged in) |
| `users/{uid}/wishlist` | On wishlist toggle |
| `users/{uid}/customBuilds` | On save build |
| `products` | Admin / seed script |
| `categories` | Admin |
| `orders` | On checkout |

---

## Environment Variables (Optional)

For security, you can move your Firebase config to a `.env` file:

```
# .env.local
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=techgen.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=techgen
REACT_APP_FIREBASE_STORAGE_BUCKET=techgen.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456
REACT_APP_FIREBASE_APP_ID=1:123:web:abc
```

Then update `src/firebase/config.js`:

```js
const firebaseConfig = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.REACT_APP_FIREBASE_APP_ID,
};
```

Add `.env.local` to `.gitignore` before pushing to GitHub.

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | React 18, CSS Variables (SF font system) |
| Auth | Firebase Authentication (Email + Google) |
| Database | Firebase Firestore (real-time NoSQL) |
| File Storage | Firebase Storage |
| Hosting | Firebase Hosting (free tier) |
| State | React Context (Theme, Auth, Cart) |
| Payments | Cash on Delivery (Razorpay ready) |
