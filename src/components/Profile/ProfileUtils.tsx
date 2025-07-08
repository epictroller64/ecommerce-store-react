import React from 'react';
import { FaClock, FaCheck, FaTimes, FaTruck } from 'react-icons/fa';
import { Order } from '../../lib/interface/Order';

export const getStatusIcon = (status: Order['status']) => {
    switch (status) {
        case 'pending':
            return <FaClock className="w-4 h-4 text-yellow-500" />;
        case 'processing':
            return <FaCheck className="w-4 h-4 text-blue-500" />;
        case 'shipped':
            return <FaTruck className="w-4 h-4 text-purple-500" />;
        case 'delivered':
            return <FaCheck className="w-4 h-4 text-green-500" />;
        case 'cancelled':
            return <FaTimes className="w-4 h-4 text-red-500" />;
        default:
            return <FaClock className="w-4 h-4 text-gray-500" />;
    }
};

export const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'pending':
            return 'yellow';
        case 'processing':
            return 'blue';
        case 'shipped':
            return 'purple';
        case 'delivered':
            return 'green';
        case 'cancelled':
            return 'red';
        default:
            return 'gray';
    }
}; 