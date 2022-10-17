import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


function App() {
  let formValues = {
    id: "",
    name: "",
    age: "",
    email: "",
    gender: "",
    courses: "",
    error: {
      name: "",
      age: "",
      email: "",
      gender: "",
      courses: "",
    },
  };
  const [formData, setFormData] = useState(formValues);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://632afbeb713d41bc8e7cea33.mockapi.io/users"
      );
      setUserData(response.data);
    }
    getData();
  }, []);

 
  const onPopulateData = (id) => {
    const selectedData = userData.filter((row) => row.id === id)[0];
    setFormData({
      ...formData,
      ...selectedData,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errKeys = Object.keys(formData).filter((key) => {
       {
        return key;
      }
    });
    if (errKeys.length >= 1) {
     
    } else {
      if (formData.id) {
        
        const response = await axios.put(
          `https://632afbeb713d41bc8e7cea33.mockapi.io/${formData.id}`,
          {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            gender: formData.gender,
            courses: formData.courses,
          }
        );
        let users = [...userData];
        let index = users.findIndex((row) => row.id === response.data.id);
        users[index] = response.data;
        setUserData(users);
      } else {
        
        const response = await axios.post(
          "https://632afbeb713d41bc8e7cea33.mockapi.io/users",
          {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            gender: formData.gender,
            courses: formData.courses,
          }
        );
        setUserData([...userData, response.data]);
      }
      setFormData(formValues);
    }
  };
  return (
    <div >
      <h3>  </h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Courses</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.courses}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => onPopulateData(row.id)}>
                    Edit
                  </Button>
                  <br />
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;