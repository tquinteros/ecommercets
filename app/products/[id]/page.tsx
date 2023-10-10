"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductItems, Products } from "@/types/types";
import { Oval } from "react-loader-spinner";

export default function Movies({ params }: ProductItems) {
    const { id } = params;
    const [product, setProduct] = useState<Products | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://fakestoreapi.com/products/${id}`
                );
                setProduct(response.data);
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
                <div>hola</div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Oval
                        height={72}
                        width={72}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#fff"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>
            )}
        </div>
    );
};

