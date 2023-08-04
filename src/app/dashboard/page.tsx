'use client';

import {useEffect, useState} from "react";
import {useUser} from "@components/context/UserProvider";
import Table from '@components/Table/Table';

export default function Home() {
    const { token } = useUser();
    const [dataPack, setDataPack] = useState([]);

    useEffect(() => {
        handleSystemCreditsPackage();
    }, []);

    const handleSystemCreditsPackage = () => {
        if (!token?.access_token) {
            console.error('Access token not found in sessionStorage');
            return;
        }

        // Append the access token as a query parameter in the URL
        const url = `/api/systemCredits?access_token=${encodeURIComponent(token.access_token)}`;

        // Call api next /api/systemCredits GET
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Map the response data to a new structure
                const transformedData = data.map((item: any) => [item.name, item.price?.toString(), item.systemCreditsAvailable?.toString(), item.validityDays?.toString()]);
                setDataPack(transformedData);
                console.log(transformedData);
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Error fetching data:', error);
            });
    };

    const headers = ['NAME', 'PRICE (€)', 'CREDITS', 'VALIDE (days)'];

    return (
        <div className='flex flex-wrap -mx-3 -mb-3 md:mb-0'>
            <div className='w-full md:w-full px-3 mb-3 md:mb-0'>
                <Table headers={headers} data={dataPack} itemsPerPage={2}/>
            </div>
            {/*<div className='w-full md:w-1/3 px-3 mb-3 md:mb-0'>
                <section className='py-3'>
                    <div className='container mx-auto'>
                        <div className='w-full'>
                            <div className='p-6 bg-gray-500 rounded-xl'>
                                <div className='flex flex-wrap -mx-3 mb-6 justify-between items-center'>
                                    <div className='w-auto px-3'>
                                        <h4 className='text-lg text-gray-100 font-semibold'>
                                            Wallet
                                        </h4>
                                    </div>
                                    <div className='w-auto px-3'>
                                        <a
                                            className='inline-block py-1 text-gray-300 hover:text-gray-400'
                                            href='#'
                                        >
                                            <svg
                                                width={18}
                                                height={4}
                                                viewBox='0 0 18 4'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M8 2C8 2.55228 8.44772 3 9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2Z'
                                                    stroke='currentColor'
                                                    strokeWidth={2}
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z'
                                                    stroke='currentColor'
                                                    strokeWidth={2}
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M15 2C15 2.55228 15.4477 3 16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2Z'
                                                    stroke='currentColor'
                                                    strokeWidth={2}
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className='px-3 md:px-14 pb-6 mb-8 border-b border-gray-400'>
                                    <img
                                        className='block mx-auto mb-6'
                                        src='/src/assets/trizzle-assets/images/card.png'
                                        alt=''
                                    />
                                    <div className='mb-6 text-center'>
                                        <button className='inline-block w-6 h-1 mr-1 bg-blue-500 rounded-full' />
                                        <button className='inline-block w-2.5 h-1 mr-1 bg-gray-600 hover:w-6 rounded-full transition-all duration-500' />
                                        <button className='inline-block w-2.5 h-1 mr-1 bg-gray-600 hover:w-6 rounded-full transition-all duration-500' />
                                    </div>
                                    <a
                                        className='flex w-full h-12 py-2 px-3 items-center justify-center text-gray-200 font-semibold bg-gray-600 hover:bg-gray-700 transition duration-200 rounded-lg'
                                        href='#'
                                    >
                                        <svg
                                            width={17}
                                            height={14}
                                            viewBox='0 0 17 14'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M14.3334 0.75H2.66669C2.00365 0.75 1.36776 1.01339 0.89892 1.48223C0.430079 1.95107 0.166687 2.58696 0.166687 3.25V10.75C0.166687 11.413 0.430079 12.0489 0.89892 12.5178C1.36776 12.9866 2.00365 13.25 2.66669 13.25H14.3334C14.9964 13.25 15.6323 12.9866 16.1011 12.5178C16.57 12.0489 16.8334 11.413 16.8334 10.75V3.25C16.8334 2.58696 16.57 1.95107 16.1011 1.48223C15.6323 1.01339 14.9964 0.75 14.3334 0.75ZM15.1667 10.75C15.1667 10.971 15.0789 11.183 14.9226 11.3393C14.7663 11.4955 14.5544 11.5833 14.3334 11.5833H2.66669C2.44567 11.5833 2.23371 11.4955 2.07743 11.3393C1.92115 11.183 1.83335 10.971 1.83335 10.75V3.25C1.83335 3.02899 1.92115 2.81702 2.07743 2.66074C2.23371 2.50446 2.44567 2.41667 2.66669 2.41667H14.3334C14.5544 2.41667 14.7663 2.50446 14.9226 2.66074C15.0789 2.81702 15.1667 3.02899 15.1667 3.25V10.75ZM11.8334 5.75C11.3903 5.7531 10.956 5.87389 10.575 6.1C10.1954 5.87477 9.763 5.75405 9.32165 5.7501C8.8803 5.74615 8.44577 5.85912 8.06222 6.07752C7.67867 6.29592 7.35978 6.61197 7.13796 6.99355C6.91613 7.37513 6.79928 7.80863 6.79928 8.25C6.79928 8.69137 6.91613 9.12487 7.13796 9.50645C7.35978 9.88803 7.67867 10.2041 8.06222 10.4225C8.44577 10.6409 8.8803 10.7538 9.32165 10.7499C9.763 10.746 10.1954 10.6252 10.575 10.4C10.9065 10.5967 11.279 10.714 11.6634 10.7429C12.0477 10.7718 12.4336 10.7114 12.7908 10.5664C13.1479 10.4215 13.4667 10.1959 13.7223 9.90736C13.9778 9.6188 14.1632 9.27505 14.2639 8.90298C14.3645 8.5309 14.3778 8.14059 14.3027 7.76253C14.2275 7.38448 14.066 7.02892 13.8307 6.72364C13.5953 6.41836 13.2926 6.17163 12.9461 6.00273C12.5996 5.83383 12.2188 5.74733 11.8334 5.75ZM9.47502 9.08333C9.42788 9.08735 9.38049 9.08735 9.33335 9.08333C9.11234 9.08333 8.90038 8.99554 8.7441 8.83926C8.58782 8.68297 8.50002 8.47101 8.50002 8.25C8.50002 8.02899 8.58782 7.81702 8.7441 7.66074C8.90038 7.50446 9.11234 7.41667 9.33335 7.41667C9.38049 7.41265 9.42788 7.41265 9.47502 7.41667C9.28645 7.93333 9.28645 8.5 9.47502 9.01667V9.08333ZM11.8334 9.08333C11.6685 9.08333 11.5074 9.03446 11.3704 8.94289C11.2333 8.85132 11.1265 8.72117 11.0635 8.5689C11.0004 8.41663 10.9839 8.24908 11.016 8.08742C11.0482 7.92577 11.1276 7.77729 11.2441 7.66074C11.3606 7.5442 11.5091 7.46483 11.6708 7.43268C11.8324 7.40052 12 7.41703 12.1523 7.4801C12.3045 7.54317 12.4347 7.64998 12.5262 7.78702C12.6178 7.92407 12.6667 8.08518 12.6667 8.25C12.6667 8.47101 12.5789 8.68297 12.4226 8.83926C12.2663 8.99554 12.0544 9.08333 11.8334 9.08333Z'
                                                fill='#3D485B'
                                            />
                                        </svg>
                                        <span className='ml-2'>Add new Card</span>
                                    </a>
                                </div>
                                <div>
                                    <div className='flex mb-6 items-center justify-between'>
                                        <h4 className='text-lg text-gray-200 font-semibold'>
                                            Recent Activity
                                        </h4>
                                        <a
                                            className='inline-block text-sm text-gray-200 hover:text-gray-300 font-medium tracking-wide'
                                            href='#'
                                        >
                                            View all
                                        </a>
                                    </div>
                                    <div className='flex mb-6 items-center justify-between'>
                                        <div className='flex items-center'>
                                            <div className='flex w-12 h-12 mr-3 items-center justify-center bg-gray-600 rounded-full'>
                                                <img
                                                    src='/src/assets/trizzle-assets/logos/s-stripe.svg'
                                                    alt=''
                                                />
                                            </div>
                                            <div>
                                                <h5 className='text-sm font-semibold text-gray-200'>
                                                    Stripe
                                                </h5>
                                                <span className='text-xs text-gray-400 font-semibold'>
                        Deposit
                      </span>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <h6 className='text-sm text-gray-300 font-semibold'>
                                                +$523.10
                                            </h6>
                                            <span className='text-xs text-gray-400 font-semibold'>
                      Today at 7.18 AM
                    </span>
                                        </div>
                                    </div>
                                    <div className='flex mb-6 items-center justify-between'>
                                        <div className='flex items-center'>
                                            <div className='flex w-12 h-12 mr-3 items-center justify-center bg-gray-600 rounded-full'>
                                                <img
                                                    src='/src/assets/trizzle-assets/logos/f-facebook.svg'
                                                    alt=''
                                                />
                                            </div>
                                            <div>
                                                <h5 className='text-sm font-semibold text-gray-200'>
                                                    Facebook
                                                </h5>
                                                <span className='text-xs text-gray-400 font-semibold'>
                        Advertising
                      </span>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <h6 className='text-sm text-gray-300 font-semibold'>
                                                +$523.10
                                            </h6>
                                            <span className='text-xs text-gray-400 font-semibold'>
                      Today at 7.18 AM
                    </span>
                                        </div>
                                    </div>
                                    <div className='flex mb-6 items-center justify-between'>
                                        <div className='flex items-center'>
                                            <div className='flex w-12 h-12 mr-3 items-center justify-center bg-gray-600 rounded-full'>
                                                <img
                                                    src='/src/assets/trizzle-assets/logos/twitter-icon.svg'
                                                    alt=''
                                                />
                                            </div>
                                            <div>
                                                <h5 className='text-sm font-semibold text-gray-200'>
                                                    Twitter
                                                </h5>
                                                <span className='text-xs text-gray-400 font-semibold'>
                        Advertising
                      </span>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <h6 className='text-sm text-gray-300 font-semibold'>
                                                -$1,243.00
                                            </h6>
                                            <span className='text-xs text-gray-400 font-semibold'>
                      Yesterday at 10.00 PM
                    </span>
                                        </div>
                                    </div>
                                    <div className='flex mb-6 items-center justify-between'>
                                        <div className='flex items-center'>
                                            <div className='flex w-12 h-12 mr-3 items-center justify-center bg-gray-600 rounded-full'>
                                                <img
                                                    src='/src/assets/trizzle-assets/logos/slack-icon.svg'
                                                    alt=''
                                                />
                                            </div>
                                            <div>
                                                <h5 className='text-sm font-semibold text-gray-200'>
                                                    Slack
                                                </h5>
                                                <span className='text-xs text-gray-400 font-semibold'>
                        Payment
                      </span>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <h6 className='text-sm text-gray-300 font-semibold'>
                                                -$190.00
                                            </h6>
                                            <span className='text-xs text-gray-400 font-semibold'>
                      Yesterday at 4.00 PM
                    </span>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <div className='flex w-12 h-12 mr-3 items-center justify-center bg-gray-600 rounded-full'>
                                                <img
                                                    src='/src/assets/trizzle-assets/logos/steam-icon.svg'
                                                    alt=''
                                                />
                                            </div>
                                            <div>
                                                <h5 className='text-sm font-semibold text-gray-200'>
                                                    Steam
                                                </h5>
                                                <span className='text-xs text-gray-400 font-semibold'>
                        Payment
                      </span>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <h6 className='text-sm text-gray-300 font-semibold'>
                                                -$450.00
                                            </h6>
                                            <span className='text-xs text-gray-400 font-semibold'>
                      Yesterday at 4.00 PM
                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>*/}
        </div>
    );
}
