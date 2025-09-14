import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const UserCard = ({ user }) => {
  const { deleteUser } = useUsers();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">
            <Link to={`/users/${user.id}`} className="text-decoration-none text-dark">
              {user.name}
            </Link>
          </h3>
          <div>
            <Link to={`/edit/${user.id}`} className="btn btn-sm btn-outline-primary me-2">
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="mb-2">
            <span className="fw-semibold">Email:</span>
            <span className="ms-2">{user.email}</span>
          </div>
          <div className="mb-2">
            <span className="fw-semibold">Phone:</span>
            <span className="ms-2">{user.phone}</span>
          </div>
          <div className="mb-2">
            <span className="fw-semibold">Company:</span>
            <span className="ms-2">{user.company}</span>
          </div>
          <div>
            <span className="fw-semibold">Address:</span>
            <span className="ms-2">
              {user.address.street}, {user.address.city} {user.address.zipcode}
            </span>
          </div>
        </div>

        <div className="card-footer bg-white d-flex justify-content-end">
          <Link to={`/users/${user.id}`} className="btn btn-link text-decoration-none">
            View Details &rarr;
          </Link>
        </div>
      </div>

      {showDeleteDialog && (
        // Bootstrap modal structure for confirmation
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDeleteDialog(false)}
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {user.name}? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
