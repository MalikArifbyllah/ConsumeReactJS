import React, {useState, useEffect} from 'react'
import Case from "../src/components/case"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function App() {
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
  return (
    <Case>
      <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
        <div className="bg-gray-800 border border-white shadow-2xl rounded-lg max-w-lg w-full p-6">
          <h4 className='text-white text-2xl'>Hello!!</h4><h4 className='text-red-500 text-2xl font-bold'> {profile.username}</h4>
          <p className='text-lg text-gray-400 leading-relaxed'>Welcome to website inventaris &#128526;</p> 
        </div>
      </div>
      </Case>
  )
}