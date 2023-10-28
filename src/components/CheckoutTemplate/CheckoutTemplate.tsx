"use client"
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckoutTemplate = () => {

    const cart = useAppSelector((state) => state.cartReducer.value.products);
    const products = useAppSelector((state) => state.productsReducer.value);
    const router = useRouter();
    const calculateTotal = () => {
        let total = 0;
        cart.forEach((cartItem) => {
            if (cartItem.price && cartItem.discountPercentage) {
                const discountedPrice = cartItem.price * (1 - cartItem.discountPercentage / 100);
                total += discountedPrice;
            } else if (cartItem.price) {
                total += cartItem.price;
            }
        });
        return total.toFixed(2);
    };

    const calculateTotal2 = () => {
        let total = 0;
        cart.forEach((cartItem) => {
            if (cartItem.price) {
                total += cartItem.price;
            }
        });
        return total.toFixed(2);
    };

    const calculateSavings = () => {
        const totalWithoutDiscount = parseFloat(calculateTotal2());
        const totalWithDiscount = parseFloat(calculateTotal());
        return (totalWithoutDiscount - totalWithDiscount).toFixed(2);
    };

    useEffect(() => {
        if (cart.length === 0) {
            toast.error('Cart is empty!', {
                position: "bottom-center",
            });
            router.push("/store");
        }
    }, [cart.length]);

    useEffect(() => {
        console.log(products);
    }, []);


    return (
        <div className="my-16">
            <div className="flex flex-col items-center gap-4">
                <h3 className="font-bold text-4xl">Checkout</h3>
                <div className="bg-black w-24 h-0.5"></div>
            </div>
            <ul className="grid grid-cols-12 p-2 mt-16 gap-6">
                {
                    cart.map((cartItem, index) => {
                        if (cartItem.price && cartItem.discountPercentage) {
                            const discountedPrice = cartItem.price * (1 - cartItem.discountPercentage / 100);
                            return (
                                <li className="flex col-span-12 md:col-span-6 justify-between gap-4" key={index}>
                                    <div className="flex gap-4">
                                        {cartItem.thumbnail ? (
                                            <Image
                                                src={cartItem.thumbnail}
                                                alt={cartItem.title}
                                                width={128}
                                                height={128}
                                                className="h-[128px] object-cover"
                                            />
                                        ) : (
                                            <div>No Image</div>
                                        )}
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-xl font-medium">{cartItem.title}</h3>
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-bold">
                                                    <span className="line-through">${cartItem.price}</span>
                                                    <h3 className="text-xl font-bold">
                                                        {discountedPrice && <span> ${discountedPrice.toFixed(2)} </span>}
                                                        <span className="text-lg">| {cartItem.discountPercentage}% OFF</span>
                                                    </h3>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        return null;
                    })
                }
            </ul>
            {
                cart.length > 0 && (
                    <div className="mt-8 p-2">
                        <div className="flex gap-8 flex-col">
                            <div className="flex border-b border-black justify-between items-center gap-6">
                                <h3 className="text-2xl">Total without discount:</h3>
                                <h3 className="text-2xl">${calculateTotal2()}</h3>
                            </div>
                            <div className="flex border-b border-black items-center justify-between gap-6">
                                <h3 className="text-2xl">Discount:</h3>
                                <h3 className="text-2xl">-{calculateSavings()}</h3>
                            </div>
                            <div className="flex border-b border-black justify-between items-center gap-6">
                                <h3 className="text-2xl">Total:</h3>
                                <h3 className="text-2xl">${calculateTotal()}</h3>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CheckoutTemplate;