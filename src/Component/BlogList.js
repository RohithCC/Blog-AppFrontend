import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import BlogModal from './BlogModal';
import BlogEditModal from './BlogEditModal';
import { Pagination } from 'react-bootstrap';
import './blog.css';
import Header from '../CustomComponent/Header';
import Footer from '../CustomComponent/Footer';
import { Table } from 'react-bootstrap';
export default function BlogList() {
    const [data, setData] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(4);

    const fetchData = async () => {
        try {
            const response = await fetch('https://blogapp-backend-uy1e.onrender.com/bloglist');
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.log("Error", error);
        }
    };

    const handleDelete = async (id) => {
        console.log("Delete item with ID:", id);
        try {
            const response = await fetch(`https://blogapp-backend-uy1e.onrender.com/items/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchData(); // Refresh data after successful delete
            } else {
                console.log("Failed to delete item");
            }
        } catch (error) {
            console.log("Error deleting item:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle opening the modal and selecting the blog
    const handleView = (id) => {
        const selected = data.find(item => item._id === id);
        setSelectedBlog(selected);
        setModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleEdit = async (id) => {
        try {
            const response = await fetch(`https://blogapp-backend-uy1e.onrender.com/items/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch blog item');
            }
            const data = await response.json();
            setSelectedBlogForEdit(data);
            setEditModalVisible(true);
        } catch (error) {
            console.error('Error fetching blog item:', error);
        }
    };

    const handleEditModalSave = (editedBlog) => {
        console.log("Saving edited blog:", editedBlog);
        setSelectedBlogForEdit(null);
        setEditModalVisible(false);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Header />
            <h3>Blog list data</h3>
            {modalVisible && selectedBlog && (
                <BlogModal blog={selectedBlog} onClose={closeModal} />
            )}
            {editModalVisible && selectedBlogForEdit && (
                <BlogEditModal
                    blog={selectedBlogForEdit}
                    onSave={handleEditModalSave}
                    onCancel={handleEditModalCancel}
                />
            )}
                  <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>URL</th>
                        <th>Edit</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBlogs.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><img src={item.url} alt="Blog" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
                            </td>
                            <td>
                                <button className="view-button" onClick={() => handleView(item._id)}>
                                    <FontAwesomeIcon icon={faEye} /> View
                                </button>
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
          </Table>
           <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination>
                    {Array.from({ length: Math.ceil(data.length / blogsPerPage) }, (_, i) => (
                        <Pagination.Item key={i} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>

            <Footer />
        </div>
    );
}
