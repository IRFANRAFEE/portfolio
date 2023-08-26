const express = require ("express");
const app = express();
const path = require ("path");
const hbs = require ("hbs");
require("./db/conn");
// const Contacted = require("./models/schema");
const contactModel = require("./models/schema");

const port =  process.env.PORT||5000;
//  const staticpath = path.join(__dirname,"../public/imagesfolder") 
 const viewpath = path.join(__dirname,"../templates/views")
// app.use (express.static(staticpath));
app.use(express.urlencoded({extended:false}))
app.set(`view engine`,`hbs`);
app.set("views",viewpath)
app.get("/",(req,res)=>{
res.render("index");
})
// app.get("/about",(req,res)=>{
// res.render("about");
// })
// app.get("/contact",(req,res)=>{
// res.render("contact");
// });
app.post("/index",async (req,res)=>{
     try{
        const contactemployee = new contactModel({
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
             message:req.body.message,
        });
    const employee=await contactemployee.save();
    res.render("index");
     }
     catch(err){
        res.send(err)
     }

});
app.listen(port,()=>{
    console.log(`app is listening to port no ${port}`);
});