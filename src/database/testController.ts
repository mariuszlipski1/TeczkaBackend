import { Router } from "express";
import { TestService } from "./testService.js";

export const testRouter = Router();
const service = new TestService();

testRouter.get("/", async (req, res) => {
    try {
        const result = await service.getAll();
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

