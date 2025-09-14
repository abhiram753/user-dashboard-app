import React from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import SearchBar from '../components/common/SearchBar';
import UserCard from '../components/common/UserCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Dashboard = () => {
  const { loading, error, getFilteredUsers, setSearchTerm, searchTerm } = useUsers();

  const filteredUsers = getFilteredUsers();

  if (loading) return <LoadingSpinner message="Loading users..." />;

  if (error)
    return <ErrorMessage message={error} />;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>User Dashboard</h1>
        <Link to="/users/new" className="btn btn-primary">
          Create First User
        </Link>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {filteredUsers.length === 0 ? (
        <p className="mt-3">
          {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first user.'}
        </p>
      ) : (
        <div className="row gy-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="col-md-4">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
