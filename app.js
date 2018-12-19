var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    app = express(),
    port = 5000;

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});

//schema setuo

var campgroundSchema = new mongoose.Schema({
    name:String,
    imgSrc:String,
    description:String
})

var Campground = mongoose.model("Campground",campgroundSchema);

/*
Campground.create({
        name:'forest',
        imgSrc:'https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f0c37ca6e5b4_340.jpg',
        description: 'This is a beautiful forest. No restrooms, no showers, no nothing, no campfires. But forest really like BEAUTIFUL'
    },
    ((err,campground) => {
        if(err) {
            console.log('uuups, error',err)
        } else {
            console.log('all good, got new campground',campground)
        }
    })
)
*/



/*
    {name:'rv campground',imgSrc:'https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg'},
    {name:'forest', imgSrc:'https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f0c37ca6e5b4_340.jpg'},
    ]
    */
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

    Campground.findById(req.params.id,(err,foundCampground)=>{

        res.render('show.ejs',{campground:foundCampground})
    })
})

app.listen(port, function () {
    console.log('server up and running on port', port)

})