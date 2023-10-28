"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import { ProductItemProps } from "@/types/types";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { editProduct } from "@/redux/features/products";
import { useDispatch } from "react-redux";
const EditProduct = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<ProductItemProps[]>([]);
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
        setLoading(true);
        try {
            const response = await axios.put(`https://dummyjson.com/products/${product.id}`, {
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                thumbnail: product.thumbnail,
            });
            if (response.status === 200) {
                dispatch(editProduct(product));
                toast.success("Product edited successfully", {
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

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://dummyjson.com/products?limit=100`
            );
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
        setLoading(false);
    };

    const handleSelectProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProductId = parseInt(e.target.value);
        const selectedProduct = products.find((product) => product.id === selectedProductId);
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <span>Select Product</span>
                <select placeholder="Select Product" className="w-full md:w-[70%] xl:w-[50%] border border-black px-2 py-2 rounded-md" onChange={handleSelectProduct}>
                    <option value="select">
                        Select Product
                    </option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.title}
                        </option>
                    ))}
                </select>
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
                <Button disabled={loading} className="w-full md:w-[70%] xl:w-[50%] h-10 mt-2" type="submit">Edit</Button>
            </form>
        </>
    )
}

export default EditProduct;