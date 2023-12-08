const mongoose = require('mongoose');

const Agentinfo = new mongoose.Schema({
    name:String,
    companyname:String,
    email:String,
    mobile: Number,
    password:String,
    city: String,
    state: String,
    bussinessexp: String,
    opreatingfiled: String,
    companywebsite:String,
    sales:String,
    hearabout:String,
    confirm:{
      type:  String,
      default:"",
    } 

});

const agentinfo =new mongoose.model('agentdetail',Agentinfo)
module.exports =agentinfo;