import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { useUsers } from '../context/UserContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import UserForm from '../components/forms/UserForm';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser, loading: updating } = useUsers();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUserById(id);
        setUser(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (userData) => {
    try {
      await updateUser(parseInt(id), userData);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) return <LoadingSpinner message="Loading user..." />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container my-4">
      <h2>Edit User</h2>
      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        loading={updating}
        submitText="Update User"
      />
      <Link to="/" className="btn btn-link mt-3">
        &larr; Back to Dashboard
      </Link>
    </div>
  );
};

export default EditUser;
