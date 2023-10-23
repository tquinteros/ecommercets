"use client"
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn, logOut, toggleAdmin } from "@/redux/features/auth"


const LoginTemplate = () => {
    const router = useRouter();
    const [headerHeight, setHeaderHeight] = useState(0);
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useAppSelector((state: any) => state.authReducer.value.isAuthenticated);

    const users = [
        {
            username: "admin",
            password: "admin",
            isAdmin: true,
        },
        {
            username: "user",
            password: "user",
            isAdmin: false,
        },
    ]

    useEffect(() => {

        const header = document.querySelector('header');
        if (header) {
            const height = header.getBoundingClientRect().height;
            setHeaderHeight(height);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/store');
            toast.error("You are already logged in", {
                position: "bottom-center"
            })
        }
    }, [router])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const foundUser = users.find(user => user.username === username && user.password === password)
        if (foundUser) {
            dispatch(logIn({ username, isAdmin: foundUser.isAdmin }));
            router.push('/store');
        }
        if (!foundUser) {
            toast.error("Invalid username or password", {
                position: "bottom-center"
            })
            return;
        }
    }

    return (
        <div
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
            className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-8 items-center border-2 border-black px-24 py-16 rounded-lg">
                <h3>User: admin | Password: admin</h3>
                <h3>User: user | Password: user</h3>
                <div className="flex flex-col gap-4">

                    <label className="flex gap-4 flex-col">
                        <span>Username:</span>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 rounded-md border border-black px-3" type="text" required />
                    </label>
                    <label className="flex gap-4 flex-col">
                        <span>Password:</span>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 rounded-md border border-black px-3" required type="text" />
                    </label>
                    <Button type="submit">Log In</Button>
                </div>
            </form>

        </div>
    )
}

export default LoginTemplate;