const express = require("express");
const cors = require("cors");
const passport = require('passport')
const session = require('express-session')

const connectDb = require("./config/db");

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    saveUninitialized: false,
    resave:false,
    secret: 'session_secret', 
}))

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    //console.log(req.session);
    console.log({user: req.user});
    next();
});

app.use('/', (req, res, next) => {
    res.send(`root endpoint and user: ${req.user} session: ${req.session}`)
})

app.use("/api/auth", require("./routes/auth"));

app.use("/api/user", require("./routes/user"));
app.use("/api/profile", require("./routes/profile"));

app.use("/api/comment", require("./routes/comment"));
app.use("/api/post", require("./routes/post"));

app.use("/api/tag", require("./routes/tag"));
app.use("/api/role", require("./routes/role"));
app.use("/api/language", require("./routes/language"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
