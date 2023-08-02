import { FC } from 'react';

type HeaderProps = {
    name: string;
};

const Header: FC<HeaderProps> = ({ name }) => (
    <th className='p-0'>
        <div className='py-3 px-6 bg-gray-600'>
            <span className='text-xs text-gray-300 font-semibold'>{name}</span>
        </div>
    </th>
);

export default Header;
