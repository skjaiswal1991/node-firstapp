var express = require('express');
var app = express();
const axios = require('axios');
var http = require('http').Server(app);
var forEach = require('async-foreach').forEach;
var db = require('./dbconnection'); 
var io = require('socket.io')(http);
var https = require('https')
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

const server = require('http').createServer();
const request = require('request');
var datetime = new Date();

var moment = require('moment');


io.on('connection', function(socket) {
    console.log('A user connected');
    //socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
});


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
 
// add view Engin
app.set('view engine', 'ejs'); 

//Set the path public folder
app.use(express.static('public'));

// get the html form request
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//console.log(remainingDate) // at time of posting, 106 days

// axios.get('/express/coundown/services.php')
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     //console.log(response.data);
//     // always executed
//   });



// Enterval to get update
async function watchdata(){
      //console.log("Interval working !");
        var data;
        var datetime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        var company_id = '';

        await request('http://localhost/express/coundown/services.php', { json: true }, (err, res, body) => {
        
            if (err) { return console.log(err); }

            respaonseData = body;
            respaonseData.forEach(data => { 

           var sql = "SELECT * FROM company as c INNER JOIN company_meta as cm On c.id = cm.company_id WHERE c.company_code = '"+data.customer_code+"'";
           
            
             db.query( sql,function( error,result,field){
                if(!error){

                    if(!result || result.length == 0  ){

                        var sql = "Insert Into company (name,company_code) VALUE('"+data.customer_code+"','"+data.customer_code+"')";
                    
                        db.query(sql,function( error,result,field){

                            let company_id = result.insertId;

                            if(company_id){

                                data.timerdata.forEach(timerdata => {
                                    var sql = "Insert Into company_meta (company_id,timer_code,set_time,start_time,event) VALUE ('"+company_id+"','"+timerdata.timer_code+"','"+timerdata.set_time+"','"+datetime+"','"+timerdata.event+"')";
                                    db.query(sql,function( error,result,field){
                                        // console.log(error);
                                        //console.log(result);
                                    })
                                });
                            }

                        });
                    
                    } else {
                            //console.log(company_id);
                            //console.log(data.timerdata);
                            

                            forEach(data.timerdata, async(timerdata) => { 
                                let company_id =  result[0].company_id;
                                let sqldata = "SELECT * FROM company as c INNER JOIN company_meta as cm On c.id = cm.company_id WHERE cm.company_id = '"+company_id+"' and cm.timer_code = '"+timerdata.timer_code+"'";
                                await db.query(sqldata,function(error,result,field){
                                            mdata = result[0];
                                            //console.log("result length="+result.length);
                                           if( result.length == 0 )
                                            {
                                                var sql = "Insert Into company_meta (company_id,timer_code,set_time,start_time,event) VALUE ('"+company_id+"','"+timerdata.timer_code+"','"+timerdata.set_time+"','"+datetime+"','"+timerdata.event+"')";
                                                console.log(sql);
                                                db.query(sql,function( error,result,field){

                                               });
                                            }
                                            else if( parseInt(result[0].set_time) !==  parseInt(timerdata.set_time) || parseInt(result[0].event) !== parseInt(timerdata.event) )
                                            {
                                                console.log("change requrired");
                                                //console.log(result);
                                                var sql = "UPDATE company_meta SET  set_time = '"+timerdata.set_time+"',event = '"+timerdata.event+"',start_time = '"+datetime+"' WHERE company_id = '"+company_id+"' and timer_code = '"+timerdata.timer_code+"'";
                                                //console.log(sql);
                                                db.query(sql,function(error,result,fields){ 
 
                                                        if(!error){

                                                            var startDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
                                                            var endDate = moment(new Date(datetime)).format("YYYY-MM-DD hh:mm:ss");
                                                            var  remainSecond = moment(startDate).diff(endDate, 'seconds');

                                                            if( remainSecond > (timerdata.set_time * 60) || mdata.event == 0 ){
                                                                remainSecond = 0; 
                                                            }else{
                                                                remainSecond = (parseInt(timerdata.set_time) * 60) - remainSecond;
                                                            }
                                                            console.log(remainSecond);
                                                            var minuts = Math.floor(remainSecond / 60 );
                                                            var second = Math.floor(remainSecond % 3600 % 60);

                                                            returndata = {  
                                                                            minuts :minuts,
                                                                            second : second,
                                                                            event : timerdata.event,
                                                                            remain_second:remainSecond,
                                                                            companyid: company_id, 
                                                                            timerid: timerdata.timer_code
                                                                        };
                                                            console.log("return data form update");
                                                            io.emit('newclientconnect',returndata);             
                                                            // console.log(returndata);            
                                                        } 
                                                });
                                            }
                                            
                                            
                                }) 
                            });

                           //console.log("sanjay");
                            //if(result.)

                    }
                }// if not any error on first Query.
                    //console.log(data);
                    
                   
            });
           });
        });

        setTimeout(() => {
            watchdata();
        }, 3000);
        
}






