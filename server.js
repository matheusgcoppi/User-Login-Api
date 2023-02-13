const express = require('express');
const router = require('./routes.js');
const app = express();
const cors = require('cors')
app.use(cors({
    allowedHeaders: '*',
    allowMethods: '*',
    origin: 'http://localhost:3000'
})
);

app.use(express.json())

app.use(require("./routes.js"))
app.listen(8080, () => {
    console.log('server at port 8080 is running');
});

router.get("/", (req, res) => {
    res.send('teste');
})



