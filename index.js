//google pe search kiya matlab get request
//form submit kiya matlab ki woh request jo uske method mein daali
//method oovveride does not override get request so always use post request
//imagine karo ki kya search krne pe kya render hona chahiye
const express=require("express");
const port=3000;
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.listen(port,()=>{
    console.log("just listened");
}) 
let posts=[
    {
        id:uuidv4(),
        username:"apna college",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"pranshu garg",
        content:"Hello pranshu ji"
    },
    {
        id:uuidv4(),
        username:"rahul kumar",
        content:"I got selected in my 1st internship"
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

//create route to add posts
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{//form submit hone ke baad yaha aa gaye
    let {username,content}=req.body; 
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

//view route or basically show post in detail
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        return id===p.id;
    });
    res.render("show.ejs",{post});
})

//update
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    post.content=req.body.content;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        return id===p.id;
    });
    res.render("edit.ejs",{post});
})

//delete or destroy
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>{
        return id!=p.id;
    });
    res.redirect("/posts");
})
