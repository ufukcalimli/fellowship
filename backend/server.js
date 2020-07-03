const express = require("express");
const cors = require("cors");
const passport = require('passport')
const session = require('express-session')

const connectDb = require("./config/db");

const logger = require('./helpers/logger')

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    saveUninitialized: false,
    resave:false,
    secret: 'session_secret', 
    cookie: { maxAge: 24 * 60 * 60 * 365 * 1000 } // 1 year
}))

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/auth"));

app.use("/api/user", require("./routes/user"));
app.use("/api/profile", require("./routes/profile"));

app.use("/api/comment", require("./routes/comment"));
app.use("/api/post", require("./routes/post"));

app.use("/api/tag", require("./routes/tag"));
app.use("/api/role", require("./routes/role"));
app.use("/api/language", require("./routes/language"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, logger.info(`Server is running on http://localhost:${PORT}`));
