import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { generateInspectionChecklist, generateContractorQuestions } from '../services/aiService.js';

const router = Router();

// POST /api/ai/inspection-checklist - Generate inspection checklist
router.post('/inspection-checklist', authenticate, async (req, res) => {
  try {
    const { area, year, floor } = req.body;

    if (!area || !year || !floor) {
      return res.status(400).json({ error: 'Missing required fields: area, year, floor' });
    }

    const checklist = await generateInspectionChecklist({ area, year, floor });
    res.json({ checklist });
  } catch (error) {
    console.error('Error generating inspection checklist:', error);
    res.status(500).json({ error: 'Failed to generate inspection checklist' });
  }
});

// POST /api/ai/questions - Generate contractor questions
router.post('/questions', authenticate, async (req, res) => {
  try {
    const { sectionType, propertyData } = req.body;

    if (!sectionType || !propertyData) {
      return res.status(400).json({ error: 'Missing required fields: sectionType, propertyData' });
    }

    const questions = await generateContractorQuestions(sectionType, propertyData);
    res.json({ questions });
  } catch (error) {
    console.error('Error generating contractor questions:', error);
    res.status(500).json({ error: 'Failed to generate contractor questions' });
  }
});

export default router;
