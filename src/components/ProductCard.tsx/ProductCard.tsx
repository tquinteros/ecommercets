import React from 'react'
import { ProductCardProps } from '@/types/types'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from "@/redux/features/cart"
import { useAppSelector } from '@/redux/store';
import { toast } from 'react-toastify';

const ProductCard = ({ product, index }: ProductCardProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handlePushToProduct = () => {
        router.push(`/products/${product.id}`)
    }

    const getDiscountedPrice = (price: number, discountPercentage: number) => {
        const discountAmount = (price * discountPercentage) / 100;
        const discountedPrice = price - discountAmount;
        return discountedPrice.toFixed(2);
    };

    const title = product.title.length > 50 ? product.title.slice(0, 50) + '...' : product.title

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        toast.success('Product added to cart successfully!', {
            position: "bottom-center",
        })
    }

    return (
        <motion.div
            className='flex flex-col gap-4 bg-white shadow-md hover:shadow-2xl duration-300 rounded-lg h-[400px] col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'>
            <div className='relative'>
                <Image alt={product.title} src={product.thumbnail || ''} className='rounded-t-lg border w-full h-[200px] z-0' width={200} height={200} />
                <span className='text-center'><span className="font-bold bg-black text-white absolute top-2 right-2 backdrop-blur-xl px-4 py-1 rounded-lg text-md">{product.discountPercentage}% OFF</span></span>
            </div>
            <div className='flex gap-4 px-6 h-full flex-col'>
                {/* <span className='max-h-[50px] text-center text-lg font-semibold'>{title}</span>
                <span className='text-center'><span className="font-bold text-md">${product.price}</span></span>
                <div className='grid grid-cols-12 gap-8 justify-center'>
                    <Button className='col-span-6'>View More</Button>
                    <Button className='col-span-6'>Add to Cart</Button>
                </div> */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-md font-semibold'>{title}</h3>
                    <h3 className='text-2xl font-semibold'><span className='line-through'>${product.price}</span> <span>${getDiscountedPrice(product?.price || 0, product?.discountPercentage || 0)}</span></h3>
                </div>
                <div className='flex mt-auto mb-4 gap-4 justify-center'>
                    <Button className=''>View More</Button>
                    <Button onClick={handleAddToCart} className=''>Add to Cart</Button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard