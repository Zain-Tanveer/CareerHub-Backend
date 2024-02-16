require("express-async-errors");

const path = require("path");

// express import and invoke
const express = require("express");
const app = express();

// security middleware imports
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// database import
const connectDB = require("./database/connect");

// auth middleware
const auth = require("./middlewares/authenticate");

// routes import
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const skillRouter = require("./routes/skill");
const jobsRouter = require("./routes/user-jobs");

// error middlewares import
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// security middlewares
app.use(
  rateLimiter({
    windowMs: 5000,
  })
);
app.use(cors());
app.use(xss());
app.use(helmet());

// express middlewares
app.use(express.json({ limit: "4096mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.render("index");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", auth, userRouter);
app.use("/api/v1/user/skills", auth, skillRouter);
app.use("/api/v1/user/jobs", auth, jobsRouter);

// error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`Connected to DB...`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
