import React from 'react'
import { ProductCardProps } from '@/types/types'
import Image from 'next/image'
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();

    const handlePushToProduct = () => {
        router.push(`/product/${product.id}`)
    }

    // slice the title to 50 characters
    const title = product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title

    return (
        <div className='flex flex-col border border-black col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'>
            <Image alt={product.title} src={product.image || ''} className='w-full aspect-[1/1] object-fit' width={200} height={200} />
            <div className='flex p-4 gap-4 flex-col'>
                <span className='max-h-[50px]'>{title}</span>
                <span className='font-bold'>${product.price}</span>
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