"use client"
import { useEffect, useState } from 'react';
import { ProductItemProps } from '@/types/types';
import Image from 'next/image';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from "@/redux/features/cart"
import { useAppSelector } from '@/redux/store';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Hero = () => {
    const [heroHeight, setHeroHeight] = useState(0);
    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const dispatch = useDispatch();
    const [imageWidth, setImageWidth] = useState<number | null>(null);
    const [featuredProduct, setFeaturedProduct] = useState<ProductItemProps | null>(null);
    const [loading, setLoading] = useState(true);

    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            const height = header.getBoundingClientRect().height;
            setHeaderHeight(height);
        }
    }, []);

    const getFeaturedProduct = async () => {
        try {
            const { data } = await axios.get('https://dummyjson.com/products/1');
            setFeaturedProduct(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeaturedProduct();
        const calculateHeroHeight = () => {
            const windowHeight = window.innerHeight;
            const headerElement = document.querySelector('header');

            if (headerElement) {
                const headerHeight = headerElement.offsetHeight;
                const newHeroHeight = windowHeight - headerHeight;
                setHeroHeight(newHeroHeight);
            }
        };
        calculateHeroHeight();
        window.addEventListener('resize', calculateHeroHeight);
        return () => {
            window.removeEventListener('resize', calculateHeroHeight);
        };
    }, []);

    const onImageLoad = () => {
        const imageElement = document.querySelector('.featured-image');
        if (imageElement) {
            const imageHeight = imageElement.clientHeight;
            const imageWidth = imageElement.clientWidth;
            setImageWidth(imageWidth);
            setImageHeight(imageHeight);
        }
    }

    const getDiscountedPrice = (price: number, discountPercentage: number) => {
        const discountAmount = (price * discountPercentage) / 100;
        const discountedPrice = price - discountAmount;
        return discountedPrice.toFixed(2);
    };

    const handleAddToCart = () => {
        if (featuredProduct) {
            dispatch(addToCart(featuredProduct));
        }
        toast.success('Product added to cart successfully!', {
            position: "bottom-center",
        })
    }

    return (
        <>
            {loading ? (
                <div className='h-screen flex justify-center items-center'>
                    <Oval
                        height={80}
                        width={80}
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='grid grid-cols-12 gap-8'
                    style={{ height: `calc(100vh - ${headerHeight}px)` }}
                >
                    <div className='flex md:col-span-6 col-span-12 flex-col p-8 gap-6 justify-center w-full'>
                        <h3 className='text-5xl'>
                            SALE!!
                        </h3>
                        <h3 className='text-4xl'>
                            {featuredProduct?.title}
                        </h3>
                        <p className='first-letter:uppercase'>
                            {featuredProduct?.description}
                        </p>
                        <span className=''>
                            <span className='line-through text-xl'>${featuredProduct?.price}</span>
                            <span className='text-3xl'>/${getDiscountedPrice(featuredProduct?.price || 0, featuredProduct?.discountPercentage || 0)}</span>
                            <span className='font-bold ml-4 text-red-500'>{featuredProduct?.discountPercentage}% OFF
                            </span>
                        </span>
                        <div className='grid grid-cols-12 gap-8 justify-center'>
                            <Link href={`/products/1`} className='col-span-6 w-full inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-300 bg-black rounded-lg hover:opacity-75 focus:shadow-outline focus:outline-none'>View More</Link>
                            <Button className='col-span-6 w-full' onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    </div>
                    <div className='md:col-span-6 hidden md:block'>
                        <Image
                            alt="FeaturedProduct"
                            src={'/hero.png'}
                            width={1000}
                            height={1000}
                            onLoad={onImageLoad}
                            className="rounded-lg h-full"
                        />
                    </div>
                </motion.div>
            )}
        </>
    )
}

export default Hero;
