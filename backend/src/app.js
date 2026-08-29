import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";

// import authRoutes from "./routes/auth.routes.js";
// import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// app.use(
//   helmet()
// );

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
//   })
// );

// app.use(
//   express.json({
//     limit: "10kb"
//   })
// );

// app.use(cookieParser());

// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "ok"
//   });
// });

// app.use(
//   "/api/auth",
//   authRoutes
// );

// app.use(errorHandler);

export default app;