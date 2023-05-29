const axios = require('axios');


exports.add_hostel = (req, res) =>{
    const email = req.query.email;
    res.render('Hostel_form',{email});
}

