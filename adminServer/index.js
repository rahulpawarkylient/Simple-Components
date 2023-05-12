import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./db/Connection.js";
import adminRouter from "./routes/AdminLogin.js";
import userRouter from "./routes/ManageUsers.js";
import productRouter from "./routes/ManageProducts.js";
import categoryRouter from "./routes/Category.js";
import subCategoryRouter from "./routes/SubCategory.js";
import BlogManageRouter from "./routes/BlogManagement.js";
import FaqRouter from "./routes/Faq.js";
import notificationRoute from "./routes/Notification.js";


const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(cors());

//mongodb connection using dotenv
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

//convert in json form
app.use(express.json({ limit: "5mb" }));

// Upload Image Static
app.use("/uploads", express.static("uploads"));

//Admin Routes
app.use("/api/", adminRouter);

//user Routes
app.use("/api/user", userRouter);

//Product Routes
app.use("/api/product", productRouter);

//Category Routes
app.use("/api/category", categoryRouter);

//Sub-Category Routes
app.use("/api/sub-category", subCategoryRouter);

//Sub-Category Routes
app.use("/api/blog", BlogManageRouter);

//FAQ Routes
app.use("/api/faq", FaqRouter);

//Notification Routes
app.use("/api/notify", notificationRoute);

// for testing only
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
