import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rectangular' | 'circular';
    width?: string | number;
    height?: string | number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    width,
    height
}) => {
    const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded";

    let variantClasses = "";
    switch (variant) {
        case 'circular':
            variantClasses = "rounded-full";
            break;
        case 'text':
            variantClasses = "h-4 w-full rounded";
            break;
        default:
            variantClasses = ""; // rectangular uses default rounded
    }

    const style = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses} ${className}`}
            style={style}
        />
    );
};

export default SkeletonLoader;
