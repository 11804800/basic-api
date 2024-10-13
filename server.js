import express from 'express';

const app=new express();
app.listen(3000,()=>{
    console.log("Express is running at 3000")
});