"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ProductItemProps } from "@/types/types";
import ProductCard from "../ProductCard.tsx/ProductCard";
import { Oval } from "react-loader-spinner";

type PriceRange = [number, number];
type Categories = string[];
const ProductsTemplate = () => {

    const [products, setProducts] = useState<ProductItemProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [priceRange, setPriceRange] = useState<PriceRange>([0, 200]);
    const [categories, setCategories] = useState<Categories>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/products/categories`
            );
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };


    const handlePriceRangeChange = (values: PriceRange) => {
        setPriceRange(values);
    };

    const handleCategoryFilter = (category: string) => {
        if (selectedCategories.includes(category)) {
            const updatedCategories = selectedCategories.filter((cat) => cat !== category);
            setSelectedCategories(updatedCategories);
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredProducts = products.filter((product) => {
        if (product.price === undefined || product.category === undefined) return false;
        const isInPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        const isMatchSearchQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const isMatchCategory = selectedCategories.length
            ? selectedCategories.includes(product.category)
            : true;
        return isInPriceRange && isMatchSearchQuery && isMatchCategory;
    });

    return (
        <div className="my-16">
            <div className="flex flex-col mb-8 md:mb-16 items-center gap-2">
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
                        <div className="md:col-span-3 col-span-12 md:sticky md:max-h-screen md:top-28 flex flex-col gap-4">
                            <h2 className="text-xl">FILTERS</h2>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="border border-gray-300 w-full rounded p-2"
                            />
                            <div className="">
                                <h2>Price Range: {priceRange[0]} - {priceRange[1]}</h2>
                                <input
                                    type="range"
                                    min={0}
                                    max={2000}
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        handlePriceRangeChange([
                                            parseInt(e.target.value),
                                            priceRange[1],
                                        ])
                                    }
                                    className="w-full"
                                />
                                <input
                                    type="range"
                                    min={0}
                                    max={2000}
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        handlePriceRangeChange([
                                            priceRange[0],
                                            parseInt(e.target.value),
                                        ])
                                    }
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <h2>Categories</h2>
                                <ul className="flex flex-col gap-1">
                                    <li>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCategoryFilter("all")}
                                            checked={selectedCategories.length === categories.length}
                                        />
                                        <label className="capitalize">&nbsp;All</label>
                                    </li>
                                    {categories.map((category, index) => (
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCategoryFilter(category)}
                                                checked={selectedCategories.includes(category)}
                                            />
                                            <label className="capitalize">&nbsp;{category}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-3 col-span-12 md:col-span-9">
                            {
                                filteredProducts.length > 0 ? (filteredProducts.map((product, index) => {
                                    return (
                                        <ProductCard
                                            key={index}
                                            index={index}
                                            product={product}
                                            reverse={true}
                                        />
                                    )
                                })) : (
                                    <div className="col-span-12 md:col-span-9">
                                        <h2 className="text-2xl">No Products Found</h2>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }



        </div>
    )
}

export default ProductsTemplate;