import React from 'react';

const UserResults = (props) => {
  return (
    <div>
      <h2>Users</h2>
      {props.users.length > 0 ? (
        props.users.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.email}</p>
              <p>{user.display_name}</p>
            </div>
          );
        })
      ) : (
        <p>No matching users</p>
      )}
    </div>
  );
};

export default UserResults;
