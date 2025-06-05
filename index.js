const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateCertificate } = require('./controllers/certificate');
dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/health-check',(req,res)=>{
    res.json({message:"Working fine"})
});

app.post('/generate-certificate',generateCertificate)


app.listen(process.env.PORT || 8081,()=>{
    console.log(`Server is starting on port ${process.env.PORT}`)
})
