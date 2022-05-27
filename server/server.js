const express = require('express');
const req = require('express/lib/request');
const port=5555;
const app= express();
const hbs= require("hbs");
const path= require("path");
const db= require("../db/db");



const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  database: "contactdb",
  user: "contactuser",
  password: "contactpass",
});



const staticPath= path.join(__dirname ,"../public");
const templatePath= path.join(__dirname ,"../templates/views");
const partialPath= path.join(__dirname ,"../templates/partials");





app.set("view engine", "hbs");
app.set("views",templatePath);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(staticPath));

hbs.registerPartials(partialPath);








app.get("/",(req,res)=>{

    res.render("index")
})



app.get("/addcontact",(req,res)=>{
    res.render("addContact");
})


app.post("/addcontact",(req,res)=>{
   
    db.insertContactDetails(req.body.name,req.body.phone,req.body.email).then(()=>{

        res.redirect("/allContacts");
        
    })
    .catch((err)=>{
        res.redirect("/addContact"); 
    })
})

app.get("/allcontacts",(req,res)=>{
    db.getContactDetail().then((contact)=>{
        res.render("allContacts",{contact})
    }).catch((err)=>{
        res.send(`-----page not found---`);
        console.log(err);
    })
})




app.get("/edit/:userId",(req,res)=>{
    const userId= req.params.userId;
    let sql=`SELECT * FROM contact_data WHERE id =${userId}`;
    let query= connection.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("editContact",{
                contact:result[0]
            });
        }
    })
});

app.post("/update",(req,res)=>{

    const userId = req.body.id;
    let sql = "update contact_data SET name='"+req.body.name+"',  phone='"+req.body.phone+"', email='"+req.body.email+"' where id ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect("/allContacts");
    });
})



app.get("/delete/:userId",(req,res)=>{
    const userId= req.params.userId;
    let sql=`DELETE FROM contact_data WHERE id =${userId}`;
    let query= connection.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/allContacts");
        }
    })

})


app.get("/search",(req,res)=>{
    var name= req.query.name;
    let sql= `SELECT * FROM contact_data WHERE name LIKE '%'+name+'%'`
    let query= connection.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/allContacts");
        }
    })

})


app.listen(port,()=>{
    console.log(`your server is working at http://localhost:${port}/`);
})