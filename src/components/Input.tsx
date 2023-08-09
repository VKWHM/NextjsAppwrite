import React, {ChangeEvent, JSX} from "react";

export default function Input({name, field, callback}: {name: string, field: {value: string, error: string}, callback: (event: ChangeEvent<HTMLInputElement>) => void}): JSX.Element {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor={name} className="font-semibold capitalize">{name}</label>
                <input
                    type={name}
                    id={name}
                    name={name}
                    value={field.value}
                    onChange={callback}
                    className={`w-full px-5 py-2 border rounded focus:outline-none ${field.error ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
            {field.error && <p className="text-red-500">{field.error}</p>}
        </>
    );
}
