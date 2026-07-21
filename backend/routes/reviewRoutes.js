const express = require("express");

const router = express.Router();

const {

    createReview,

    getPendingReviews,

    approveReview,

     getApprovedReviews,

} = require("../controllers/reviewController");

/* Submit Review */

router.post("/", createReview);

/* Get Pending Reviews */

router.get("/pending", getPendingReviews);

// Approve Review

router.patch("/:id/approve", approveReview);

router.get("/", getApprovedReviews);


module.exports = router;