'use client'
import React, { ChangeEvent, useState } from 'react';
export default function Login() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const validate_password = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
            setErrors({ ...errors, password: "Password must contain at least one digit, one special character, and be 6-16 characters long." });
        } else {
            setErrors({ ...errors, password: "" });
        }
        setUser({ ...user, password: value });
    };

    const validate_username = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        if (!/^[a-z0-9]+$/.test(value)) {
            setErrors({ ...errors, name: "Username can only contain lowercase letters and numbers." });
        } else {
            setErrors({ ...errors, name: "" });
        }
        setUser({ ...user, name: value });
    };

    const validate_email = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/[a-z0-9\.]+@[a-z0-9\.]+\.[a-z]{1,6}/gm.test(value)) {
            setErrors({ ...errors, email: "Please enter a valid email address." });
        } else {
            setErrors({ ...errors, email: "" });
        }
        setUser({ ...user, email: value });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
            <h1 className="text-3xl font-bold">Signup</h1>
            <hr className="w-1/2 border-t-2 border-gray-400" />
            <div className="flex flex-col gap-1">
                <label htmlFor="username" className="font-semibold">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.name}
                    onChange={validate_username}
                    className={`w-full px-4 py-2 border rounded focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={validate_email}
                    className={`w-full px-4 py-2 border rounded focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-semibold">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={validate_password}
                    className={`w-full px-4 py-2 border rounded focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            <button
                className="px-6 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
                Submit
            </button>
        </div>
    );
}
