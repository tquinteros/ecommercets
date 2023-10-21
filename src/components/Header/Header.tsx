"use client"
import { navLinks } from '@/data/navLinks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/store'
import Cart from '../Cart/Cart';

const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartLength = useAppSelector((state) => state.cartReducer.value.products.length);

    const handleOpenCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <header className='sticky w-full h-20 flex items-center z-50 bg-black  top-0'>
            <nav className='flex justify-between container mx-auto items-center'>
                <Link href="/" className='hover:opacity-75 text-white duration-300'>
                    {/* <Image alt="LogoHeader" src='/logo.png' width={80} height={80} /> */}
                    <h3 className='text-3xl'>CLOTHES</h3>
                </Link>
                <ul className='flex gap-8 text-white justify-between items-center'>
                    {
                        navLinks.map((navLink, index) => {
                            return (
                                <li className='hover:opacity-75 duration-300' key={index}>
                                    <Link href={navLink.href}>{navLink.label}</Link>
                                </li>
                            )
                        })
                    }
                    <li onClick={handleOpenCart} className='hover:opacity-75 cursor-pointer duration-300'>
                        Cart ({cartLength})
                    </li>
                </ul>
                {
                    isCartOpen && (
                        <Cart setIsCartOpen={setIsCartOpen} />
                    )
                }
            </nav>
        </header>
    )
}

export default Header;