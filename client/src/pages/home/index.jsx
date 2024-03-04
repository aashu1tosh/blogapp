import React, { useEffect } from 'react'
// import { fetchListOfBlogs } from '../../../../server/controller/blog-controller'
import axios from 'axios'
import { GlobalContext } from '../../context'
import { useContext } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import './index.css'


export const Home = () => {

    const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext)

    async function fetchListOfBlogs() {
        setPending(true);
        const response = await axios.get('http://localhost:5000/api/blogs');
        const result = await response.data;
        console.log(result);

        if (result && result.blogList && result.blogList.length) {
            setBlogList(result.blogList);
            setPending(false);
        }
        else {
            setPending(false);
            setBlogList([]);
        }
    }

    async function handleDeleteBlog(getCurrentId) {
        console.log(getCurrentId);
        try {
            const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrentId}`);
            const result = response.data;

            if (result?.message === "Successfully deleted") {
                fetchListOfBlogs(); // Assuming fetchListOfBlogs is a function that fetches the updated list of blogs
            } else {
                console.error("Errors deleting blog:", result?.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error deleting this blog:", error.message);
            // Handle error (e.g., display an error message to the user)
        }
    }



    useEffect(() => {
        fetchListOfBlogs()
    }, [])

    return (
        <div>
            <h1 className='wrapper'>Blog List</h1>
            {
                pending ? <h1>Loading Blogs Please Wait</h1> :
                    <div className='blog-list'>
                        {   blogList && blogList.length ? 
                            blogList.map(blogItem => <div key={blogItem._id}>
                                <p>{blogItem.title}</p>
                                <p>{blogItem.description}</p>
                                <FaEdit size={30}></FaEdit>
                                <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={30}></FaTrash>
                            </div>) :
                            <h3>No Blogs added</h3>
                        }
                    </div>
            }
        </div>
    )
}
