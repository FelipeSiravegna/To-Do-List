const pool = require("../db");

const getAllTasks = async (req, res) => {
  res.send("Retrieving a list of tasks");
};

const getTask = async (req, res) => {
  res.send("Retrieving a task");
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.json(result.rows[0]);
  } catch(error) {
    console.log(error.message)
    res.json({error: error.message})
  }
};

const deleteTask = async (req, res) => {
  res.send("Deleting a task");
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
