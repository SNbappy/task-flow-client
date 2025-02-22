import {
    createBrowserRouter,
} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Main from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";
import TaskBoard from "../pages/TaskBoard/TaskBoard";
// import TaskBoard from "../components/TaskBoard/TaskBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFoundPage />,  // 404 Page
        children: [
            { path: "/", element: <Home /> },
            { path: "/tasks", element: <TaskBoard /> },
            // { path: "/tasks/:taskId", element: <TaskDetails /> },
        ],
    },
    {
        path: "/dashboard",
        // element: <PrivateRoute><Dashboard /></PrivateRoute>, // Protect Dashboard with Private Route
        errorElement: <NotFoundPage />,  // 404 Page for dashboard
        children: [
            // { path: "/dashboard/profile", element: <UserProfile /> },
            // { path: "/dashboard/manage-users", element: <ManageUsers /> },
        ],
    },
    { path: "*", element: <NotFoundPage /> },  // Catch-all route
]);
