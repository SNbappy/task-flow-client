import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="container flex items-center justify-between mx-auto">
                {/* App Name / Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    TaskFlow 🚀
                </Link>

                {/* User Info & Logout */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <img
                            src={user.photoURL}
                            alt="User Avatar"
                            className="w-10 h-10 border rounded-full"
                        />
                        <span className="font-medium text-gray-700">{user.displayName}</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/"
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
