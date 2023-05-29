const FlatController=require("../controller/Flat.js");
const axios = require('axios');

exports.add_flat = (req, res) =>{
    const email = req.query.email;
    console.log(email);
    console.log("The email is"+email);
    res.render('Flat_form',{email});
}

// exports.update_flat= (req, res) =>{
//     axios.get('http://localhost:3000/api/flats', { params : { id : req.query.id }})
//         .then(function(userdata){
//             res.render("Update_flat", { flats : userdata.data})
//         })
//         .catch(err =>{
//             res.send(err);
//         })
// }