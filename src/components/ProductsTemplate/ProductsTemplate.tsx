"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ProductItemProps } from "@/types/types";
import ProductCard from "../ProductCard.tsx/ProductCard";
import { Oval } from "react-loader-spinner";

const ProductsTemplate = () => {

    const [products, setProducts] = useState<ProductItemProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://dummyjson.com/products?limit=50`
            );
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="my-16">
            <div className="flex flex-col mb-16 items-center gap-2">
                <h3 className="font-bold text-4xl">Products</h3>
                <div className="bg-black w-24 h-0.5"></div>
            </div>
            {
                loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Oval
                            height={72}
                            width={72}
                            color="#000"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#000"
                            strokeWidth={2}
                            strokeWidthSecondary={2}

                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-12 gap-8 p-4 md:p-0">
                        {
                            products.map((product, index) => {
                                return (
                                    <ProductCard
                                        key={index}
                                        index={index}
                                        product={product}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }



        </div>
    )
}

export default ProductsTemplate;