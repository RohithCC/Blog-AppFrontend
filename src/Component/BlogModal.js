import React from 'react';
import './blogmodal.css';



export default function BlogModal({ blog, onClose }){
    return (
            <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 style={{ textAlign: 'center' }}>{blog.name}</h2>
                <div style={{ textAlign: 'center' }}>
                    <a href={blog.url} target="_blank" rel="noopener noreferrer">
                        <img src={blog.url} alt="Blog Image" style={{ width: '100px', height: '100px' }} />
                    </a>
                </div>
                <p style={{ textAlign: 'center' }}>{blog.description}</p>
                <div style={{ textAlign: 'center' }}>
                    {/*<a href={blog.url} target="_blank" rel="noopener noreferrer">Visit Blog</a>*/}
                </div>
            </div>
        </div>
    );
};

