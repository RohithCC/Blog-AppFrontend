import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../CustomComponent/Header';
import Footer from '../CustomComponent/Footer';
import './home.css';

export default function Home() {
    const [blogItems, setBlogItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
              const response = await axios.get('https://blogapp-backend-uy1e.onrender.com/bloglist');
              console.log(response.data)
                setBlogItems(response.data);
            } catch (error) {
                console.error('Error fetching blog items:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className="container-home">
                <h1>Blog List</h1>
                <div className="card-container-home">
                        {blogItems.map(item => (
                <div key={item._id} className="card-home">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                            <img src={item.url} alt={item.name} style={{width: "100px", height:"100px"}} />
                    <p>{item.createdDate}</p>
                </div>
            ))}

                </div>
            </div>
            <Footer />
        </div>
    );
}
