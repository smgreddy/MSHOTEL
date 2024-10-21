import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid'; // Import Grid component
import './msstyles.css';

export const users = [
  { id: 1, name: 'MANO' },
  { id: 2, name: 'VEER' },
  { id: 3, name: 'VARA' },
  { id: 4, name: 'PRAB' },
  { id: 5, name: 'VENU' },
  { id: 6, name: 'HUZA' },
  { id: 7, name: 'ANKU' },
  { id: 8, name: 'RAGH' },
  { id: 9, name: 'LASY' },
  { id: 10, name: 'KEER' },
  { id: 11, name: 'LAKS' },
  { id: 12, name: 'RANJ' },
  { id: 13, name: 'ANAN' },
  { id: 14, name: 'SACH' },
  { id: 15, name: 'VIVE' },
  { id: 16, name: 'SUDH' },
  { id: 17, name: 'KINJ' },
];

export const UserList = ({ selectedUsers, setSelectedUsers }) => {
  const handleUserChange = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.includes(userId)
        ? prevUsers.filter((u) => u !== userId)
        : [...prevUsers, userId]
    );
  };

  return (
    <div className="list-box user-list-box ">
      <Grid container direction="column">
        {' '}
        {/* Set the direction to column */}
        <h3>User List</h3>
        {users.map((user) => (
          <Grid item key={user.id}>
            {' '}
            {/* Each item in a new row */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserChange(user.id)}
                  name={user.name}
                />
              }
              label={user.name}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export const UserName = ({ userId }) => {
  const user = users.find((u) => u.id === userId);
  const userName = user ? user.name : 'User not found';

  return (
    <div>
      <p>{userName}</p>
    </div>
  );
};