// Default open page when website open
app.get('/',function(req,res){
    status = { success: true, responce: '',msg:''};
    res.render('index',status);
})


// show page all the company website
app.get('/showwatchdata/:id',function(req,res){

    io.emit("welcome",{data:"helloasdhasdf"});

    var returndata = new Array();
    var sql = "SELECT * FROM company as c INNER JOIN company_meta as cm On c.id = cm.company_id where c.company_code = '"+req.params.id+"'";
    console.log(sql);   
    db.query(sql,function(error,result,fields){
        second = 1;
        result.forEach(timerdata=>{
            var startDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            console.log(startDate);
            var endDate = moment(new Date(timerdata.start_time)).format("YYYY-MM-DD hh:mm:ss");
            console.log(endDate);
            var remainSecond = moment(startDate).diff(endDate, 'seconds');
            console.log(remainSecond);
           
            if( remainSecond > (parseInt(timerdata.set_time) * 60) || timerdata.event == 0 ){
                remainSecond = 0; 
            }else{
                remainSecond = (parseInt(timerdata.set_time) * 60) - remainSecond;
            }
            var minuts = Math.floor(remainSecond / 60);
            var second = Math.floor(remainSecond % 3600 % 60);
            returndata.push({  
                                minuts :minuts,
                                second : second,
                                event:timerdata.event,
                                timer_code:timerdata.timer_code,
                                remain_second:remainSecond
                        });

        })
        
        res.render('viewpage',{returndata : returndata});
    })
      
})
app.post('/showwatchdata',function(req,res){

    // var sql = "SELECT * FROM company as c INNER JOIN company_meta as cm On c.id = cm.company_id where c.company_code = '"+req.body.data+"'";
    // console.log(sql);
    // db.query(sql,function(error,result,fields){
    //     second = 1;
    //     var startDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    //     var endDate = moment(new Date(result[0].start_time)).format("YYYY-MM-DD hh:mm:ss");
    //     var remainingDate = moment(startDate).diff(endDate, 'minutes');
        
    //     if( remainingDate > result[0].set_time ){
    //         remainingDate = 0;
    //     }else{
    //         second  = 59;
    //         remainingDate = parseInt(result[0].set_time) - remainingDate;
    //     }
    //     hr = parseInt(remainingDate / 60);
    //     min = parseInt(remainingDate % 60);
    //     houres = Math.round(hr);
    //     minuts = Math.round(min);
    //     returndata  = {  
    //                     houres :houres,
    //                     minuts :minuts,
    //                     second : second,
    //                     event:result[0].event,
    //                     timer_code:result[0].timer_code
    //                   };


    //     //console.log(result[0].event);
    //     console.log(remainingDate);
    //     res.json(returndata);
    // })
    //console.log(req.body.data);
    //console.log(res);
   res.render('viewpage',{resp: req.body.data});
})

app.get('/dashboard',function(req,res){
    
    let allusers;
    db.query('SELECT * FROM company as c INNER JOIN company_meta as cm On c.id = cm.company_id',function(error,result,fields){
        if( !error ){
            console.log("sanjay");
            //console.log(result);
            allusers = result;
            console.log(allusers);
            res.render('dashboard/dashboard',{userdata: allusers });
        }else{
            console.log(error.sqlMessage);
        }
    });
});

app.get('/dashboard/adduser',function(req,res){
    res.render('dashboard/adduser');
})


app.post('/dashboard/adduser',function(req,res){
    console.log(req.body);
    res.render('dashboard/adduser');
})

app.get('/register',function(req,res){
    //console.log(req.body);
    //uservalidation(req.body)
    res.render('register');
    
})

app.post('/authentication',function(req,res){
    console.log(req.body);

    status = {};
    console.log(req.body);
    if(req){

        db.query("Select * from users where email = '"+req.body.email+"' and password = '"+req.body.password+"'",function(error,result,fields){
            console.log(result);
            if( result.length > 0 ){
                console.log(result);
                let token = jwt.sign({username: req.body.email},config.secret,{ expiresIn: '24h'});
                res.redirect('/dashboard');
                
            }else{
                res.render('index',{success: false,responce: 'Authentication Unsuccessful!',msg:'Please check username and password'});
      
            }
        })
    }
    
   // console.log(status);
   // res.render('dashboard/dashboard');
    
})


http.listen(3000, function() {
    watchdata();
 });
// app.listen(3000, function(){
    //watchdata(); 
// });