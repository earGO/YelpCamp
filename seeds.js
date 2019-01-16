var mongoose = require("mongoose"),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment');

var data = [
    {
        name: 'Forest',
        imgSrc: 'https://c1.staticflickr.com/7/6183/6140263784_5ebce292d2_b.jpg',
        description: 'Simple forest campground with bears and squirrels and wolverines and mosquitos'
    },
    {
        name: 'River',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/en/c/c5/View_of_Savage_River.jpg',
        description: 'River campgrounds with fish and stones and bears that break bones'
    },
    {
        name: 'Mountains',
        imgSrc: 'https://cdn12.picryl.com/photo/2016/12/31/mountains-garda-monte-brione-021a41-1024.jpg',
        description: 'There are only wolves and eagles high in sky, who will watch you run as bears pass by'
    },
    {
        name: 'Glassier',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/The_Glassier_Bayal_Camp.jpg',
        description: 'The glassier campgrounds where there is no life but hungry bears'
    },
    {
        name: 'Lake',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Lake_mapourika_NZ.jpeg/1024px-Lake_mapourika_NZ.jpeg',
        description: 'The lake is wet and full of fish, and all your camp is bears dish'
    },
    {
        name:'rv campground',
        imgSrc:'https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg',
        description: 'RVs are good for food and shares, but they dont save you from the bears'
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
