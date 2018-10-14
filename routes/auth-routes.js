//express
var express = require('express');

//bodyParser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//MongoDB 
var mongoose = require('mongoose');

//requiring users databse controller
var userModel = require('../controllers/database-controllers/users-database-controller');

const router = require("express").Router();
const passport = require('passport');

//auth login 
router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/logout",(req,res)=>{
    res.send("logging out");
})

router.get("/google",passport.authenticate('google',{
    scope: ['profile','email']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>
{
    //res.redirect('/nestimatic');
   // console.log(req.user);
    console.log("------------------ In redirected file of google ------------------")
    console.log("gmail : "+req.user.emails[0].value);
    console.log("Display Name : "+req.user.displayName);
    console.log("photos : "+req.user.photos[0].value);
    
    //cheking user already exits or not 
        //find gmail
        userModel.find({gmail: req.user.emails[0].value}, function (err,data) 
        {
          if (err) throw err;
    
          //if gmail is not in database
          if(data == "")
          {

            var sendingmaildata = {
              gmail :  req.user.emails[0].value,
              familyName : req.user.name.familyName,
              givanName : req.user.name.givenName,
              fullname : req.user.displayName,
              url : req.user.photos[0].value,
              exits: "no"
            }
        
             //inserting user data
             var insertUser = userModel({
              _id : 2,
             gmail: req.user.emails[0].value, 
             firstname: req.user.name.givenName, 
              lastname: req.user.name.familyName, 
              fullname : req.user.displayName,
              profileimageurl: req.user.photos[0].value}).save(function (error)
             {
               if (error) throw error;
               console.log("*******----------- new user gmail saved --------------***************");

               console.log("Logged in user = " + req.user.emails[0].value);

               res.render("info",{data: sendingmaildata});
           
             });

          }
          else
          {
        
            console.log("user Already exits");

            var sendingmaildata = {
              gmail :  req.user.emails[0].value,
              familyName : req.user.name.familyName,
              givanName : req.user.name.givenName,
              fullname : req.user.displayName,
              url : req.user.photos[0].value,
              exits: "yes"
            }

            console.log("Logged in user = " + req.user.emails[0].value);

            res.render("info",{data: sendingmaildata});

          }      
        });
       

 
    /*     
    //find gmail
    userModel.find({gmail: usergmail}, function (err,data) 
    {
      if (err) throw err;

      //if gmail is not in database
      if(data == "")
      {
        //render the info page and save email in database
       //res.render('info');

        //finding max-id to save the gmail in database
        userModel.find({},function (err,data)
        {
          if(err)throw err;
          //for loop until end of retrived data
          for(var i=0;i<data.length;i++)
          {
            maxid = data[i]._id;
          }
          
          console.log("maxid means total users are = " + maxid);
          maxid++;
  
         //inserting user data
         var insertUser = userModel({
          _id: maxid,
          nid: maxid,
          gmail: usergmail,}).save(function (error)
          {
            if (error) throw error;
            console.log("new user gmail saved");
          });

          //assiging the new users id for future purpose / reference using nid
          usernid = maxid;

          var maxsessionid;

          sessionModel.find({},function (err,data) 
          {
            if (err) throw err;

            for(var i=0;i< data.length; i++)
            {
              maxsessionid = data[i]._id;
             }
          console.log(maxsessionid);
          maxsessionid++;
          console.log(maxsessionid);
        
          var insertSession = sessionModel({
            _id: maxsessionid, 
            sessionid: req.session.id,
             nid: usernid, 
           gmail: usergmail
          }).save(function (error)
            {
              if (error) throw error;
              console.log("new session saved");
            });
           })

        });
      }
      else
      {
    
        console.log("user Already exits");
        //assinging the user id for future id 
        usernid = data[0].nid;
        console.log("Nestimaic id of user is = " + usernid);       
        var maxsessionid;

        sessionModel.find({},function (err,data) 
        {
          if (err) throw err;

          for(var i=0;i< data.length; i++)
          {
            maxsessionid = data[i]._id;
           }
        console.log(maxsessionid);
        maxsessionid++;
        console.log(maxsessionid);
        console.log(req.session.id)
        var insertSession = sessionModel({
          _id: maxsessionid, 
          sessionid: req.session.id,
           nid: usernid, 
         gmail: usergmail
        }).save(function (error)
          {
            if (error) throw error;
            console.log("new session saved");
          });
         })
      //   res.render('nestimatic');
      res.redirect('/nestimatic');
          
      }      
    });*/    
});
module.exports = router;