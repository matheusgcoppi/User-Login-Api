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

const port = process.env.PORT || 8080

app.use(express.json())

app.use(require("./routes.js"))
app.listen(port, () => {
    console.log(`server at port ${port} is running`);
});

router.get("/", (req, res) => {
    return res.status(200).json({ message: 'ok' });

})



