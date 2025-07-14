import React from 'react';
import { MdError, MdInfo, MdWarning, MdCheckCircle } from 'react-icons/md';

interface ErrorProps {
    message: string;
    type?: 'error' | 'info' | 'warning' | 'success';
    className?: string;
}

export default function ErrorDisplay({ message, type = 'error', className = '' }: ErrorProps) {
    const getTypeStyles = () => {
        switch (type) {
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            default:
                return 'bg-red-50 border-red-200 text-red-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'error':
                return <MdError className="w-5 h-5" />;
            case 'info':
                return <MdInfo className="w-5 h-5" />;
            case 'warning':
                return <MdWarning className="w-5 h-5" />;
            case 'success':
                return <MdCheckCircle className="w-5 h-5" />;
            default:
                return <MdError className="w-5 h-5" />;
        }
    };

    return (
        <div className={`flex items-center p-4 border rounded-lg ${getTypeStyles()} ${className}`}>
            <div className="flex-shrink-0 mr-3">
                {getIcon()}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
}
