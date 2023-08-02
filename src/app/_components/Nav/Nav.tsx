import React from 'react';
import Link from "next/link";
import { HiUserCircle, HiLogout } from 'react-icons/hi';


type NavItem = {
    name: string;
    Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    link: string;
};

type NavProps = {
    items: NavItem[];
};

const Nav: React.FC<NavProps> = ({ items }) => {
    return (
        <div className='hidden lg:block navbar-menu relative z-50'>
            <div className='lg:hidden navbar-backdrop fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50' />
            <nav className='fixed top-0 left-0 bottom-0 max-w-max flex flex-col h-full py-6 px-4 bg-gray-700 overflow-auto'>

                <div className='mb-6'>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className='flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800'
                                    href={item.link}
                                >
                                    <item.Icon className='h-6 w-6' />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='mt-auto'>
                    <Link
                        className='flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-gray-800'
                        href='/dashboard/profile'
                    >
                        <HiUserCircle size={24} />
                    </Link>
                    <Link
                        className='flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-blue-500 bg-gray-800'
                        href='/auth/logout'
                    >
                        <HiLogout size={24} />
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
