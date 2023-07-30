import { useContext, useEffect, useState } from "react";
import { ContentContext } from "../contextapi/ContextProvide";
// import { BiBookAdd } from "react-icons/bi";
import { Button } from "@mui/material";




export default function Side() {
  const { setAddTodoDialog, setFilter, filter,drawer} = useContext(ContentContext);
  const [selectedExperience, setSelectedExperience] = useState(0)
  useEffect(() => {
    const sideUnderline = document.querySelector(".sidebar-container-options-underline");
    console.log(sideUnderline)
    if (sideUnderline) {
      sideUnderline.style.top = `${selectedExperience * 4.3}rem`
      console.log("sideunder")
    }
  }, [selectedExperience])


  
  return (
    <div className={`sidebar-container ${drawer?"open":""}`}>
      <div className="sidebar-container-heading">
        <h3>Todo App</h3>
      </div>
      <div className="sidebar-container-add">
        <Button onClick={() => setAddTodoDialog(true)} style={{ color: 'white' }} >
            Add Task
        </Button>
      </div>
      <div className="sidebar-container-options">
        <div className="sidebar-container-options-underline"></div>
        <ul
          className="sidebar-container-options-list"
          
          onClick={(event) => setFilter(event.target.getAttribute("value"))}
        >
          <li className={filter === "all" ? "active" : ""} value="all"
          onClick={() => setSelectedExperience(0)}>
            All tasks
          </li>
          <li
            className={filter === "important" ? "active" : ""}
            value="important"
            onClick={() => setSelectedExperience(1)}
          >
            Important tasks
          </li>
          <li
            className={filter === "completed" ? "active" : ""}
            value="completed"
            onClick={() => setSelectedExperience(2)}
          >
            Completed tasks
          </li>
          <li
            className={filter === "incomplete" ? "active" : ""}
            value="incomplete"
            onClick={() => setSelectedExperience(3)}
          >
            Uncompleted Tasks
          </li>
          <li
            className={filter === "favourites" ? "active" : ""}
            value="favourites"
            onClick={() => setSelectedExperience(4)}
          >
            Favourites
          </li>
        </ul>
      </div>
    </div>
  );
}