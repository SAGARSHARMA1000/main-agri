const express = require('express');
const router = express.Router();
//const { authMiddleware } = require('../middleware/auth');
const { createListing, getAllListings, getListing,deleteListing,updateListing,
    getFarmerListings
 } = require('../controllers/listingController');
router.get("/", getAllListings);
router.get("/farmer", getFarmerListings);
//router.get('/', getListings);
router.get('/:id', getListing);
//router.post('/', authMiddleware, createListing);
router.post('/',  createListing);
router.delete('/:id',deleteListing);
router.put('/:id',updateListing);


module.exports = router;
