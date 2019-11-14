var accOn;
var User = require('../models/user.js');
var Rock = require('../models/rock.js').model;



module.exports = function(app){
    
    
    app.get('/', function(req, res){
        accOn = -1;
        res.render("login.ejs");
    });
    
    app.post('/post', function(req, res) {
        console.log(req.body.name); 
        console.log(req.body.password);
        User.findOne({userName: req.body.name, password: req.body.password}, function(err, user){
            if(user){
                accOn = user;
                res.render('home.ejs', {user: user});        
            }else{
                res.redirect('/?fail=true');
            }
        });
    });
    
    app.get('/sign', function(req, res){
        res.render('signup.ejs');
    });
    
    app.post('/signed', function(req,res){
        console.log(req.body.name);
        console.log(req.body.password);
        User.findOne({userName: req.body.name}, function(err, user){
            if(user){
                res.redirect('/sign?exists=true');
            }else{
                var u = new User({userName: req.body.name, password: req.body.password, favFood: req.body.food, favColor: req.body.color});
                u.save(function(err, user){
                    console.log("User made: " + user);
                    res.redirect('/');  
                });
            }
        });

    });
    
    app.get('/up', function(req, res){
        res.render('update.ejs');
    });
    
    app.post('/update', function(req, res){
        User.findOne({userName: accOn.userName}, function(err, user){
            user.favFood = req.body.food;
            user.favColor = req.body.color;
            user.save(function(err, user){
                res.render('home.ejs', {user: user});
            });
        });
    });

    app.get('/list', function(req, res){
        User.find({}, function(err, users){
            console.log(users) 
            res.render('list.ejs', {l: users});    
        });
    });

    app.get('/rock', function(req, res){
        User.findOne({userName: accOn.userName}, function(err, user){
            res.render('rocks.ejs', {arr: user.rocks});
        })
        
    });

    app.post('/add', function(req, res){
        var r = new Rock({rockName: req.body.rockName, rockColor: req.body.rockColor, rockNum: req.body.rockNum, userName: accOn.username});
         
        //rocks now saved to database and assigned to user, restructure so that there is use for this, also finish it    
        User.findOne({userName: accOn.userName}, function(err, user){
            user.rocks.push(r);
            r.userName = user.userName;
            r.save();
            console.log(user.rocks);
            user.save(function(err, user){
                res.render('home.ejs', {user: user});
            });
        });
    });

    app.post('/remove', function(req, res){
        User.findOne({userName: accOn.userName}, function(err, user){
            for(var i = 0; i < user.rocks.length; i++){
                if(user.rocks[i].rockName == req.body.rockType){
                    user.rocks.splice(i, 1);
                }
            }
            user.save(function(err, user){
                res.render('home.ejs', {user: user});
            });
        });
    });

    // app.post('/increment', cors(), function(req, res){
    //     Rock.findOne({rockName: req.body.rockName, userName: req.body.userName}, function(err, rock){
    //         rock.rockNum++;
    //         console.log(rock.rockNum);
    //         rock.save();
    //     });

    //     User.findOne({userName: req.body.userName}, function(err, user){
    //         //res.render('rocks.ejs', {})  
    //         console.log(user.rocks);
    //     })
    // });
}
