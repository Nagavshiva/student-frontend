import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://student-backend-fyme.onrender.com/api/students'; // Update with your backend URL

// Async action to fetch students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching students');
  }
});

// Async action to fetch a student by ID
export const fetchStudentById = createAsyncThunk('students/fetchStudentById', async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching student by ID');
  }
});


// Async action to add a student
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  try {
    const response = await axios.post(apiUrl, student);
    return response.data;
  } catch (error) {
    throw new Error('Error adding student');
  }
});

// Async action to delete a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  } catch (error) {
    throw new Error('Error deleting student');
  }
});

// Async action to update a student
export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, updatedStudent }) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedStudent);
      return response.data;
    } catch (error) {
      throw new Error('Error updating student');
    }
  });


  const studentSlice = createSlice({
    name: 'students',
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStudents.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchStudents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addStudent.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addStudent.fulfilled, (state, action) => {
          state.loading = false;
          state.data.push(action.payload);
        })
        .addCase(addStudent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteStudent.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteStudent.fulfilled, (state, action) => {
          state.loading = false;
          state.data = state.data.filter(student => student._id !== action.payload);
        })
        .addCase(deleteStudent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateStudent.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateStudent.fulfilled, (state, action) => {
          state.loading = false;
          const updatedIndex = state.data.findIndex(student => student._id === action.payload._id);
          if (updatedIndex !== -1) {
            state.data[updatedIndex] = action.payload;
          }
        })
        .addCase(updateStudent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchStudentById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStudentById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedStudent = action.payload;
          console.log( action.payload)
        })
        .addCase(fetchStudentById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  


export default studentSlice.reducer;
