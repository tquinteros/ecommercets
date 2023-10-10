import { navLinks } from '@/data/navLinks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const Header = () => {
    return (
        <header className='sticky w-full bg-white top-0'>
            <nav className='flex justify-between items-center'>
                <Image alt="LogoHeader" src='/logo.png' width={80} height={80} />
                <ul className='hidden md:flex gap-8 hover:opacity-75 duration-300 justify-between items-center'>
                    {
                        navLinks.map((navLink, index) => {
                            return (
                                <li key={index}>
                                    <Link href={navLink.href}>{navLink.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;