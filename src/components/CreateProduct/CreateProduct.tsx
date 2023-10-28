"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import { ProductItemProps } from "@/types/types";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { addProduct } from "@/redux/features/products";
import { useDispatch } from "react-redux";
const CreateProduct = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductItemProps>({
        title: "",
        price: 1,
        description: "",
        category: "",
        thumbnail: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product.title || !product.description || !product.category || !product.thumbnail) {
            toast.error("Please fill in all the fields", {
                position: "bottom-center"
            });
            return;
        }
        if (product.price && product.price < 1) {
            toast.error("Price cannot be less than 1", {
                position: "bottom-center"
            });
            return;
        }
        if (product.price && product.price > 5000) {
            toast.error("Price cannot be higher tan 5000", {
                position: "bottom-center"
            });
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("https://dummyjson.com/products/add", product);
            if (response.status === 200) {
                dispatch(addProduct(product));
                toast.success("Product created successfully", {
                    position: "bottom-center"
                });
            } else {
                toast.error("Something went wrong", {
                    position: "bottom-center"
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                position: "bottom-center"
            });
        }
        setLoading(false);
    };

    return (
        <>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <Input
                    value={product.title}
                    label="Title"
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Name of the product"
                />
                <Input
                    value={product.price}
                    label="Price"
                    onChange={(e) =>
                        setProduct({ ...product, price: parseInt(e.target.value) })
                    }
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Price of the product"
                />
                <Input
                    value={product.description}
                    label="Description"
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Name of the product"
                />
                <Input
                    value={product.category}
                    label="Category"
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Category"
                />
                <Input
                    value={product.thumbnail}
                    label="Thumbnail"
                    onChange={(e) => setProduct({ ...product, thumbnail: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Thumbnail"
                />
                <Button disabled={loading} className="w-full md:w-[70%] xl:w-[50%] h-10 mt-2" type="submit">Create</Button>
            </form>
        </>
    )
}

export default CreateProduct;