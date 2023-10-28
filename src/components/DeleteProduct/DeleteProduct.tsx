"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Input/Input";
import { ProductItemProps } from "@/types/types";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { deleteProduct } from "@/redux/features/products";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

const DeleteProduct = () => {
    const [products, setProducts] = useState<ProductItemProps[]>([]);
    const [product, setProduct] = useState<ProductItemProps>({
        id: 0,
        title: "",
        price: 1,
        description: "",
        category: "",
        thumbnail: "",
    });
    const allProducts = useAppSelector((state) => state.productsReducer.value.products);

    const dispatch = useDispatch();
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
            const response = await axios.delete(`https://dummyjson.com/products/${product.id}`);
            if (response.status === 200) {
                dispatch(deleteProduct(product.id as number));
                toast.success("Product deleted successfully", {
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
                <span>Select a Product</span>
                <select className="w-full md:w-[70%] xl:w-[50%] border-black border px-2 py-2 rounded-md" onChange={handleSelectProduct}>
                    <option>
                        Select Product
                    </option>
                    {allProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.title}
                        </option>
                    ))}
                </select>
                <Input
                    value={product.id}
                    label="id"
                    onChange={(e) => setProduct({ ...product, id: parseInt(e.target.value) })}
                    type="text"
                    readonly={true}
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="ID of the product"
                />
                <Input
                    value={product.title}
                    label="Title"
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    type="text"
                    readonly={true}
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
                    readonly={true}
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Price of the product"
                />
                <Input
                    value={product.description}
                    label="Description"
                    readonly={true}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Name of the product"
                />
                <Input
                    value={product.category}
                    label="Category"
                    readonly={true}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Category"
                />
                <Input
                    value={product.thumbnail}
                    label="Thumbnail"
                    readonly={true}
                    onChange={(e) => setProduct({ ...product, thumbnail: e.target.value })}
                    type="text"
                    className="w-full md:w-[70%] xl:w-[50%]"
                    placeholder="Thumbnail"
                />
                <Button disabled={loading} className="w-full md:w-[70%] xl:w-[50%] h-10 mt-2" type="submit">Delete</Button>
            </form>
        </>
    )
}

export default DeleteProduct;