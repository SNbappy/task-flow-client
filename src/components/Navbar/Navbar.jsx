import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, signInWithGoogle, logout } = useAuth();

    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="container flex items-center justify-between mx-auto">
                {/* App Name / Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    TaskFlow 🚀
                </Link>

                {/* User Info & Authentication */}
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
                            className="px-6 py-3 font-semibold text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={signInWithGoogle}
                        className="px-6 py-3 font-semibold text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600"
                    >
                        Sign In with Google
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
