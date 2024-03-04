const express = require('express');
const router = express.Router();
const offerController = require('../controller/offerController');
const { verifyToken , checkRole } = require('../middleware/authMiddleware');




// Registration endpoint
router.get('/', function (req, res) {
    res.send('Welcome to the offer Routes');
});

router.get('/getOffer', checkRole(['Super Admin','Content Admin','User']), offerController.getOffers);

router.get('/searchOffer', checkRole(['Super Admin','Content Admin','User']), offerController.getFilteredOffers);

router.post('/postOffer', checkRole(['Super Admin','Content Admin']) , offerController.createOffer);

router.put('/updateOffer', checkRole(['Super Admin','Content Admin']) , offerController.updateOffer);

router.delete('/deleteOffer', checkRole(['Super Admin','Content Admin']) , offerController.deleteOffer);


module.exports = router;