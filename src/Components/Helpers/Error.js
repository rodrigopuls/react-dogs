import React from 'react';

const Error = ({ message }) => {
  if (!message) return null;
  return <p className="error">{message}</p>;
};

export default Error;
