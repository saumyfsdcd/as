const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const ejs=require('ejs');
const { redirect } = require('express/lib/response');
const posts=[];

const homecontent= 'Rules and Regulations:  you can make a new blog by clicking on the compose button on the navbar all the blogs you have made will be shown below' 
const aboutcontent='this is just a test website made by mango saumy and he putted a lot of effort to make this so please give this site a 5star rating'
const contact='Contact me at the email ID: samcode46@gmail.com mobile number: 9675984833'


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"))

app.get('/', (req,res)=>{
    res.render('home', {h:"Home", p:homecontent, newi: posts});
})

app.get('/about', (req,res)=>{
    res.render('about', {h: aboutcontent})
})

app.get('/contact', (req,res)=>{
    res.render('contact', {h: contact})
})

app.get('/compose', (req,res)=>{
    res.render('compose')
})

app.post("/", (req,res)=>{
    var object={
        "title": req.body.val,
        "description": req.body.post
    }
    posts.push(object);
    console.log(object);
    res.redirect('/');
})

app.get('/posts/:topic', function(req,res){
    const title=req.params.topic;
    posts.forEach(function(post){
        if(title===post.title){
            res.render('post', {title: post.title, p: post.description})
        }
    }) 
})


app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running on port 3000');
})