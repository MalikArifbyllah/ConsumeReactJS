import React, { useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setIsLogin(true);
                setAuthUser(res.data.data);
                if (location.pathname === '/login') {
                    navigate('/profile')
                }
            })
            .catch(err => {
                setIsLogin(false);
                if (err.response.status == 401 && location.pathname != '/login') {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            })
        
    }, [navigate]);
    return (
        <div className="bg-gray-600 rounded-md py-2">
            <div className="grid grid-cols-12">
                <section className="col-span-10 col-start-2">
                    <div className="flex items-center">``
                    <div className="flex items-center justify-beetwen">
                        <Link
                            className="mr-6 text-sm font-extrabold uppercase text-white underline"
                            to="/"
                        ><span className="text-red-200">
                            INVENTARIS </span>APP
                        </Link>
                            {/* <Link to="/login"><small className="text-white hover:text-red-900 hover:text-bold font-bold transition delay-200 duration-200 ease-in-out">Login</small></Link> */}
                        {
                            //cek status login ? cek role admin? statement admin : statement staff : statement belum login
                            isLogin ? authUser['role'] === 'admin' ? (
                                <>
                                    <Link to='/'><small className="text-white ms-3 hover:text-red-900 hover:font-bold font-bold transition delay-200 duration-200 ease-in-out">Home</small></Link>
                                        <Link to='/stuffs'><small className="text-white ms-3  hover:text-red-900 hover:font-bold font-bold transition delay-200 duration-200 ease-in-out">Stuffs</small></Link>
                                        <Link to='/inbound-stuff'><small className="text-white ms-3  hover:text-red-900 hover:font-bold font-bold transition delay-200 duration-200 ease-in-out">Inbound</small></Link>
                                        <Link to='/lending'><small className="text-white ms-3  hover:text-red-900 hover:font-bold font-bold transition delay-200 duration-200 ease-in-out">Lending</small></Link>
                                        <Link to='/user'><small className="text-white ms-3  hover:text-red-900 hover:font-bold font-bold transition delay-200 duration-200 ease-in-out">User</small></Link>
                                </>
                            ) : (
                                        <Link to='/lendings'><small className="text-white ms-3 hover:text-red-900 hover:font-bold font-bold transition delay-200 duration-200 ease-in-out">Lending</small></Link>
                            ) : ''
                        }
                    </div>
                    <div className="ml-auto">
                    {
                                isLogin ? (<Link to="/profile"><small className="text-white bg-blue-500 hover:bg-blue-700 hover:text-black hover:border-blue-400 font-bold transition delay-200 duration-200 ease-in-out px-4 py-1.5 rounded-md">Profile</small></Link>): ''
                        }
                        </div>
                        </div>
                </section>
            </div>
        </div>
    );
}