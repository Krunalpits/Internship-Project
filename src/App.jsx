// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAndSort from './Components/SearchAndSort';
import UserList from './components/UserList';
import { Circles } from 'react-loader-spinner';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('name'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetching the  users using axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log("API Response:", response);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtering and sort users on the bases of search query and sort options
  const getFilteredAndSortedUsers = () => {
    let filtered = [...users];

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const valueA = a[sortKey].toLowerCase();
      const valueB = b[sortKey].toLowerCase();

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredUsers = getFilteredAndSortedUsers();

  // Toggle detailed view for viewimg a user
  const handleUserClick = (userId) => {
    setSelectedUserId(prevId => (prevId === userId ? null : userId));
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Circles
          height="50"
          width="50"
          color="#007BFF"
          ariaLabel="circles-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>User List</h1>
      <SearchAndSort 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <UserList 
        users={filteredUsers}
        selectedUserId={selectedUserId}
        onUserClick={handleUserClick}
      />
    </div>
  );
};

export default App;
