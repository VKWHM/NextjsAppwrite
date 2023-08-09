import React, {HTMLProps, JSX, ReactPropTypes} from 'react';

type FormProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNode,
}

export default function Form({onSubmit: callback, children}: FormProps) {
    return (
        <form action="" className={`flex flex-col items-center justify-center gap-2`} onSubmit={callback}>
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