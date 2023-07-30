import { useContext, useState } from "react";
import {
  Dialog,
  Typography,
  TextField,

  RadioGroup,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,

} from "@mui/material";
import { ContentContext } from "../contextapi/ContextProvide";
import styled from "@emotion/styled";

export default function CustomDialog() {
  const { addTodoDialog, setAddTodoDialog, todoContents, setTodoContents } =
    useContext(ContentContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [id, setId] = useState(1);

  const handleDialogClose = () => {
    setAddTodoDialog(false);
  };

  const dialogStyle = {
    width: "90%",
    height: "auto",
    bottom: "5rem",

    margin: "10rem 0 0 0",
    borderRadius: ".5rem",
    padding: "1rem",
    backgroundColor: "#aaaaaa",
    color: "#222",
    border: "1px solid rgba(255, 0, 0, 0.869)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly", 
   
    "@media (min-width: 768px)": {

      width: "25%",
    },
  };

  const StyledBox = styled("Box")`
    display: flex;
    flex-direction: column;
  `;

  const handleAddTodo = () => {
    setId((prevId) => prevId + 1);
    const newTodo = {
      id,
      title,
      date,
      description,
      category,
      important,
      completed,
      favourite: false
    };
    if (!title || !date || !description) {
      return alert("Fill all the inputs");
    }
    setTodoContents([...todoContents, newTodo]);
  };

  return (
    <Dialog
      open={addTodoDialog}
      PaperProps={{ sx: dialogStyle }}
      maxWidth={"md"}
      onClose={handleDialogClose}
      
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ marginTop: 2, marginBottom: 4 }}
      >
        Add a Task
      </Typography>
      <TextField
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <StyledBox>
        <RadioGroup
          row
          name="taskStatus"
          value={important ? "important" : "normal"}
          onChange={(e) => setImportant(e.target.value === "important")}
          sx={{ marginBottom: 2 }}
        >
          <FormControlLabel
            value="important"
            control={<Radio />}
            label="Mark as Important"
          />
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
        </RadioGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Mark as Completed"
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#222629f2",
            color: "#EDF5E1",
            padding: "10px 20px"
          }}
          onClick={handleAddTodo}
        >
          Add Task
        </Button>
      </StyledBox>
    </Dialog>
  );
}