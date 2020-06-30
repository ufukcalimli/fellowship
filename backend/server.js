const express = require("express");
const connectDb = require("./helpers/db");
const cors = require("cors");

const logger = require('./helpers/logger')

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

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
