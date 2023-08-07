import React, {useState} from 'react';
import {connect} from "../../dbConfig/dbConfig"

export default function Login() {
    connect()
    return (
        <h1>Hello World</h1>
    )
}