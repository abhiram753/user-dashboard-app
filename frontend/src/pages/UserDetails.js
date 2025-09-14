import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { useUsers } from '../context/UserContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteUser } = useUsers();

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

  const handleDelete = async () => {
    try {
      await deleteUser(parseInt(id));
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <LoadingSpinner message="Loading user details..." />;

  if (error) return <ErrorMessage message={error} />;

  if (!user) return null;

  return (
    <div className="container my-4">
      <h2>{user.name}</h2>
      <div className="mb-3">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-3">
        <strong>Phone:</strong> {user.phone}
      </div>
      <div className="mb-3">
        <strong>Company:</strong> {user.company}
      </div>
      <div className="mb-3">
        <strong>Address:</strong> {user.address.street}, {user.address.city} {user.address.zipcode}
      </div>

      <div className="mb-3">
        {user.updated_at && (
          <>
            <strong>Created:</strong> {new Date(user.created_at).toLocaleString()}
            <br />
            <strong>Updated:</strong> {new Date(user.updated_at).toLocaleString()}
          </>
        )}
      </div>

      <Link to={`/edit/${user.id}`} className="btn btn-primary me-2">
        Edit
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <Link to="/" className="btn btn-link ms-2">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default UserDetails;
