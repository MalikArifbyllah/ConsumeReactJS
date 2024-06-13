import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ModalAdd({ isOpen, onClose, endpoint, inputData, titleModal }) {

    if (!isOpen) {
        return null;
    }

    const [payload, setPayload] = useState({});
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setPayload(prevDataDetail => ({
            ...prevDataDetail,
            [name]: value
        }));
    }
    
    function handleStore() {
        axios.post(endpoint['store'], payload, {
            haders: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token'), 
            }
        })
            .then(res => {
                window.location.reload();
        })
            .catch(err => {
                console.log(err)
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
                } else {
                    setError(err.response.data);
                }
        })
    }

    return (
        <div id="crud-modal-add" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Add New {titleModal}
                        </h3>
                        <button type="button"
                            class="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal" onClick={onClose}> 
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    {
                        Object.keys(error).length > 0 ? (
                            <div role='alert'>
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            Object.entries(error).map(([key, value]) => (
                                                <li key={key}>{key != "status" && key != "message" ? value : ''}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                        <form class="p-4 md:p-5 py-6">
                            {
                                Object.entries(inputData).map(([index, item]) => (
                                    <div className="mb-6">
                                        {
                                            item.tag == "select" ? (
                                                <>
                                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
                                                    <select name={index} id="category" className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleInputChange}>
                                                        {
                                                            item['option'].map((opt, index) => (
                                                                <option value={opt}>{opt}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </>
                                            ) : (
                                                <>
                                                    <label htmlFor="name" className="">{index}</label>
                                                    <input type={item.type} name={index} id="name" className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-600 dark:focus:ring-border-primary-500" onChange={handleInputChange}/>
                                                </>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        <button type="button" onClick={handleStore}
                            class="text-black inline-flex items-center border border-black bg-gray-200 hover:text-gray-400 hover:border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-200 dark:hover:bg-gray-300 dark:focus:ring-gray-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Create {titleModal}
                        </button>
                        </form>
                </div>
            </div>
        </div>
    )

}