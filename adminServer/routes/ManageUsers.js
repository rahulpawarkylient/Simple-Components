import express from 'express';
import { registerUser, toggleUserRole, toggleUserStatus, userAllget, userDeleteById, userGetById, userUpdatebyId } from '../controllers/ManageUsers.js';

const router = express.Router();

router.post('/register', registerUser);// Admin Manage User
router.get('/userAllget', userAllget); // Admin get Users
router.get('/user/:id', userGetById); // Admin get User by ID
router.put('/:userId/toggle-status', toggleUserStatus);//Admin Manage Status Of User
router.put('/:userId/toggle-role', toggleUserRole);// Admin Manage Role Of User
router.put("/userUpdate/:id", userUpdatebyId); // Admin get User by ID
router.delete("/userDelete/:id", userDeleteById); // Admin Delete User by ID

export default router;