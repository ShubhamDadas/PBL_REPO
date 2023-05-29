

const express = require('express');
const route = express.Router()
const FlatModel=require("../models/flat_register.js")
const multer=require("multer");
const bodyParser=require("body-parser");

const services = require('../Services/FlatRender.js');
const controller = require('../controller/Flat.js');

const storage = multer.diskStorage({
    destination:"public/images",

    filename:  (req, file, cb)=> {
    // Generate a unique filename or use the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


/**
 *  @description Root Route
 *  @method GET /
 */
// route.get('/flat_index', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add_flat', services.add_flat)

/**
 *  @description for update user
 *  @method GET /update-user
 */

route.post('/add_flat',upload.array('images'), controller.create);
route.get('/flat_index', controller.find);

// route.get('/api/flats/:id', services.update_flat);

route.get('/flat_update/:id', controller.edit);
route.post('/flat_update/:id', controller.update);
route.get('/flat_delete/:id', controller.delete);
route.get('/flat_details/:id',controller.details);

module.exports = route