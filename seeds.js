var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Sunset bay",
            image: "https://farm5.staticflickr.com/4424/37433523451_182d529034.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut consectetur tellus, et vehicula est. Suspendisse laoreet sem dui, nec aliquam tortor scelerisque et. Donec facilisis, massa et hendrerit sodales, augue neque condimentum enim, at convallis tortor erat vel enim. Curabitur massa purus, consectetur pulvinar risus a, accumsan euismod magna. Quisque malesuada commodo arcu volutpat ullamcorper. Aenean in faucibus sapien, eget vehicula orci. Integer nunc metus, maximus ac suscipit eu, eleifend et eros. Curabitur faucibus eros sed varius condimentum. Aenean sed mauris finibus, condimentum nisl cursus, ultrices justo. Etiam sed dictum est, quis dictum tellus. Donec consequat dui eget lectus gravida ornare. Morbi metus nisi, venenatis eget dolor eget, fringilla scelerisque tellus.Donec facilisis enim at dictum hendrerit. Morbi aliquam tortor ut justo mollis suscipit. Praesent fringilla ornare mauris sit amet dapibus. Nunc sed ipsum eu risus aliquet lacinia. Donec hendrerit quis arcu in egestas. Curabitur euismod urna vitae neque molestie varius. Nunc pellentesque eleifend lorem, in feugiat dolor rhoncus sed. Nunc magna metus, dignissim in velit ut, laoreet lacinia nibh.Proin pretium nibh tincidunt, efficitur elit non, porttitor leo. Pellentesque pharetra ante quis erat interdum cursus. Etiam pharetra vitae metus ut pulvinar. Proin nec nulla convallis, faucibus leo eget, scelerisque augue. Aenean quis dui at elit feugiat consectetur non eget turpis. Mauris porttitor, lacus venenatis feugiat luctus, lacus tellus eleifend ipsum, varius laoreet orci dolor id lorem. Integer lacinia venenatis augue ac malesuada. Sed eget sem nec lacus iaculis aliquam in eu magna. In sed ultrices neque. Praesent mauris ex, scelerisque in tellus in, egestas mattis felis. Ut scelerisque libero tellus. Duis egestas rhoncus leo, et vestibulum purus porta ac. Pellentesque efficitur elit sit amet tellus varius imperdiet."
        },
        {
            name: "Clouds dark river",
            image: "https://farm5.staticflickr.com/4139/4946437816_0a0408ba65.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut consectetur tellus, et vehicula est. Suspendisse laoreet sem dui, nec aliquam tortor scelerisque et. Donec facilisis, massa et hendrerit sodales, augue neque condimentum enim, at convallis tortor erat vel enim. Curabitur massa purus, consectetur pulvinar risus a, accumsan euismod magna. Quisque malesuada commodo arcu volutpat ullamcorper. Aenean in faucibus sapien, eget vehicula orci. Integer nunc metus, maximus ac suscipit eu, eleifend et eros. Curabitur faucibus eros sed varius condimentum. Aenean sed mauris finibus, condimentum nisl cursus, ultrices justo. Etiam sed dictum est, quis dictum tellus. Donec consequat dui eget lectus gravida ornare. Morbi metus nisi, venenatis eget dolor eget, fringilla scelerisque tellus."
        },
        {
            name: "Lush green forest",
            image: "https://farm5.staticflickr.com/4423/37232133702_342e447ccb.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut consectetur tellus, et vehicula est. Suspendisse laoreet sem dui, nec aliquam tortor scelerisque et. Donec facilisis, massa et hendrerit sodales, augue neque condimentum enim, at convallis tortor erat vel enim. Curabitur massa purus, consectetur pulvinar risus a, accumsan euismod magna. Quisque malesuada commodo arcu volutpat ullamcorper. Aenean in faucibus sapien, eget vehicula orci. Integer nunc metus, maximus ac suscipit eu, eleifend et eros. Curabitur faucibus eros sed varius condimentum. Aenean sed mauris finibus, condimentum nisl cursus, ultrices justo. Etiam sed dictum est, quis dictum tellus. Donec consequat dui eget lectus gravida ornare. Morbi metus nisi, venenatis eget dolor eget, fringilla scelerisque tellus."
        }
    ];

var seedDB = function() {
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }
    });
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
    });
    //function(err){
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("All campgrounds removed");
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 console.log("campground created");
        //                 Comment.create(
        //                     {
        //                         text: "This place is very beautiful. I wanna stay here",
        //                         author: "Random Guy"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             console.log("comment created");
        //                             campground.comments.push(comment._id);
        //                             campground.save();
        //                         }
        //                     }
        //                 )
        //             }
        //         });
        //     });
        // }
    //}
    //);
};

module.exports = seedDB;