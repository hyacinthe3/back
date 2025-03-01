import express from 'express';
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import mainRouter from './routes/indexRouting.js';

dotenv.config();

const port=process.env.PORT ||3000
const db_user=process.env.DB_USER;
const db_name=process.env.DB_NAME;
const db_pass=process.env.DB_PASS;

const app=express();
app.use(express.json())
app.use('/', mainRouter);
// app.get('/',(req,res)=>{
//     res.send("this is backend ")
// })
// const PORT=5000;
// app.listen(PORT,()=>{
//     console.log(`running ${PORT}`);
    
// })

const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.ti2w8.mongodb.net/${db_name}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });