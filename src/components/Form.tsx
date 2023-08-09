import React, {JSX, ReactPropTypes} from 'react';

export default function Form({children, ...props}: {children: JSX.Element}) {
    return (
        <form {...props}>
            {children}
            <button
                className="px-6 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                type={`submit`}
            >
                Submit
            </button>
        </form>
    );
}