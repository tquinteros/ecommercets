"use client"
import React, { useState, useEffect } from "react";
import { ProductDetailsProps } from "@/types/types";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart"
import { toast } from "react-toastify";

const ProductDetail = ({ product }: ProductDetailsProps) => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const dispatch = useDispatch();
    const getDiscountedPrice = (price: number, discountPercentage: number) => {
        const discountAmount = (price * discountPercentage) / 100;
        const discountedPrice = price - discountAmount;
        return discountedPrice.toFixed(2);
    };

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const height = header.getBoundingClientRect().height;
            setHeaderHeight(height);
        }
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        toast.success('Product added to cart successfully!', {
            position: "bottom-center",
        })
    }

    return (
        <div className="container mt-16 mx-auto">
            <div
                style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
                className="grid border grid-cols-12 content-center md:g justify-items-center gap-6">
                <div className="col-span-12 order-2 md:order-1 flex flex-col gap-4 md:col-span-7">
                    {
                        product.images ? (product.images.map((image, index) => {
                            return (
                                <Image key={index} src={image} alt={product.title} className="" width={1000} height={1000} />
                            )
                        })) : (
                            <Image src={product.thumbnail || ''} alt={product.title} className="" width={1000} height={1000} />
                        )
                    }
                </div>
                <div
                    style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}
                    className="col-span-12 p-8 order-1 md:order-2 md:sticky md:top-20 flex flex-col gap-6 md:col-span-5">
                    <h3 className="text-3xl">{product.title}</h3>
                    <h3 className="text-lg">{product.description}</h3>
                    <div>
                        <h3 className='text-3xl font-semibold'><span className='line-through'>${product.price}</span> <span>${getDiscountedPrice(product?.price || 0, product?.discountPercentage || 0)}</span></h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl">{product.stock} Remaining!</h3>
                        <h3 className="text-xl flex items-center gap-2">{product.rating}/5 <AiOutlineStar /></h3>
                    </div>
                    <div className="">
                        <Button onClick={handleAddToCart} className="w-full">Add To Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;