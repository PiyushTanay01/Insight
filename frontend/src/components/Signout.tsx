import { useNavigate } from 'react-router-dom';

const Signout = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page or home page
        navigate('/signin');
    };

    return (
        <button onClick={handleSignout} className="ml-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Sign Out
        </button>
    );
};

export default Signout;
