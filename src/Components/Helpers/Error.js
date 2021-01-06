import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;
  return <p className="alert alert-danger">{error}</p>;
};

export default Error;
