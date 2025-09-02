import { Request, Response } from 'express';
import db from '../db';

export const createBatch = async (req: Request, res: Response): Promise<void> => {
    const { course_id, name, start_date, end_date, status } = req.body;
    if (!course_id || !name || !start_date || !end_date) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    const sql = `INSERT INTO batch (course_id, name, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)`;
    try {
        const [result] = await db.query(sql, [course_id, name, start_date, end_date, status || 'active']);
        res.status(201).json({ message: 'Batch created', batchId: (result as any).insertId });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const completeBatch = async (req: Request, res: Response): Promise<void> => {
    const batchId = req.params.id;
    const updateBatchSql = `UPDATE batch SET status = 'completed' WHERE id = ?`;
    const updateEnrollmentsSql = `UPDATE enrollment SET status = 'completed' WHERE batch_id = ?`;
    try {
        await db.query(updateBatchSql, [batchId]);
        await db.query(updateEnrollmentsSql, [batchId]);
        res.json({ message: 'Batch and enrollments marked completed' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getBatches = async (req: Request, res: Response): Promise<void> => {
    try {
        const [results] = await db.query(`SELECT b.*, COUNT(e.id) as student_count 
            FROM batch b LEFT JOIN enrollment e ON b.id = e.batch_id GROUP BY b.id`);
        res.json(results);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteBatch = async (req: Request, res: Response): Promise<void> => {
    const batchId = req.params.id;
    try {
        await db.query('DELETE FROM enrollment WHERE batch_id = ?', [batchId]);
        const [result] = await db.query('DELETE FROM batch WHERE id = ?', [batchId]);
        if ((result as any).affectedRows === 0) {
            res.status(404).json({ error: 'Batch not found' });
            return;
        }
        res.json({ message: 'Batch deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const editBatch = async (req: Request, res: Response): Promise<void> => {
    const batchId = req.params.id;
    const { course_id, name, start_date, end_date, status } = req.body;
    try {
        const [result] = await db.query(
            `UPDATE batch SET course_id = ?, name = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?`,
            [course_id, name, start_date, end_date, status, batchId]
        );
        if ((result as any).affectedRows === 0) {
            res.status(404).json({ error: 'Batch not found' });
            return;
        }
        res.json({ message: 'Batch updated successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
