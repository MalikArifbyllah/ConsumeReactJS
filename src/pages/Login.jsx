import React, { useState } from "react";
import Case from "../components/case";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = new URLSearchParams(location.search).get('message');

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/login', values)
            .then(res => {
                localStorage.setItem('access_token', res.data.data.access_token);
                navigate('/profile');
            })
            .catch(err => { 
                setError(err.response.data);
            })
    }
    return (
        <Case>
            <div class="bg-gray-900 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-gray-700 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white underline">
                                LOGIN
                            </h1>
                            {/*Ternary untuk mengecek apakah halaman diakses dengan mengirim params pada url*/}
                            {
                                errorMessage ? (
                                    <div class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-4 role=alert">
                                        <p class="font-bold"> Gagal Memproses halaman</p>
                                        <p class="text-sm">{ errorMessage}</p>
                                    </div>
                                ) : ''
                            }
                            {/*Ternary untuk mengecek apakah state error memiliki data , jika iya munculkan datanya dengan looping*/}
                            {
                                Object.keys(error).length > 0 ? (
                                    <div role="alert">
                                    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                        Gagal!!
                                    </div>
                                    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                            <ul>
                                                {
                                                    Object.entries(error).map(([key, value]) => (
                                                        <li key={key}>{ key != "status" ?value: ''}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        </div>
                                ) : ''  
                            }
                            <form onSubmit={ handleLogin } class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-large text-white font-bold dark:text-white"> Email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-500 text-gray-1000 sm:text-sm rounded-lg focus:ring-secondary-600 focus:border-secondary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold" placeholder="name@company.com" required="" onChange={e => setValues({...values, email: e.target.value})} />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-large font-bold text-white dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold" required="" onChange={e => setValues({...values, password: e.target.value})} />
                                </div>
                                <button type="submit" class="w-full text-white bg-gray-900 border border-white hover:bg-gray-800 transition delay-300 duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Case>
    );
};