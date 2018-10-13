//express
var express = require('express');

//bodyParser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//redering webpages
module.exports = function (app) 
{
  
  app.get('/signout',function(req,res)
  {
    res.render('index');
  });    
  
  //serving index.ejs at start
  app.get('/',function(req,res)
  {
    res.render('index'); 
  });    
  

  app.get('/info', urlencodedParser ,function (req,res) 
  {
 
    console.log("========== query gmail ============= "+req.query); 
   var profileowenerid = req.query;
   console.log("request of profile is from = "+profileowenerid.id)

    usergmail = profileowenerid.id;
    console.log();
    console.log("Logged in user = " + usergmail);

        res.render('info',{usergmail:usergmail});
  })

  //accepting gmail from user and if new then stoaring it into database
  app.post('/info', urlencodedParser , function(req,res)
  {

    usergmail = req.body.useremail;
    console.log();
    console.log("Logged in user = " + usergmail);

    //find gmail
    userModel.find({gmail: usergmail}, function (err,data) 
    {
      if (err) throw err;

      //if gmail is not in database
      if(data == "")
      {
        //render the info page and save email in database
        res.render('info');

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
         res.render('nestimatic');

      }      
    });
  });
};
