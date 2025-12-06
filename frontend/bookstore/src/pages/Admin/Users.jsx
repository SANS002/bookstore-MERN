// import React, { useEffect, useState } from 'react';
// import API from '../../api/axiosInstance';

// export default function AdminUsers(){
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     API.get('/admin/users').then(res => setUsers(res.data)).catch(console.error);
//   }, []);

//   const del = async (id) => {
//     if (!window.confirm('Delete user?')) return;
//     await API.delete(`/admin/user/${id}`);
//     setUsers(users.filter(u => u._id !== id));
//   };

//   return (
//     <div style={{ padding: 16 }}>
//       <h3>Users</h3>
//       {users.map(u => (
//         <div key={u._id} style={{ borderBottom: '1px solid #ddd', padding:8 }}>
//           <div>{u.name} - {u.email}</div>
//           <button onClick={()=>del(u._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Container, Table, Button } from 'react-bootstrap';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  const del = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await API.delete(`/admin/user/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Users</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => del(u._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
