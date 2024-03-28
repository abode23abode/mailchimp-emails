 const express =require("express");
 const bodyParser=require("body-parser");
 const request =require("request")
 const https=require("https");

 const app=express();

 app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/success",function(req,res){
    res.sendFile(__dirname+"/success.html")
})
app.get("/failuer",function(req,res){
    res.sendFile(__dirname+"/failuer.html")
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

var firstname=req.body.fName
var lastname=req.body.lName
var email=req.body.email
var data = {
    members:[{
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstname,
            LNAME:lastname
        }
    }]
};

var jsonData=JSON.stringify(data);
var url='https://us12.api.mailchimp.com/3.0/lists/c4750d4824'

var options={
    method:"POST",
    auth:"abode:e19a78bda17070403cd4d7e4d5bafce2-us12"
}

const request= https.request(url,options, function(response){

if(response.statusCode===200){
   res.redirect("/success")
}else{
    res.redirect("/failuer")
}

 response.on("data",function(data){
console.log(JSON.parse(data)); 

 })
})

request.write(jsonData);
request.end();
})

app.post("/success",function(req,res){
    res.redirect("/")
})
app.post("/failuer",function(req,res){
    res.redirect("/")
})


 app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000 !")
 });

