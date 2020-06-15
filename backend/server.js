const express = require("express");
const connectDb = require("./helpers/db");
const cors = require("cors");

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/tag", require("./routes/tag"));
app.use("/api/role", require("./routes/role"));
app.use("/api/comment", require("./routes/comment"));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
