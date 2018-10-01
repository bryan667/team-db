import React from 'react';
import AdminLayout from '../../high-order-comp/admin-layout'

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className='user_dashboard'>
                This is your dashboard.
            </div>
        </AdminLayout>
    );
};

export default Dashboard;