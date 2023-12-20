import React, { useEffect, useRef, useState } from "react";
import "../Components/Task.css";
import { Button } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import moment from "moment";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { MdRefresh } from "react-icons/md";

function Tasks() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [status, setStatus] = useState("Pending");
  const inputRef = useRef();

  useEffect(() => {
    fetchData();
    
    
  }, []); 
  useEffect(() => {
    inputRef.current.focus();
  }, )
  

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get");
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const Submit = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    if (input !== "") {
      if (editedTask) {
        try {
          await axios.put(`http://localhost:5000/update/${editedTask._id}`, {
            task: input,
          });
          console.log("Task updated successfully!");
          fetchData();
          setEditedTask(null); 
          setInput('')
        } catch (error) {
          console.error("Error updating task:", error);
        }
      } else {
        // Add new task
        try {
          const response = await axios.post("http://localhost:5000/add", {
            task: input,
            date: formattedDate,
            status: status,
          });
          console.log(response);
          setData([
            ...data,
            { ...response.data, task: input, date: formattedDate, status: status },
          ]);
          setInput("");
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      }
    }
  };

  const handleUpdate = (task) => {
    setInput(task.task);
    setEditedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      console.log("Todo deleted successfully!");
      setInput('')
      fetchData();
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your file is safe!");
        }
      });
    } catch (error) {
      console.log("Error deleting book: ", error);
    }
  };
  const Navigation = useNavigate();



  const UpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/update/${id}`, {
        status: newStatus,
      });
      console.log("Task status updated successfully!");
      fetchData();
    } catch (error) {
      console.log("Error updating task status: ", error);
    }
  };

  const formatDate = (date) => {
    const dateObj = moment(date);
    return dateObj.format("DD/MM/YYYY");
  };
  const formatTime = (Time) => {
    const dateObj = moment(Time);
    return dateObj.format("hh:mm A");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mains">
      <div className="input">
        <div className="inner">
          <input
            type="text"
            placeholder="Add new..."
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={Submit}>{editedTask ? "EDIT" : "ADD"} </Button>
        </div>
      </div>
      <div className="task-lists">
        <div className="task-list">
          <div className="icos">
            {" "}
            <div className="icon">
              <AiOutlineCheckCircle />
            </div>
            <h3 style={{ marginLeft: "-30px", color: "yellow" }}>Task List</h3>
          </div>
        </div>
        <form onSubmit={Submit}>
          <div className="tasks-main">
            <div className="dt-task">
              <table className="table">
                <thead className="t-head">
                  <tr>
                    <th>SL.No</th>
                    <th>
                      Created <IoCalendarNumberOutline className="ictimes" />
                    </th>
                    <th>
                      Created <IoMdTime className="ictimes" />
                    </th>
                    <th>
                      Completed <IoCalendarNumberOutline className="ictimes" />
                    </th>
                    <th>
                      Completed <IoMdTime className="ictimes" />
                    </th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((todo, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(todo.date).toDateString()}</td>
                      <td>{formatTime(todo.createdAt)} </td>
                      <td>
                        {todo.status !== "Completed"
                          ? "---"
                          : formatDate(todo.updatedAt)}
                      </td>
                      <td>{todo.status !== "Completed"
                          ? "---"
                          : formatTime(todo.updatedAt)}</td>
                      <td>{todo.task}</td>
                      <td style={{ backgroundColor: "yellow", color: "black" }}>
                        {todo.status}
                      </td>
                      <td style={{ color: "red", fontSize: "20px" }}>
                        {todo.status === "Pending" ? (
                          <span
                            onClick={() => UpdateStatus(todo._id, "Completed")}
                          >
                            <IoMdDoneAll style={{ color: "green" }} />
                          </span>
                        ) : (
                          <span
                            onClick={() => UpdateStatus(todo._id, "Pending")}
                          >
                            <MdRefresh style={{ color: "blue" }} />
                          </span>
                        )}

                        <span>
                          <MdModeEdit
                            style={{ color: "black" }}
                            onClick={() => {
                              handleUpdate(todo);
                            }}
                          />
                        </span>
                        <span onClick={() => handleDelete(todo._id)}>
                          <MdDelete />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tasks;
