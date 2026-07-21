const express = require("express");

const router = express.Router();

const {

    createReview,

    getPendingReviews,

    approveReview,

     getApprovedReviews,

      deleteReview,

} = require("../controllers/reviewController");

/* Submit Review */

router.post("/", createReview);

/* Get Pending Reviews */

router.get("/pending", getPendingReviews);

// Approve Review

router.patch("/:id/approve", approveReview);

router.get("/", getApprovedReviews);

router.delete("/:id", deleteReview);


module.exports = router;