import { useEffect, useState } from "react";
import "./Admin.css"
import Table from 'react-bootstrap/Table';
import { allUsers } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";

//--------------------------------------------------
export const Admin =() => {
    const [users, setUsers] = useState([]);

    const userReduxData = useSelector(getUserData);
    const token = userReduxData.token;
    const userType = userReduxData.decoded.userRole;
  
useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await allUsers( token ) 
                setUsers(response.data.users)
                console.log(response.data.users,"Hola?");
            
        } catch (error) {
            console.log(error)
        }
    };
    fetchUsers();
},[token])
    return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>email</th>
          <th>BTN</th>
        </tr>
      </thead>
      <tbody>

        {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
  
        })}

      </tbody>
    </Table>
  );
}
