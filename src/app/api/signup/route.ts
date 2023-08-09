import {connect} from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs';
import User from '@/model/userModel';
import {NextResponse} from "next/server";
import {UserData} from "@/app/signup/page";

connect();

export async function POST(req: Request) {
    try {
        const requestBody: UserData = await req.json();
        const validate = {
            name: [new RegExp(/^[a-z0-9]+$/), "Username can only contain lowercase letters and numbers."],
            password: [new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/), "Password must contain at least one digit, one special character, and be 6-16 characters long."],
            email: [new RegExp(/^[a-z0-9]+$/), "Please enter a valid email address."],
        };
        for (const [field, data] of Object.entries(requestBody)) {
            if (!validate[field][0].test(data.value)) {
                requestBody[field].error = validate[field][1];
                requestBody.hasError = true;
            }
        }
        if (requestBody.hasError !== undefined && requestBody.hasError) {
            return NextResponse.json(requestBody, {status: 400});
        }
        const {name: {value: username}, email: {value: email}, password: {value: raw_password}} = requestBody;
        if (await User.findOne({username: username})) {
            requestBody.name.error = "Username Already Exists.";
            requestBody.hasError = true;
            return NextResponse.json(requestBody, {status: 400});
        }
        const salt = await bcryptjs.genSalt(10);
        const password = await bcryptjs.hash(raw_password, salt);
        const user = await new User({
            username: username,
            password: password,
            email: email,
        });
        user.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user,
        });

    } catch(error: any) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }

}