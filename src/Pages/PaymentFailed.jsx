import React from 'react';
import { Link } from 'react-router';

const PaymentFailed = () => {
    return (
        <div className='my-auto text-center space-y-4'>
            <h1 className='text-4xl text-center'>Payment Failed</h1>
            <Link to="/dashboard/my-orders" className='btn btn-primary'>Go My Orders</Link>
        </div>
    );
};

export default PaymentFailed;