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

    const generateRandomId = (): number => {
        return Math.floor(Math.random() * 999900) + 101;
    };

    const [product, setProduct] = useState<ProductItemProps>({
        title: "",
        price: 1,
        description: "",
        discountPercentage: 1,
        category: "",
        rating: 0,
        stock: 1,
        thumbnail: "",
        id: generateRandomId(),
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
        if (product.price !== undefined && product.price < 1) {
            toast.error("Price cannot be less than 1", {
                position: "bottom-center"
            });
            return;
        }
        if (product.price !== undefined && product.price > 5000) {
            toast.error("Price cannot be higher tan 5000", {
                position: "bottom-center"
            });
            return;
        }
        if (product.discountPercentage !== undefined && product.discountPercentage < 1) {
            toast.error("Discount percentage cannot be less than 1", {
                position: "bottom-center"
            });
            return;
        }
        if (product.stock !== undefined && product.stock < 1) {
            toast.error("Stock cannot be less than 1", {
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
                    value={product.price !== undefined ? product.price.toString() : ""}
                    label="Price"
                    onChange={(e) =>
                        setProduct({ ...product, price: e.target.value !== "" ? parseInt(e.target.value) : 0 })
                    }
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Price of the product"
                />
                <Input
                    value={product.discountPercentage}
                    label="Discount Percentage"
                    onChange={(e) =>
                        setProduct({ ...product, discountPercentage: e.target.value !== "" ? parseInt(e.target.value) : 0 })
                    }
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Discount of the product"
                />
                <Input
                    value={product.stock}
                    label="Initial Stock"
                    onChange={(e) =>
                        setProduct({ ...product, stock: e.target.value !== "" ? parseInt(e.target.value) : 0 })
                    }
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Initial Stock"
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