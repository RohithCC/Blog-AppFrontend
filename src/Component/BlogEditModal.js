import React, { useState, useEffect } from 'react';
import './editblog.css';

const BlogEditModal = ({ blog, onSave, onCancel }) => {
    const [editedBlog, setEditedBlog] = useState(blog);

    useEffect(() => {
        setEditedBlog(blog);
    }, [blog]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBlog({ ...editedBlog, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://blogapp-backend-uy1e.onrender.com/items/${editedBlog._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedBlog),
            });

            if (!response.ok) {
                throw new Error('Failed to update blog item');
            }

            const updatedBlog = await response.json();
            onSave(updatedBlog);
                window.location.reload();
        } catch (error) {
            console.error('Error updating blog item:', error);
        }
    };

    return (
         <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onCancel}>&times;</span>
            <h2>Edit Blog</h2>
            <label>Name:</label>
            <input type="text" name="name" value={editedBlog.name} onChange={handleInputChange} />
            <label>Description:</label>
            <textarea name="description" value={editedBlog.description} onChange={handleInputChange}></textarea>
            <label>URL:</label>
            <input type="text" name="url" value={editedBlog.url} onChange={handleInputChange} />
            <div className="button-container">
                <button className="save-button" onClick={handleSave}>Save</button>
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
    );
};

export default BlogEditModal;
