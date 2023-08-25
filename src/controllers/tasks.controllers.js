const pool = require("../db");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");

    res.json(allTasks.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM task WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "Task not found",
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  res.send("Updating a task");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
