import { useState, FC } from 'react';
import Header from './Header';
import Row from './Row';

type TableProps = {
    headers: string[];
    data: any[][];
    itemsPerPage?: number;
};

const Table: FC<TableProps> = ({ headers, data, itemsPerPage = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = data.slice(start, end);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
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
                                {currentData.map((row, i) => (
                                    <Row key={i} data={row} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center justify-between px-6 pt-8 border-t border-gray-400'>
                        <div className='w-full sm:w-auto mb-6 sm:mb-0'>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm font-medium text-gray-400'>
                                    <span>Showing</span>
                                    <span className='px-px text-gray-200'>{start + 1}</span>
                                    <span>to</span>
                                    <span className='px-px text-gray-200'>{end > totalItems ? totalItems : end}</span>
                                    <span>of {totalItems} results</span>
                                </p>
                            </div>
                        </div>
                        <div className='w-full sm:w-auto mb-6 sm:mb-0'>
                            <div className='flex flex-wrap items-center -m-1.5'>
                                <div className='w-auto p-1.5'>
                                    <button
                                        className='inline-flex items-center h-9 py-1 px-4 text-xs text-gray-400 font-semibold bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-200'
                                        onClick={prevPage}
                                    >
                                        Previous
                                    </button>
                                </div>
                                <div className='w-auto p-1.5'>
                                    <button
                                        className='inline-flex items-center h-9 py-1 px-4 text-xs text-blue-50 font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200'
                                        onClick={nextPage}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Table;
