import React, { useState, useEffect } from "react";
import axios from "axios";
import Case from "../components/case";
import { Link, useNavigate } from "react-router-dom"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Profile() {
    const [profile, setProfile] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setProfile(res.data.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!!'));
                }
            })
        }, []);
    const handleLogout = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
            localStorage.removeItem('access_token');
                navigate('/login');
            })
            .catch(err => {
            console.log(err);
        })
        }
    return (
        < Case >
            <div className="block m-auto mt-10 w-full shadow-inherit max-w-sm bg-gray-700 border border-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-900">
                <div className="flex flex-col items-center pb-10 pt-10">
                    <FontAwesomeIcon icon="fa-solid fa-user" className="w-20 h-20 mb-3 text-white shadow-slate-500" /> 
                    <h5 className="mb-1 text-xl underline font-bold text-white dark:text-black font-serif">{ profile.username }</h5>
                    <span className="text-sm font-medium text-white dark:text-gray-500">{ profile.email }</span>
                        <div className="flex mt-4 md:mt-6">
                            <Link to ="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-lg border border-white hover:bg-white hover:text-black hover:border-black
                            focus:ring-4 focus:outline-none focus:ring-white dark:bg-white dark:hover:bg-white dark:focus:ring-white">Dashboard</Link>
                            <a href="#" onClick={ handleLogout } className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-white hover:bg-white hover:text-black hover:border-black focus:z-10 focus:ring-4 focus: ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
                            dark:hover:bg-gray-700">Logout</a>
                        </div>
                </div>
            </div>
        </Case >
    
    )
}