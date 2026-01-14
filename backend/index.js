import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import path from 'path';

// ⭐ ADD CLERK MIDDLEWARE
import { clerkMiddleware } from "@clerk/express";
import businessProfileRouter from './routes/businessProfileRouter.js';
import invoiceRouter from './routes/invoiceRouter.js';
import aiInvoiceRouter from './routes/aiInvoiceRouter.js';

const app = express();
const port = process.env.PORT || 4000;

// ⭐ IMPORTANT: ENABLE CREDENTIALS FOR CLERK COOKIE SESSION
const allowedOrigins = [
  "http://localhost:5173",
  "https://invoiceitt.netlify.app/" // Ensure this exactly matches your Netlify URL (no trailing slash)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    // Use .includes to catch minor string mismatches or use a simple boolean check
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // This helps you see the error in Render logs
      return callback(new Error("CORS not allowed"), false);
    }
  },
  credentials: true
}));


// ⭐ Use Clerk middleware globally (does NOT protect routes)
app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Database Connection
connectDB();

// Static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes (unchanged)
app.use("/api/businessProfile", businessProfileRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/ai", aiInvoiceRouter);

// Test route
app.get('/', (req, res) => {
    res.send('API Working with Clerk Auth');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
