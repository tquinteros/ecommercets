"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductItems, ProductItemProps } from "@/types/types";
import { Oval } from "react-loader-spinner";
import ProductDetail from "@/src/components/ProductDetail/ProductDetail";
import { useAppSelector } from "@/redux/store";
import { findProductById } from "@/redux/features/products";
import { useDispatch } from "react-redux";

export default function Products({ params }: ProductItems) {
    const { id } = params;
    const [product, setProduct] = useState<ProductItemProps | null>(null);
    const allProducts = useAppSelector((state) => state.productsReducer.value.products);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log("allProducts", allProducts)
        const foundProduct = allProducts.find(product => product.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [id, allProducts]);

    // useEffect(() => {
    //     const fetchProductDetails = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `https://dummyjson.com/products/${id}`
    //             );
    //             setProduct(response.data);
    //         } catch (error) {
    //             console.error('Error fetching product details:', error);
    //         }
    //     };

    //     if (id) {
    //         fetchProductDetails();
    //     }
    // }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {product ? (
                <ProductDetail product={product} />
            ) : (
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
            )}
        </div>
    );
};

