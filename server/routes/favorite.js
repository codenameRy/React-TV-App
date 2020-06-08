const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", auth, (req, res) => {

    //Find Favorite Information from Favorite Collection by TV Show ID

    Favorite.find({"tvShowID": req.body.tvShowID})
    .exec(( err, favorite ) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, favoriteNumber: favorite.length })
    })

});


router.post("/favoriteSelect", auth, (req, res) => {

    //Find Favorite Information from Favorite Collection by TV Show ID, userFrom 
    Favorite.find({"tvShowID": req.body.tvShowID, "userFrom": req.body.userFrom})
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)
        
    // Logic to detemine is we already select favorite TV Show 
    let result = false;
    if(favorite.length !== 0) {
        result = true
    }
    res.status(200).json({ success: true, favoriteSelect: result })

    })

});

module.exports = router;
