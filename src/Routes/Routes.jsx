import {
    createBrowserRouter,
} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Main from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import TaskBoard from "../pages/TaskBoard/TaskBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFoundPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/tasks", element: <TaskBoard /> },
        ],
    },
    {
        path: "/dashboard",
        
        errorElement: <NotFoundPage />,
        children: [
        ],
    },
    { path: "*", element: <NotFoundPage /> },
]);
