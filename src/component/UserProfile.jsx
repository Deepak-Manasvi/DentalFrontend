import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null); // store user data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get('/api/user/profile')
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <img
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
          src='https://favpng.com/png_view/avatar-user-profile-male-avatar-png/e6ACujVB'
          alt="User Avatar"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="text-sm">
          <span className="font-medium text-gray-700">Email:</span>{' '}
          {user.email}
        </div>
        <div className="text-sm">
          <span className="font-medium text-gray-700">Phone:</span>{' '}
          {user.phone || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
