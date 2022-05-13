import React, {useState} from 'react';
import {pink} from "@mui/material/colors";
import {Box, Button, Checkbox, Grid, TextField, Typography} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface IList {
  value: string;
}

const App= () => {
  const [list, setList] = useState<IList[]>([]);
  const [text, setText] = useState<string>("");
  const addButtonClick = () => {
    if (text === "") {
      return alert("no Text");
    }
    setText("");
    setList((pevList) => [...pevList, { value: text }]);
  };

  const ListGrid: React.FC<{ value: string; index: number }> = (props) => {
    const { value, index } = props;
    const [importantValue, setImportantValue] = useState<boolean>(false);
    const [doneValue, setDoneValue] = useState<boolean>(false);

    const delButtonClick = () => {
      setList((pevList) => pevList.filter((_, eIndex) => eIndex !== index));
    };

    return (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Typography
                sx={{
                  color: importantValue ? "coral" : "white",
                  textDecoration: doneValue ? "line-through" : "none",
                }}
                variant="h3"
            >
              {value}
            </Typography>
            <Button
                sx={{ ml: 2, padding: "13px 23px" }}
                variant="outlined"
                onClick={delButtonClick}
            >
              Del
            </Button>
            <Checkbox
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
                checked={importantValue}
                onChange={(e) => {
                  setImportantValue(e.target.checked);
                }}
            />
            <Checkbox
                checked={doneValue}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                onChange={(e) => {
                  setDoneValue(e.target.checked);
                }}
            />
          </Box>
        </Box>
    );
  };
  const listElements = list.map((element, index) => {
    const { value } = element;
    return <ListGrid value={value} index={index} />;
  });
  return (
      <Grid container>

        <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <Box>
              <Typography
                  sx={{ mt: 10, mb: 6 }}
                  variant="h2"
                  component="div"
                  color="coral"
              >
                ToDoList
              </Typography>
              <TextField
                  value={text}
                  id="outlined-basic"
                  label="Write To Do"
                  variant="outlined"
                  onChange={(e) => setText(e.target.value)}
              />
              <Button
                  variant="contained"
                  sx={{ ml: 1, height: "50px" }}
                  onClick={addButtonClick}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ mt: 8 }}>{listElements}</Box>
          </Box>
        </Grid>
      </Grid>
  );
}

export default App;
