import React, { useState } from 'react';
import {Appbar2} from '../components/Appbar2';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Alert } from '../components/Alert';
// import { Appbar } from '../components/Appbar';


export const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64));
    const decode = JSON.parse(jsonPayload);
    console.log(decode.id);
    const id=(decode.id).toString();
    console.log(id);

    if (!token) {
      setAlert({ message: "You are not logged in", type: "error" });
      return;
    }
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/user/${id}`,
        {
          username,
          password,
          name,
          about, 
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAlert({ message: "Profile Updated Successfully", type: "success" });
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
      setAlert({ message: "Error updating profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return ( <div className="min-h-screen bg-gradient-to-r flex flex-col">
  <Appbar2 />
  <div className="flex-grow flex items-center justify-center p-6">
    <div className="border-2 max-w-md w-full bg-white shadow-md rounded-md p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Your Profile</h1>
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
      <form className="space-y-6 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="about">About</label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
);
};

export default EditProfile;
