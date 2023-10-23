"use client"
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const AdminTemplate = () => {

    const isAdmin = useAppSelector((state) => state.authReducer.value.isAdmin);
    const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);
    const router = useRouter();
    useEffect(() => {
        if (!isAdmin || !isAuthenticated) {
            router.push('/store');
        }
        toast.error('You are not authorized to view this page!', {
            position: "bottom-center",
        })
    }, [router]);

    return (
        <div>
            asd
        </div>
    )
}

export default AdminTemplate;