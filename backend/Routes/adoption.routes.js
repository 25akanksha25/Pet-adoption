import express from "express";
import {
  submitAdoptionRequest,
  getAdoptionRequests,
} from "../Controllers/adoption.controller.js";
const router = express.Router();

// Submit an adoption request
router.post("/adopt", submitAdoptionRequest);

// Get all adoption requests (for admin)
router.get("/requests", getAdoptionRequests);


export default router;
