const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // SQLite constraint errors
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({
      message: 'Email already exists',
      error: 'DUPLICATE_EMAIL'
    });
  }

  // SQLite general errors
  if (err.code && err.code.startsWith('SQLITE_')) {
    return res.status(500).json({
      message: 'Database error',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }

  // Custom application errors
  if (err.message === 'User not found') {
    return res.status(404).json({ message: 'User not found' });
  }

  // Default error response
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

module.exports = errorHandler;
