// src/components/UserList.jsx
import React from 'react';
import UserItem from './UserItem';
import './UserList.css'; // Optional: create if you want specific styles

const UserList = ({ users, selectedUserId, onUserClick }) => {
  return (
    <ul className="user-list">
      {users.map(user => (
        <UserItem 
          key={user.id} 
          user={user}
          isSelected={selectedUserId === user.id}
          onUserClick={onUserClick}
        />
      ))}
    </ul>
  );
};

export default UserList;
