const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    res.send('Home page')
})

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));