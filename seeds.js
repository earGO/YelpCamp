var mongoose = require("mongoose"),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment');

var data = [
    {
        name: 'Forest',
        imgSrc: 'https://c1.staticflickr.com/7/6183/6140263784_5ebce292d2_b.jpg',
        description: 'Bacon ipsum dolor amet doner hamburger meatloaf ball tip, kevin burgdoggen venison tenderloin filet mignon sausage fatback salami. Frankfurter venison filet mignon ham swine jerky pork belly turducken chicken. Ham burgdoggen tri-tip kielbasa rump, pig ribeye shank. T-bone biltong cow fatback picanha flank ham hock jerky. Meatball cow cupim flank pork loin, turducken ham hock salami tenderloin turkey picanha shankle hamburger sausage frankfurter. Pancetta pork bacon tri-tip doner short loin cupim ball tip alcatra jerky chicken tail.'
    },
    {
        name: 'River',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/en/c/c5/View_of_Savage_River.jpg',
        description: 'Pork loin ball tip picanha shankle andouille brisket hamburger jowl leberkas beef ribs. Buffalo cow sirloin shankle kielbasa short loin pork chop ham pork belly jowl tongue pig pork loin. Corned beef t-bone ball tip cupim short loin turducken beef ribs frankfurter rump. Cupim pork belly picanha, spare ribs frankfurter leberkas tri-tip. Tail meatball ham turkey chuck, venison pork loin capicola. Corned beef hamburger andouille shank chicken.'
    },
    {
        name: 'Mountains',
        imgSrc: 'https://cdn12.picryl.com/photo/2016/12/31/mountains-garda-monte-brione-021a41-1024.jpg',
        description: 'Kevin filet mignon drumstick pig swine cupim tenderloin. Kevin beef fatback, jerky salami strip steak pig tongue. Leberkas strip steak pastrami, beef filet mignon sirloin swine t-bone beef ribs salami ham hock burgdoggen. Jowl landjaeger andouille, ham beef shank pork chop tail tri-tip meatloaf spare ribs. Brisket beef ribs buffalo sausage turkey kielbasa pork belly hamburger ham hock ham sirloin corned beef. Tri-tip turkey frankfurter pastrami flank.'
    },
    {
        name: 'Glassier',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/The_Glassier_Bayal_Camp.jpg',
        description: 'Spicy jalapeno bacon ipsum dolor amet ham pork loin porchetta filet mignon. Jerky sirloin pork loin shankle kielbasa frankfurter meatball pork kevin prosciutto fatback tri-tip chicken ground round strip steak. Bacon corned beef picanha, salami shank pork loin porchetta chuck shoulder sausage meatball beef kielbasa turducken buffalo. Corned beef buffalo cow, porchetta t-bone pig biltong alcatra meatball pork chop beef ribs tongue pork loin. Picanha spare ribs swine salami hamburger corned beef porchetta biltong ball tip pork loin capicola burgdoggen turkey ground round. Jowl chuck landjaeger shankle short loin sirloin.'
    },
    {
        name: 'Lake',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lake_mapourika_NZ.jpeg/1024px-Lake_mapourika_NZ.jpeg',
        description: 'Fatback pork ham, sirloin frankfurter swine tenderloin boudin short loin. Corned beef brisket tongue sirloin, pork chop venison frankfurter pancetta fatback. Meatball boudin t-bone kielbasa meatloaf strip steak andouille frankfurter doner tenderloin drumstick pig picanha pastrami. Brisket drumstick ribeye, salami corned beef filet mignon spare ribs burgdoggen beef pancetta pastrami. Sausage corned beef tri-tip, shoulder brisket ribeye tail cow doner capicola porchetta buffalo. Rump pork belly hamburger shank turducken, doner tail pastrami salami chicken fatback.'

    },
    {
        name:'rv campground',
        imgSrc:'https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg',
        description: 'Beef ribs shankle tail drumstick meatloaf prosciutto. Sausage shankle turducken, bacon chicken cow shoulder meatball kevin alcatra. Pastrami andouille pork ham hock drumstick buffalo bresaola rump. Tenderloin turkey burgdoggen beef hamburger, porchetta andouille flank leberkas. Short loin porchetta bresaola, ball tip corned beef pig ribeye chuck alcatra pancetta shank. Shank tenderloin boudin alcatra capicola hamburger drumstick frankfurter.'
    }
]

var seedDB = function() {
    //remove all existing campgrounds
    Campground.deleteMany({},(err) => {
        if(err){
            console.log('error removing all posts from Campgrounds collection \n', err)
        } else {
            console.log('successfully removed all posts from Campgrounds collection')
            data.forEach(seed => {
                Campground.create(seed,(err,campground) => {
                    if (err) {
                        console.log('error creating campground \n',err)
                    } else {
                        console.log('created new campground!')
                        Comment.create(
                            {
                                text:'The bears R great, but we have to wait for the one calls himself Javelin',
                                author: 'Homer Simson'
                            }
                        ,(err,comment)=>{
                            if(err){
                                console.log('error creating comment')
                            } else {
                                campground.comments.push(comment)
                                campground.save();
                                console.log('created comment')
                            }
                        })
                    }
                })
            })
        }
    })
    //create ome sample campgrounds

}

module.exports = seedDB;
