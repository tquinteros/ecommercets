"use client"
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateProduct from "../CreateProduct/CreateProduct";
import EditProduct from "../EditProduct/EditProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";

const AdminTemplate = () => {

    const isAdmin = useAppSelector((state) => state.authReducer.value.isAdmin);
    const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<string>("add");

    const handleSelectTab = (tab: string) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        if (!isAdmin || !isAuthenticated) {
            router.push('/store');
            toast.error('You are not authorized to view this page!', {
                position: "bottom-center",
            })
        }
    }, [router]);

    return (
        <div className="my-16">
            <div className="flex p-4 lg:p-0 gap-8 flex-col">
                <div className="flex flex-col items-center gap-2">
                    <h3 className="font-bold text-4xl">Admin Panel</h3>
                    <div className="bg-black w-24 h-0.5"></div>
                </div>
                <div>
                    <p>
                        In this panel you can <b>create, edit and delete products,</b> these changes are <b>saved in the redux store</b> and can be <b>seen on the front until it is refreshed.</b>
                    </p>
                    <br />
                    <p>
                        Also the <b>fakeapi endpoints are also used</b> to perform the actions (these actions are not reflected in the front since they are from the api for testing you can check &apos;Network&apos;)
                    </p>
                </div>
                <div className="flex md:flex-row flex-col mt-8 justify-center gap-6 md:gap-12">
                    <h4
                        onClick={() => handleSelectTab("add")}
                        className={`${selectedTab === "add" ? "bg-black text-white" : "hover:opacity-75"} cursor-pointer border border-black rounded-md px-4 py-2 duration-300`}>Create Product</h4>
                    <h4
                        onClick={() => handleSelectTab("edit")}
                        className={`${selectedTab === "edit" ? "bg-black text-white" : "hover:opacity-75"} cursor-pointer border border-black rounded-md px-4 py-2 duration-300`}>Edit Product</h4>
                    <h4
                        onClick={() => handleSelectTab("delete")}
                        className={`${selectedTab === "delete" ? "bg-black text-white" : "hover:opacity-75"} cursor-pointer border border-black rounded-md px-4 py-2 duration-300`}>Delete Product</h4>
                </div>
                {
                    selectedTab === "add" && (
                        <CreateProduct />
                    )
                }
                {
                    selectedTab === "edit" && (
                        <EditProduct />
                    )
                }
                {
                    selectedTab === "delete" && (
                        <DeleteProduct />
                    )
                }
            </div>
        </div>

    )
}
export default AdminTemplate;