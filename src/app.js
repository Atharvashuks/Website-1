const express = require('express');
const path = require('path');
require("./db/conn");
const hbs = require('hbs');

const Regi = require("./models/register");
const { json } = require("express");
const { captureRejectionSymbol } = require('stream');


const app = express();
const port = process.env.PORT || 8000;

const templatepath = path.join(__dirname,"../templates/views");
const partial = path.join(__dirname,"../templates/partials");


app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

//routing 
//app.get(path,callback)

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.set("view engine","hbs")
app.set("views",templatepath);
hbs.registerPartials(partial);

app.get("/",(req,res) =>{
    res.render("index");
})

app.get("/register",(req,res) =>{
    res.render("form");
})

app.get("/aboutus",(req,res) =>{
        res.render("aboutus");
    })

app.get("/login",(req,res) =>{
    res.render("login");
})

app.get("/secret",(req,res) =>{
    res.render("secret");
})

//server creaate
app.listen(port, () => {
    console.log(`This server is running on port :) ${port} `);
})


app.post("/register",async (req,res) => {
    try{

        const password = req.body.pass;
        const Cpassword = req.body.Cpass;

        if(password === Cpassword){

            const RegI = new Regi({
                name:req.body.name,
                email: req.body.email,
                number:req.body.number,
                pass: req.body.pass,
                Cpass:req.body.Cpass,
                course:req.body.course
            })

            const registered = await RegI.save();
            res.status(201).render("index");

        }
        else{
            res.send("Passwords not matching!!!");
        }
    }catch(error){
        res.status(400).send(error);
    }
})

//login validation

app.post("/login" , async(req,res) => {
    try{

        const email = req.body.email;
        const pass = req.body.pass;

        const userEmail= await Regi.findOne({email: email});

        if(userEmail.pass === pass){
            res.status(201).render("secret");
        }
        else{
            res.send("Invalid login Details.......");
        }

        // res.send(userEmail);
        // console.log(userEmail);

    }catch(error){
        res.status(400).send("Invalid login Details.......");
    }
})