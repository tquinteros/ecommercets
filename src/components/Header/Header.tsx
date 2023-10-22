"use client"
import { navLinks } from '@/data/navLinks';
import Link from 'next/link';
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/store'
import Cart from '../Cart/Cart';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';

const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartLength = useAppSelector((state) => state.cartReducer.value.products.length);

    const handleOpenCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky w-full h-20 flex items-center z-50 bg-black top-0">
            <nav className="flex justify-between container mx-auto px-4 md:px-0 items-center">
                <div className="flex items-center">
                    <Link href="/" className="hover:opacity-75 text-white duration-300">
                        <h3 className="text-3xl">CLOTHES</h3>
                    </Link>
                </div>
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
                <div className="md:hidden flex items-center">
                    <button onClick={handleToggleMenu}>
                        {isMenuOpen ? <AiOutlineClose size={36} color='#fff' /> : <AiOutlineMenu size={36} color='#fff' />}
                    </button>
                </div>
            </nav>
            {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
            {isMenuOpen && (
                <motion.div
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:hidden absolute top-24 right-4 w-[80%] bg-[#ebebeb] border-black border rounded-lg p-8 h-[600px]">
                    <ul className='flex flex-col gap-3'>
                        {navLinks.map((navLink, index) => (
                            <li className='border-b border-black' key={index}>
                                <Link onClick={() => setIsMenuOpen(false)} href={navLink.href}>{navLink.label}</Link>
                            </li>
                        ))}
                        <li className='border-b border-black' onClick={handleOpenCart}>Cart ({cartLength})</li>
                    </ul>
                </motion.div>
            )}
        </header>
    );
};

export default Header;