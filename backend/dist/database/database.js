"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MSG_SENDING_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
};
// Initialize Firebase
exports.firebase = (0, app_1.initializeApp)(firebaseConfig);
