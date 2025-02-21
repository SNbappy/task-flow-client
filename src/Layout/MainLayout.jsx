import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='bg-gray-50 dark:bg-gray-800 dark:text-white'>
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;