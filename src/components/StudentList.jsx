import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../reducers/studentSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Assuming you use React Router for navigation

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data);
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (id) => {
    // Redirect to the student's edit page (you need to define the route)
    history(`/edit/${id}`);
  };

  return (
    <Box sx={{display:'flex',justifyContent:'center',height:'100vh',marginTop:'6rem',}}>
      <List sx={{ width: "300px",backgroundColor:'blanchedalmond',height:'80px'}}>
        {students.map((student) => (
          <div key={student._id}>
            <ListItem>
              <ListItemText
                primary={student.name}
                secondary={`Age: ${student.age}, Grade: ${student.grade}`}
              />
              <ListItemSecondaryAction sx={{display:'flex',gap:'1rem'}}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(student._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(student._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default StudentList;
