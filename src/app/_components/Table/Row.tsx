import { FC } from 'react';

type RowProps = {
    data: any[];
};

const Row: FC<RowProps> = ({ data }) => (
    <tr>
        {data.map((item, i) => (
            <td key={i} className='p-0'>
                <div className='flex items-center h-16 px-6'>
                    <span className='text-sm text-gray-100 font-medium'>{item}</span>
                </div>
            </td>
        ))}
    </tr>
);

export default Row;
