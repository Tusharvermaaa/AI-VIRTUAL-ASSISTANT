import express from 'express';
import dotenv from 'dotenv';
import connectdb  from './config/databaseconfig.js';
dotenv.config();

const app = express();

connectdb();

app.get('/' , (req, res)=>{
    res.send('Hello World!');
})



const port=process.env.PORT || 7001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
