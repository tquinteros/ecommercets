import React from 'react'
import { ProductCardProps } from '@/types/types'
import Image from 'next/image'
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();

    const handlePushToProduct = () => {
        router.push(`/products/${product.id}`)
    }

    const title = product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title
    const discountPrice = product.price - (product.price * 0.5)

    return (
        <div className='flex flex-col border-2 border-black rounded-xl  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'>
            <Image alt={product.title} src={product.image || ''} className='w-full rounded-xl aspect-[1/1] object-fit' width={200} height={200} />
            <div className='flex p-4 gap-4 flex-col'>
                <span className='max-h-[50px] text-center text-lg font-semibold'>{title}</span>
                <span className='text-center'><span className='line-through text-md'>${product.price}</span><span className='font-bold text-lg'> ${discountPrice.toFixed(2)}</span></span>
                <div className='flex gap-4'>
                    <button
                    onClick={handlePushToProduct}
                    className='bg-black text-white px-8 py-2 rounded-md hover:bg-opacity-75 duration-300'>
                        View More
                    </button>
                    <button className='bg-black text-white px-8 py-2 rounded-md hover:bg-opacity-75 duration-300'>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard