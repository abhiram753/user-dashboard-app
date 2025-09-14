import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import UserForm from '../components/forms/UserForm';

const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser, loading } = useUsers();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
      };
      await createUser(formattedData);
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2>Create New User</h2>
      <UserForm
        onSubmit={onSubmit}
        loading={loading}
        submitText="Create User"
      />
      <Link to="/" className="btn btn-link mt-3">
        &larr; Back to Dashboard
      </Link>
    </div>
  );
};

export default CreateUser;
