import { FC } from 'react';
import Header from './Header';
import Row from './Row';

type TableProps = {
    headers: string[];
    data: any[][];
};

const Table: FC<TableProps> = ({ headers, data }) => (
    <section className='py-3'>
        <div className='container px-4 mx-auto'>
            <div className='pt-6 pb-8 bg-gray-500 rounded-xl'>
                <div className='px-6'>
                    <h4 className='text-lg text-gray-100 font-semibold mb-6'>Companies</h4>
                    <div className='w-full mt-6 pb-6 overflow-x-auto'>
                        <table className='w-full min-w-max'>
                            <thead>
                            <tr className='text-left'>
                                {headers.map((header, i) => (
                                    <Header key={i} name={header} />
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, i) => (
                                <Row key={i} data={row} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Rest of the code */}
            </div>
        </div>
    </section>
);

export default Table;
