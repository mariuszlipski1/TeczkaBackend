import { Router } from 'express';
import projectRoutes from './projectRoutes.js';
import estimateRoutes from './estimateRoutes.js';
import noteRoutes from './noteRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/estimates', estimateRoutes);
router.use('/notes', noteRoutes);
router.use('/ai', aiRoutes);

export default router;
