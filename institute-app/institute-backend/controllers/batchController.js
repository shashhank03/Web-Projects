const db = require('../db');

exports.createBatch = async (req, res) => {
    const { course_id, name, start_date, end_date, status } = req.body;
    if (!course_id || !name || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const sql = `INSERT INTO batch (course_id, name, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)`;
    try {
        const [result] = await db.query(sql, [course_id, name, start_date, end_date, status || 'active']);
        res.status(201).json({ message: 'Batch created', batchId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.completeBatch = async (req, res) => {
    const batchId = req.params.id;
    const updateBatchSql = `UPDATE batch SET status = 'completed' WHERE id = ?`;
    const updateEnrollmentsSql = `UPDATE enrollment SET status = 'completed' WHERE batch_id = ?`;
    try {
        await db.query(updateBatchSql, [batchId]);
        await db.query(updateEnrollmentsSql, [batchId]);
        res.json({ message: 'Batch and enrollments marked completed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBatches = async (req, res) => {
    try {
        const [results] = await db.query(`SELECT b.*, COUNT(e.id) as student_count 
            FROM batch b LEFT JOIN enrollment e ON b.id = e.batch_id GROUP BY b.id`);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBatch = async (req, res) => {
    const batchId = req.params.id;

    try {
        await db.query('DELETE FROM enrollment WHERE batch_id = ?', [batchId]);
        const [result] = await db.query('DELETE FROM batch WHERE id = ?', [batchId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        res.json({ message: 'Batch deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editBatch = async (req, res) => {
    const batchId = req.params.id;
    const { course_id, name, start_date, end_date, status } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE batch SET course_id = ?, name = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?`,
            [course_id, name, start_date, end_date, status, batchId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        res.json({ message: 'Batch updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
