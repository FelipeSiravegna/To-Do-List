const getAllTasks = async (req, res) => {
  res.send("Retrieving a list of tasks");
};

const getTask = async (req, res) => {
  res.send("Retrieving a task");
};

const createTask = async (req, res) => {
  res.send("Creating a task");
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
  updateTask
};
