"use client"
import React from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from "@/redux/features/cart";
import { AiOutlineClose } from "react-icons/ai";
import { CartProps } from "@/types/types";
import Button from "../Button/Button";
import { toast } from "react-toastify";

const Cart = ({ setIsCartOpen }: CartProps) => {
    const cart = useAppSelector((state) => state.cartReducer.value.products);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
        toast.success('Product removed from cart successfully!', {
            position: "bottom-center",
        })
    }

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

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

    return (
        <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute  bg-white border border-black flex flex-col rounded-lg min-h-[700px] md:min-h-[800px] max-h-[700px] md:max-h-[800px] p-3 overflow-y-auto z-[999] md:w-[500px] w-full top-24 right-0"
        >
            <div className="absolute right-2">
                <AiOutlineClose className="cursor-pointer" onClick={handleCloseCart} size={32} />
            </div>
            <ul className="p-4  max-h-[600px] overflow-y-auto mt-12 flex flex-col gap-6">
                {
                    cart.map((cartItem, index) => {
                        if (cartItem.price && cartItem.discountPercentage) {
                            const discountedPrice = cartItem.price * (1 - cartItem.discountPercentage / 100);
                            return (
                                <li className="flex justify-between gap-4" key={index}>
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
                                            <h3 className="text-md font-medium">{cartItem.title}</h3>
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
                                    <FiTrash2
                                        className="cursor-pointer hover:opacity-75 duration-300"
                                        onClick={() => cartItem.id && handleRemoveItem(cartItem.id)}
                                        size={32}
                                    />
                                </li>
                            )
                        }
                        return null;
                    })
                }
            </ul>
            <div className="mt-auto  h-full">
                {
                    parseFloat(calculateTotal()) > 0 ? (
                        <div className="flex gap-4 flex-col">
                            <div className="flex justify-between px-4">
                                <h3 className="text-2xl">Total:</h3>
                                <h3 className="text-2xl">${calculateTotal()}</h3>
                            </div>
                            <div className="flex justify-center gap-4">
                                <Button className="w-48" onClick={() => dispatch(clearCart())}>Remove All</Button>
                                <Button className="w-48">Checkout</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <h3 className="text-2xl">Your cart is empty</h3>
                        </div>
                    )
                }
            </div>
        </motion.div>
    );
}

export default Cart;
