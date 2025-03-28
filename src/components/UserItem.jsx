
import React from 'react';
import './UserItem.css'; 

const UserItem = ({ user, isSelected, onUserClick }) => {
  return (
    //using list to disp[lay users 
    <li className="user-item">
      <span className="user-name" onClick={() => onUserClick(user.id)}>
        {user.name}
      </span>
      <span className="user-email">{user.email}</span>
      {isSelected && (
        <div className="user-details">
          <p>
            <strong>Address:</strong> {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
          </p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
        </div>
      )}
    </li>
  );
};

export default UserItem;
