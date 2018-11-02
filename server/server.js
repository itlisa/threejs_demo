const express = require('express');


const mongoose = require('mongoose');
//链接mongodb
const DB_URL = "mongodb://127.0.0.1:27017";

mongoose.connect(DB_URL);
mongoose.connection.on("connected",function(){
  console.log("mongo connect success")
});
//新建app
const app = express();


app.get('/',(req,res)=>{
  res.send('<h1>hello world</h1>')
});
app.get('/data',function(req,res){
  res.json({user:"夏利",age:20})
});
app.get('/info',function(req,res){
  res.json({code:1})
});
app.listen(9093,function(){
  console.log("Node app start at port 9093")
});