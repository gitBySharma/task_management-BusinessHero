require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.listen(process.env.PORT, () => {
    console.log(`Server is live on port ${process.env.PORT}`);
});
