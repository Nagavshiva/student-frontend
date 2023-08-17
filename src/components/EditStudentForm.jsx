import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, fetchStudentById } from "../reducers/studentSlice";
import { Button, TextField, Grid, Box, Snackbar, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditStudentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedStudent = useSelector((state) => state.students.selectedStudent);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false); 

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setAge(selectedStudent.age);
      setGrade(selectedStudent.grade);
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ id, updatedStudent: { name, age, grade } }));
    setIsAlertOpen(true); // Open the alert after successful update
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false); // Close the alert
    navigate("/list");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px", height: "200px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Update Student
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Snackbar for displaying the alert message */}
      <Snackbar open={isAlertOpen} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Student Updated Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditStudentForm;
