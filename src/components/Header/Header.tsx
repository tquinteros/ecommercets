"use client"
import { navLinks } from '@/data/navLinks';
import Link from 'next/link';
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/store'
import Cart from '../Cart/Cart';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartLength = useAppSelector((state) => state.cartReducer.value.products.length);
    const isAdmin = useAppSelector((state) => state.authReducer.value.isAdmin);

    const handleOpenCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky w-full h-20 flex items-center z-50 bg-black top-0">
            <nav className="flex justify-between relative container mx-auto px-4 md:px-0 items-center">
                <div className="flex items-center">
                    <Link href="/" className="hover:opacity-75 text-3xl text-white duration-300">
                        CLOTHES
                    </Link>
                </div>
                {
                    isAdmin && (
                        <div className='text-white hidden lg:absolute lg:block lg:left-1/2 lg:-translate-x-1/2'>
                            <Link className='hover:opacity-75 duration-300' href="/admin">ADMIN PANEL</Link>
                        </div>
                    )
                }
                <div className="hidden md:flex gap-8 text-white justify-between items-center">
                    <ul className='flex gap-10'>
                        {navLinks.map((navLink, index) => (
                            <li className="hover:opacity-75 duration-300" key={index}>
                                <Link href={navLink.href}>{navLink.label}</Link>
                            </li>
                        ))}
                        <li onClick={handleOpenCart} className="hover:opacity-75 cursor-pointer duration-300">
                            Cart ({cartLength})
                        </li>
                    </ul>
                </div>
                <div className="md:hidden gap-4 flex items-center">
                    {
                        isCartOpen ? <AiOutlineClose onClick={handleOpenCart} size={30} color='#fff' /> :
                            (
                                <div className='flex items-center gap-2'>
                                    <AiOutlineShoppingCart onClick={handleOpenCart} size={30} color='#fff' />
                                    <span className='text-white text-xl'>({cartLength})</span>
                                </div>
                            )
                    }
                    {isMenuOpen ? <AiOutlineClose onClick={handleToggleMenu} size={30} color='#fff' /> : <AiOutlineMenu onClick={handleToggleMenu} size={30} color='#fff' />}
                </div>
            </nav>
            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
            {isMenuOpen && (
                <motion.div
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:hidden absolute top-24 right-4 w-[80%] bg-white border-black border rounded-lg p-8 h-[600px]">
                    <ul className='flex flex-col gap-3'>
                        {navLinks.map((navLink, index) => (
                            <li className='border-b border-black' key={index}>
                                <Link onClick={() => setIsMenuOpen(false)} href={navLink.href}>{navLink.label}</Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </header>
    );
};

export default Header;