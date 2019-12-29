// Load in npm module (EXPRESS)
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Load built-in Node JS module (PATH)

// Load HBS

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Camille Chabaro"
    });
});

// About Page

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Camille Chabaro"
    });
});

// Help Page

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Camille Chabaro",
        helptext: "Help Page"
    });
});

// Weather Forecast Page

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Error you need to have an address"
        });
    } else {
        geocode(req.query.address, (error, dataLocation) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(dataLocation.latitude, dataLocation.longitude, (error, dataForecast) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                return res.send({
                    forecast: dataForecast,
                    currentTemperature: dataForecast.currentTemp,
                    currentPrecipitation: dataForecast.currentPrecip,
                    location: dataLocation,
                    address: req.query.address
                });
            });
        });
    }

});
// Product Page

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    res.send({
        products: []
    });
});

// Error Handling (/help/*)
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Camille Chabaro",
        errorMessage: "Help Article Not Found"
    });
});
// Error Handling (/*)
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Camille Chabaro",
        errorMessage: "Page Not Found"
    });
});

// Setup environment PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}...`);
});