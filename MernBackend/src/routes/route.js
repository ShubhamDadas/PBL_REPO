const express = require('express');
const router = express.Router()

const services = require('../Services/HostelRender.js');
const controller = require('../controller/Hostel.js');

const FlatModel=require("../models/flat_register.js")
const multer=require("multer");
const bodyParser=require("body-parser");
const storage = multer.diskStorage({
    destination:"public/images",

    filename:  (req, file, cb)=> {
    // Generate a unique filename or use the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/add_hostel', services.add_hostel)

router.post('/add_hostel',upload.array('images'),controller.create);
router.get('/hostel_index', controller.find);

router.get('/hostel_update/:id', controller.edit);
router.post('/hostel_update/:id', controller.update);
router.get('/hostel_delete/:id', controller.delete);
router.get('/hostel_details/:id',controller.details);

module.exports = router