import express from "express";
import { deletePets, deleteUser, pets, users } from "../Controllers/AdminController.js";
import { protect,admin } from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.get('/allUsers', protect, admin, users);

router.get('/allPets', protect, admin, pets);

router.delete('/deletePets/:id',protect, admin,deletePets);
router.delete('/deleteUser/:id', protect, admin, deleteUser);



export default router; 