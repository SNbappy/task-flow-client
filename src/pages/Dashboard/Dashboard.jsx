import Navbar from "../../components/Navbar/Navbar";
import TaskBoard from "../../components/TaskBoard/TaskBoard";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <TaskBoard />
        </div>
    );
};

export default Dashboard;