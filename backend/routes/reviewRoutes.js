const verifyToken = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {
  createReview,

  getPendingReviews,

  approveReview,

  getApprovedReviews,

   getFeaturedReviews,

  deleteReview,

  featureReview,
  
} = require("../controllers/reviewController");

/* Submit Review */
/*=========================================
PUBLIC ROUTES
=========================================*/

router.post("/", createReview);

router.get("/", getApprovedReviews);

router.get("/featured", getFeaturedReviews);

/*=========================================
PROTECTED ADMIN ROUTES
=========================================*/

router.get("/pending", verifyToken, getPendingReviews);

router.patch("/:id/approve", verifyToken, approveReview);

router.patch("/:id/feature", verifyToken, featureReview);

router.delete("/:id", verifyToken, deleteReview);

module.exports = router;
