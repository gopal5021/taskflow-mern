import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");

  // ✅ CHANGE ONLY THIS BASE URL
  const BASE_URL = "https://taskflow-mern-hkhg.onrender.com";

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "Completed"
  );

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title) {
      toast.error("Please enter task title");
      return;
    }

    const today = new Date().toDateString();

    const todayTasks = tasks.filter(
      (task) => new Date(task.createdAt).toDateString() === today
    );

    if (todayTasks.length >= 5) {
      toast.error("You can only add 5 tasks per day");
      return;
    }

    if (overdueTasks.length >= 4) {
      toast.error(
        `⚠ You have ${overdueTasks.length} overdue tasks. Complete at least one to unlock the Add button.`
      );
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/tasks`,
        { title, dueDate },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setDueDate("");

      toast.success("Task added 🚀");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}/api/tasks/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id, status) => {
    if (status !== "Completed") {
      if (!window.confirm("Task not completed. Delete anyway?")) return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white px-3 py-1 rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {overdueTasks.length >= 4 && (
        <div className="bg-red-500 text-white p-3 mb-4 rounded text-center font-medium">
          ⚠ You have {overdueTasks.length} overdue tasks. Complete at least one to unlock the Add button.
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded text-black"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded text-black"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          onClick={addTask}
          disabled={overdueTasks.length >= 4}
          className={`px-4 rounded text-white ${
            overdueTasks.length >= 4
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded text-black"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded text-black"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        [...tasks]
          .reverse()
          .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((task) =>
            filter === "All" ? true : task.status === filter
          )
          .map((task) => {
            const isOverdue =
              task.dueDate &&
              new Date(task.dueDate) < new Date() &&
              task.status !== "Completed";

            return (
              <motion.div
                key={task._id}
                className={`p-4 mb-3 rounded shadow ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } ${isOverdue ? "border-l-4 border-red-500" : ""}`}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex gap-2 items-center">
                      <p>{task.title}</p>

                      <span className={`px-2 text-xs rounded ${
                        task.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}>
                        {task.status}
                      </span>
                    </div>

                    {task.dueDate && (
                      <p className={`text-sm ${
                        isOverdue ? "text-red-500" : "text-gray-500"
                      }`}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => completeTask(task._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => deleteTask(task._id, task.status)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
      )}
    </div>
  );
}

export default Dashboard;