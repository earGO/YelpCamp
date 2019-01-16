var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    app = express(),
    port = 5000,

    Campground = require('./models/campgrounds'),
    seedDB = require('./seeds');

seedDB();

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});

/*
Campground.findByIdAndUpdate('5c1a85b6b3e16325b0fe4513', { $set: { imgSrc: 'https://campadk.com/campsiteguide/letchworth/20110518/IMG_4744.jpg' }},
    function (err, campground) {
    if (err) {
        console.log('uups, got an error editing entry',err)
    } else {
        console.log(campground)
    }
});
*/

app.get('/', (req, res) => {
    res.render('landing')
})

app.get('/campgrounds',(req,res) => {
    Campground.find({},(err,allCampgrounds)=> {
        if(err){
            console.log('ooops!')
            console.log(err)
        } else {
            res.render('index',{campgrounds:allCampgrounds})
        }
    })
})

app.get('/campgrounds/new',(req,res) => {
    res.render('new')
})

app.post('/campgrounds',(req,res) => {
    var newCampground = {name: req.body.name, imgSrc:req.body.imgSrc, description:req.body.description}
    //get data from form and push it to database
    Campground.create(newCampground,(err,newCampground)=>{
        if(err){
            console.log('got error adding new campground',err)
        } else {
            console.log('added new campground',newCampground)
        }
    })
    //redirect back to campgrounds page
    res.redirect('/campgrounds')
})

//SHOW route - to show single campground
app.get("/campgrounds/:id",(req,res) => {
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log('error displaying post\n',err)
        } else {
            res.render('show.ejs',{campground:foundCampground})
        }
    })
})


app.listen(port, function () {
    console.log('server up and running on port', port)

})