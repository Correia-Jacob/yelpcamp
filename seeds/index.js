const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect("mongodb://localhost:27017/yelpcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error:"));
db.once("open", () => {
    console.log("connected to db");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: Math.floor(Math.random() * 20) + 10,
            author: "",
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/yelpCamp/geanefeava4gsa00h6njbt.png",
                    filename: "yelpCamp/cesnceiafn"
                },
                {
                    url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/yelpCamp/geanefeava4gsa00h6njbt.png",
                    filename: "yelpCamp/cesnceiafn"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})