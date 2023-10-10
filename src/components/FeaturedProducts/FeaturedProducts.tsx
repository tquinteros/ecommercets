"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Products } from "@/types/types";
import ProductCard from "../ProductCard.tsx/ProductCard";

const FeaturedProducts = () => {

    const [products, setProducts] = useState<Products[]>([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('https://fakestoreapi.com/products');
            const filteredProducts = data.filter((product: Products) => product && product.id && product.id % 2 === 0);
            setProducts(filteredProducts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="flex flex-col mt-52 gap-8">
            <h3 className="font-bold text-2xl">Featured Products</h3>
            <div className="grid grid-cols-12 gap-8 p-4 md:p-0">
                {
                    products.map((product, index) => {
                        return (
                            <ProductCard
                                key={index}
                                product={product}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedProducts;