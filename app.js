var express = require('express');
var app = express();
var port = 3000;

app.set('view engine','ejs')
app.use(express.static('public'))

var campgrounds = [
    {name:'river', imgSrc:'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f5c17ba2ecbdb9_340.jpg'},
    {name:'mountainside', imgSrc:'https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f5c17ba2ecbdb9_340.jpg'},
    {name:'forest', imgSrc:'https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144590f0c37ca6e5b4_340.jpg'},
    {name:'rv campground',imgSrc:'https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg'}
    ]

app.get('/', (req, res) => {
    res.render('landing')
})

app.get('/campgrounds',(req,res) => {
    res.render('campgrounds',{campgrounds:campgrounds})
})

app.listen(port, function () {
    console.log('server up and running on port', port)

})