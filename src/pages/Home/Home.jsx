// src/pages/Home.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Use useAuth instead of direct import
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
    const { user, signInWithGoogle } = useAuth();

    return (
        <div className="min-h-screen text-gray-900 bg-gray-100">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">
                    Welcome to Task Flow 🚀
                </h1>
                <p className="max-w-md text-lg text-gray-600">
                    Manage your tasks efficiently with drag-and-drop functionality. Stay
                    organized and boost productivity!
                </p>

                {user ? (
                    <Link
                        to="/tasks"
                        className="px-6 py-3 mt-6 font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                    >
                        Go to Dashboard
                    </Link>
                ) : (
                    <button
                        onClick={signInWithGoogle}
                        className="px-6 py-3 mt-6 font-semibold text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                    >
                        Sign In with Google
                    </button>
                )}
            </div>
        </div>
    );
};

export default Home;
