"use client"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ProductItemProps } from "@/types/types";
import ProductCard from "../ProductCard.tsx/ProductCard";
import { saveProducts } from "@/redux/features/products";
import { useDispatch } from "react-redux";
const FeaturedProducts = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<ProductItemProps[]>([]);

    function shuffleArray(array: ProductItemProps[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('https://dummyjson.com/products');
            // filter products by discountPercentage > 10
            const filteredProducts = data.products.filter((product: ProductItemProps) => product.discountPercentage && product.discountPercentage > 10);
            const shuffledProducts = shuffleArray(filteredProducts);
            const firstFour = shuffledProducts.slice(0, 4);
            setProducts(firstFour);
        } catch (error) {
            console.log(error);
        }
    }

    const saveAllProducts = async () => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/products?limit=100`
            );
            dispatch(saveProducts(response.data.products));
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    useEffect(() => {
        getAllProducts();
        saveAllProducts();
    }, []);

    return (
        <div id="featured" className="flex flex-col md:my-32 gap-8">
            <div className="flex flex-col items-center gap-4">
                <h3 className="font-bold text-4xl">Featured Products</h3>
                <div className="bg-black w-24 h-0.5"></div>
            </div>
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
        </div>
    )
}

export default FeaturedProducts;