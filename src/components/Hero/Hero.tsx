"use client"
import { useEffect, useState } from 'react';
import { Products } from '@/types/types';
import Image from 'next/image';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const Hero = () => {
    const [heroHeight, setHeroHeight] = useState(0);
    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const [imageWidth, setImageWidth] = useState<number | null>(null);
    const [featuredProduct, setFeaturedProduct] = useState<Products | null>(null); // Usamos null en lugar de undefined
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    const getFeaturedProduct = async () => {
        try {
            const { data } = await axios.get('https://fakestoreapi.com/products/2');
            setFeaturedProduct(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Una vez que se completa la carga, cambiamos el estado de loading a false
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

    const divStyle = imageHeight ? { maxHeight: imageHeight + 'px', width: imageWidth + 'px' } : {};
    const priceDiscount = featuredProduct?.price
        ? featuredProduct.price - (featuredProduct.price * 0.5)
        : 0;

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
                <div style={{ height: heroHeight }} className='flex gap-8 mt-12 md:mt-0 flex-col lg:flex-row justify-center items-center'>
                    <div style={divStyle} className='p-8 flex flex-col gap-8  h-full'>
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
                            <span className='text-3xl'>/${priceDiscount.toFixed(2)}</span>
                            <span className='font-bold ml-2 text-opacity-70'> 50% OFF
                            </span>
                        </span>
                        <div className='flex gap-12 justify-center'>
                            <button className='bg-black text-white px-12 py-3 rounded-md hover:bg-opacity-75 duration-300'>
                                View More
                            </button>
                            <button className='bg-black text-white px-12 py-3 rounded-md hover:bg-opacity-75 duration-300'>
                                Add to cart
                            </button>
                        </div>
                    </div>
                    <Image
                        alt="FeaturedProduct"
                        src={featuredProduct?.image || '/placeholder.jpg'}
                        width={500}
                        height={500}
                        onLoad={onImageLoad}
                        className="featured-image"
                    />
                </div>
            )}
        </>
    )
}

export default Hero;
