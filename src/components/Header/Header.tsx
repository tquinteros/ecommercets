"use client"
import { navLinks } from '@/data/navLinks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/store'
import Cart from '../Cart/Cart';

const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(true);

    const cartLength = useAppSelector((state) => state.cartReducer.value.products.length);

    const handleOpenCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <header className='sticky w-full z-50 bg-red-500 top-0'>
            <nav className='flex justify-between container mx-auto items-center'>
                <Image alt="LogoHeader" src='/logo.png' width={80} height={80} />
                <ul className='flex gap-8 justify-between items-center'>
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