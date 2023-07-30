import { useContext, useState } from "react";
import { ContentContext } from "../contextapi/ContextProvide";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { BsList, BsGrid } from "react-icons/bs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function Main() {
  const { todoContents, setTodoContents, filter,search ,setDrawer,setAddTodoDialog} = useContext(ContentContext);
  const [sortType, setSortType] = useState("date");
  const [view, setView] = useState("list");

  const handleDelete = (id) => {
    const newTodoContents = todoContents.filter((todo) => todo.id !== id);
    setTodoContents(newTodoContents);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  const handleFavourite = (id) => {
    const newTodoContents = todoContents.map((todo) => {
      if (todo.id === id) {
        console.log("flip fav");
        return { ...todo, favourite: !todo.favourite };
      }
      return todo;
    });
    setTodoContents(newTodoContents);
  };

  const handleCompleted = (id) => {
    const newTodoContents = todoContents.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoContents(newTodoContents);
  };
  return (
    <div className="main-container" onClick={()=>setDrawer(false)}>
      <div className="main-container-heading">
        <div className="main-container-heading-title">
          <h3>
            {todoContents?.length > 0 ? "List of tasks" : "No todos available"}
          </h3>
        </div>
      </div>
      <div className="main-container-sort">
        <div className="main-container-sort-view">
          <BsList
            onClick={() => {
              setView("list");
              console.log("list");
            }}
          />
          <BsGrid
            onClick={() => {
              setView("grid");
              console.log("grid");
            }}
          />
        </div>

        <div className="main-container-sort-type">
          <FormControl
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                color: "#EDF5E1"
              }
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                color: "var(--font-dark)"
              }}
            >
              Sort by
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => handleSort(event)}
              sx={{
                color: "var(--font-dark)",
                "& .MuiInputBase-root": {
                  color: "var(--font-dark)",
                  borderColor: "var(--font-dark)"
                },
                "& .MuiInput-underline:before": {
                  borderColor: "var(--font-dark)"
                },
                "& .MuiInput-underline:after": {
                  borderColor: "var(--font-dark)"
                },
                "& .MuiInput-underline:hover": {
                  borderColor: "var(--font-dark)"
                }
              }}
            >
              <MenuItem value="date">Recent</MenuItem>
              <MenuItem value="completed">Uncompleted</MenuItem>
              <MenuItem value="title">Alphabetically</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={`main-container-${view}`}>
        {todoContents.length>0?(todoContents
          ?.filter((task) => {
            console.log(todoContents);
            if(search)
            {
              return task.title.toLowerCase().includes(search.toLowerCase())
            }
            else if (filter === "all") {
              return task;
            } else if (filter === "completed") {
              return task.completed;
            } else if (filter === "incomplete") {
              return !task.completed;
            } else if (filter === "important") {
              return task.important;
            } else if (filter === "favourites") {
              return task.favourite;
            }
          })
          ?.sort((a, b) => {
            const aValue =
              typeof a[sortType] === "string"
                ? a[sortType]
                : String(a[sortType]);
            const bValue =
              typeof b[sortType] === "string"
                ? b[sortType]
                : String(b[sortType]);
            return aValue.localeCompare(bValue);
          })
          .map((todoContent, index) => {
            return (
              <div className={`main-container-${view}-content`} key={index}>
                <div className={`main-container-${view}-content-heading`}>
                  <div
                    className={`main-container-${view}-content-heading-title`}
                  >
                    <h3>{todoContent.title}</h3>
                    <span>{index + 1}</span>
                  </div>

                  <div
                    className={`main-container-${view}-content-heading-description`}
                  >
                    {todoContent.description.length > 100
                      ? todoContent.description.slice(0, 100) + "..."
                      : todoContent.description}
                  </div>
                </div>

                <div className={`main-container-${view}-content-options`}>
                  <div
                    className={`main-container-${view}-content-options-date`}
                  >
                    {todoContent.date}
                  </div>
                  <div
                    className={`main-container-${view}-content-options-utils`}
                  >
                    <div
                      className={`main-container-${view}-content-options-utils-completed`}
                      onClick={() => handleCompleted(todoContent.id)}
                      style={{
                        color: todoContent.completed
                          ? "rgb(103, 237, 25)"
                          : "red"
                      }}
                    >
                      {todoContent.completed ? "Completed" : "Uncompleted"}
                    </div>
                    <div
                      className={`main-container-${view}-content-options-utils-icons`}
                    >
                      <div
                        className={`main-container-${view}-content-icons-utils-favourite`}
                      >
                        {todoContent.favourite === false ? (
                          <AiOutlineStar
                            onClick={() => handleFavourite(todoContent.id)}
                          />
                        ) : (
                          <AiTwotoneStar
                            style={{ fill: "red" }}
                            onClick={() => handleFavourite(todoContent.id)}
                          />
                        )}
                      </div>
                      <div onClick={() => handleDelete(todoContent.id)}>
                        <FiTrash2 />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })):
          null}
      </div>
    </div>
  );
}