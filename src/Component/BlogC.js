import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './blogcreate.css';
import Header from '../CustomComponent/Header';
import Footer from '../CustomComponent/Footer';

export default function BlogC() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        url: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://blogapp-backend-uy1e.onrender.com/items/', formData);
          console.log("Form data submitted successfully");
            navigate('/bloglist');
           // history.push('/bloglist'); // Redirect to blog list page
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };





  return (
      
    <>
      <Header />
        <div className="card-container">
          
        <div className="card-create">
           <h3>Create your Blog</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter User name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter the blog description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="url"
                            placeholder="Enter the blog URL"
                            value={formData.url}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
      </div>
      <Footer />
    </>
    
    );
}
