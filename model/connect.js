const mongoose = require('mongoose');
try{
  mongoose.connect("mongodb+srv://newuser:z7UqI9NupTXPsCNu@cluster0.s0eozxk.mongodb.net/newuser?retryWrites=true&w=majority").then(()=>console.log("database connected successfully"))

console.log("suceesfully connected")
} 
catch(error){
    console.log(error);
}