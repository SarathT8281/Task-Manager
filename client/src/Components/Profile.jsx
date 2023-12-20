import React, { useEffect, useRef, useState } from "react";
import "../Components/Profile.css";
import axios from "axios";

function Profile() {
  const [image, setImage] = useState("");
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/trial");
      console.log("Task status updated successfully!", data);
      setStatuses(data);
    } catch (error) {
      console.log("Error updating task status: ", error);
    }
  };

  const useremail = localStorage.getItem("useremail");
  const username = localStorage.getItem("username");
  //  console.log(useremail);

  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
    console.log(file);
  };

  return (
    <div className="head">
      <div className="profile">
        <div className="profile-details" onClick={handleImageClick}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Profile Picture"
              itemType="file"
            />
          ) : (
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
              alt="Profile Picture"
              itemType="file"
            />
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <div className="name-mail">
            <h5 style={{ fontSize: "25px" }}>{username}</h5>
            <p style={{ fontSize: "13px" }}>{useremail}</p>
          </div>
        </div>
      </div>
      {/* <div className='bio-graph'>
        <div className="bio-details">
        <h1 style={{color:'white'}}>Bio Graph</h1>
        
        <p> Name : <span style={{fontSize:'35px'}}>{username}</span> </p>
        <p> Email : <span style={{fontSize:'35px'}}>{useremail}</span>  </p>
        </div>
      
      </div> */}
      <div className="tasks">
        <div className="task-details">
          <p style={{ fontSize: "30px" }}>
            {" "}
            {statuses.reduce((ini, curr) => ini + curr.count, 0)} <br />
            <br />
            <span>Total Tasks</span>
          </p>
          {statuses.map((s) => {
            return (
              <p style={{ fontSize: "30px" }}>
                {" "}
                {s.count}
                <br />
                <br />
                <span>{s.status}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
