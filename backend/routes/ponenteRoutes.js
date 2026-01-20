import express from 'express';
import {
    recogerDatos
} from '../controllers/ponenteController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

router.post('/crear', upload.single('imagen'), recogerDatos);

export default router;