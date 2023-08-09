import React from 'react';

function Alert({ message }) {
    const alertStyles = `rounded px-4 py-3 text-white w-full ${
        message.color === 'red'
            ? 'bg-red-500 border-red-700'
            : 'bg-green-500 border-green-700'
    }`;

    return (
        <div
            className={`flex items-center justify-between border-l-4 ${alertStyles}`}
        >
            <div>
                {message.icon && (
                    <span className="mr-2 text-lg">{message.icon}</span>
                )}
                {message.text}
            </div>
            <button className="text-lg font-bold">&times;</button>
        </div>
    );
}

export default Alert;
