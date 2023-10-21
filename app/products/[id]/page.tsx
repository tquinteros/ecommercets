"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductItems, ProductItemProps } from "@/types/types";
import { Oval } from "react-loader-spinner";
import ProductDetail from "@/src/components/ProductDetail/ProductDetail";

export default function Movies({ params }: ProductItems) {
    const { id } = params;
    const [product, setProduct] = useState<ProductItemProps | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://dummyjson.com/products/${id}`
                );
                setProduct(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

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

