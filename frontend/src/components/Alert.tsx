import React from 'react';

export const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
  };

  return (
    <div className={`border-l-4 p-4 ${alertStyles[type]} rounded-md`} role="alert">
      <div className="flex justify-between items-center">
        <p className="text-sm">{message}</p>
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-900">&times;</button>
      </div>
    </div>
  );
};