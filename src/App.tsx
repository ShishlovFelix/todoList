import React, { useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface IList {
  value: string;
  importantValue: boolean;
  doneValue: boolean;
  deadLine: string;
}

const App = () => {
  const [list, setList] = useState<IList[]>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [text, setText] = useState<string>("");

  const addButtonClick = () => {
    if (text === "") {
      return alert("no Text");
    }
    setText("");
    setList((pevList) => [
      ...pevList,
      { value: text, importantValue: false, doneValue: false, deadLine: "" },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const ListGrid: React.FC<{
    value: string;
    index: number;
    listImportantValue: boolean;
    listDoneValue: boolean;
    listDeadLine: string;
  }> = (props) => {
    const { value, index, listDoneValue, listImportantValue, listDeadLine } =
      props;

    const delButtonClick = () => {
      setList((pevList) => pevList.filter((_, eIndex) => eIndex !== index));
    };
    const setImportant = () => {
      const currentToDo = list[index];
      currentToDo.importantValue = !listImportantValue;
      const copyCurrentList = [...list];
      copyCurrentList[index] = currentToDo;
      setList(copyCurrentList);
    };

    const setDone = () => {
      const currentToDo = list[index];
      currentToDo.doneValue = !listDoneValue;
      const copyCurrentList = [...list];
      copyCurrentList[index] = currentToDo;
      setList(copyCurrentList);
    };

    const setDeadLine = (value: string | null) => {
      const currentToDo = list[index];
      if (value) {
        currentToDo.deadLine = value;
        const copyCurrentList = [...list];
        copyCurrentList[index] = currentToDo;
        setList(copyCurrentList);
      }
    };

    const timeSlots = Array.from(new Array(24 * 2)).map(
      (_, index) =>
        `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
          index % 2 === 0 ? "00" : "30"
        }`
    );

    return (
      <Grid
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          xs={4}
          sx={{
            ml: 11,
            position: "relative",
            top: 12,
          }}
        >
          <Typography
            sx={{
              color: "coral",
              display: "flex",
              justifyContent: "center",
            }}
            variant="h4"
          >
            {index + 1}
          </Typography>
        </Grid>
        <Grid
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            mr: 1,
            ml: 2,
          }}
        >
          <Typography
            sx={{
              color: listImportantValue ? "coral" : "white",
              textDecoration: listDoneValue ? "line-through" : "none",
              wordBreak: "break-all",
            }}
            variant="h3"
          >
            {value}
          </Typography>
        </Grid>
        <Grid xs={5} sx={{ position: "relative", mt: 1, bottom: 5 }}>
          <Button
            sx={{ padding: "13px 23px" }}
            variant="outlined"
            onClick={delButtonClick}
          >
            Del
          </Button>
          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={listImportantValue}
            onClick={setImportant}
          />
          <Checkbox
            checked={listDoneValue}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            onClick={setDone}
          />
          <Autocomplete
            id="disabled-options-demo"
            options={timeSlots}
            value={listDeadLine}
            getOptionDisabled={(option) =>
              option === timeSlots[0] || option === timeSlots[2]
            }
            sx={{ width: 150, mt: 1 }}
            onChange={(e, value) => {
              setDeadLine(value);
            }}
            renderInput={(params) => <TextField {...params} label="Deadline" />}
          />
        </Grid>
      </Grid>
    );
  };

  const listElements = list.map((element, index) => {
    const { value, importantValue, doneValue, deadLine } = element;

    return (
      <>
        <ListGrid
          value={value}
          listDoneValue={doneValue}
          listImportantValue={importantValue}
          listDeadLine={deadLine}
          index={index}
        />
        <hr style={{ width: "65%", maxWidth: "100%" }} />
      </>
    );
  });
  return (
    <Container maxWidth="xl">
      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          <Typography
            sx={{ mt: 10, mb: 6 }}
            variant="h2"
            component="div"
            color="coral"
          >
            ToDoList
          </Typography>
          <TextField
            sx={{ width: "570px" }}
            value={text}
            id="outlined-basic"
            label="Write To Do"
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ ml: 1, height: "50px", mt: "3px" }}
            onClick={addButtonClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 3 }}>
        {listElements}
      </Grid>
    </Container>
  );
};

export default App;
