'use client'
import React, {ChangeEvent, FormEvent, useState, JSX, useReducer} from 'react';
import Input from '@/components/Input';
import Form from '@/components/Form';
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type UserData = {
    name: {
        error: string,
        value: string,
    },
    email: {
        error: string,
        value: string,
    },
    password: {
        error: string,
        value: string,
    },
    hasError?: boolean,
}
type HandleUserAction = {
    field: "name" | "email" | "password",
    value: string,
    error?: string,
}
const initialUserData: UserData =  {
    name: {
        value: "",
        error: "",
    },
    email: {
        value: "",
        error: "",
    },
    password: {
        value: "",
        error: "",
    },
    hasError: false,
}
function user_reducer(state: UserData, {field, value, error}: HandleUserAction) {
    const newState: UserData = {...state};
    if (field === undefined) return newState;
    newState[field].value = value;
    if (error !== undefined) {
        newState[field].error = error;
    }
    newState.hasError = false;
    for (const member of Object.values(newState)) {
        if (typeof member !== "boolean" && member.error.length !== 0) {
            newState.hasError = true;
        }
    }
    return newState;
}
export default function Login() {
    const [user, dispatch]: [UserData, React.Dispatch<HandleUserAction>] = useReducer(user_reducer, initialUserData);

    const [loading, setLoading]: [boolean, React.Dispatch<boolean>] = useState(false);
    const [message, setMessage]: [{msg: string, type: "error" | "success"}, React.Dispatch<{msg: string, color: "red" | "green"}>] = useState({msg: "", type: ""});

    const submit_handler = (event: SubmitEvent) => {
        event.preventDefault();
        if (!user.hasError) {
            const {data, status} = axios.post<UserData>("/api/signup", user);
            switch (status) {
                case 200:
                    setMessage({msg: data.message, color: "green"});
                    break;
                case 400:
                    dispatch(data);
                    setMessage({msg: data.error, color: "red"});
                default:
                    setMessage({msg: data.error, color: "red"});
            }
        }
    }

    const validate_password = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
            dispatch({
                field: "password",
                value: value,
                error: "Password must contain at least one digit, one special character, and be 6-16 characters long.",
            });
        } else {
            dispatch({
                field: "password",
                value: value,
                error: "",
            });
        }
    };

    const validate_username = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        if (!/^[a-z0-9]+$/.test(value)) {
            dispatch({
                field: "name",
                value: value,
                error: "Username can only contain lowercase letters and numbers.",
            });
        } else {
            dispatch({
                field: "name",
                value: value,
                error: "",
            });
        }
    };

    const validate_email = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/[a-z0-9.]+@[a-z0-9.]+\.[a-z]{1,6}/gm.test(value)) {
            dispatch({
                field: "email",
                value: value,
                error: "Please enter a valid email address.",
            });
        } else {
            dispatch({
                field: "email",
                value: value,
                error: "",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-6">
            <h1 className="text-3xl font-bold">Signup</h1>
            <hr className="w-1/2 border-t-2 border-gray-400" />
            {message.msg && (
                <p className={`border border-2 rounded px-4 py-2 text-black w-1/3 text-center bg-${message.color}-600 border-${message.color}-900`}>
                    {message.msg}
                </p>
            )}
            <Form action="" className={`flex flex-col items-center justify-center gap-2`} onSubmit={submit_handler}>
                <Input name={`username`} field={user.name} callback={validate_username} />
                <Input name={`email`} field={user.email} callback={validate_email} />
                <Input name={`password`} field={user.password} callback={validate_password} />
            </Form>
        </div>
    );
}


