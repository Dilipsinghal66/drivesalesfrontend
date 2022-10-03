import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("");

  async function getUserData() {
    try {
      const response = await axios.get(
        "https://drivesalesagain.herokuapp.com/get"
      );
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function postUserData() {
    console.log("clicked");
    try {
      await axios.post("https://drivesalesagain.herokuapp.com/post", {
        title: title,
        description: description,
        startDate: startDate,
        enddate: endDate,
        priority: priority,
        status: "In Process",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("hello");
    getUserData();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const handlePriorityChange = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };
  const handleStatusChange = (e, id) => {
    console.log(e.target.checked);
    console.log(id);
    try {
      axios.put(`https://drivesalesagain.herokuapp.com/tasks/${id}`, {
        status: e.target.checked ? "Completed" : "In Process",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="parent">
      <div className="input">
        <input
          className="title"
          placeholder="Title"
          onChange={(e) => handleTitleChange(e)}
        ></input>
        <input
          className="description"
          placeholder="description"
          onChange={(e) => handleDescriptionChange(e)}
        ></input>
        <input
          type="date"
          className="start-date"
          onChange={(e) => handleStartDateChange(e)}
        ></input>
        <input
          type="date"
          className="end-date"
          onChange={(e) => handleEndDateChange(e)}
        ></input>

        <select
          name="priority"
          className="priority"
          onChange={(e) => handlePriorityChange(e)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="add-btn" onClick={postUserData}>
          ADD
        </button>
      </div>
      <div className="task-list">
        {tasks &&
          tasks.map((task) => (
            <div>
              <div className="task">{task.title}</div>
              <input
                type="checkbox"
                name="status"
                value={task.status}
                onChange={(e) => handleStatusChange(e, task._id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
