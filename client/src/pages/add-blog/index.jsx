import React, { useContext } from 'react'
import './index.css'
import { GlobalContext } from '../../context'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export const AddNewBlog = () => {

    const { formData, setFormData } = useContext(GlobalContext);
    const navigation = useNavigate();
    console.log(formData);
    async function handleSaveBlogToDatabase() {
        const response = await axios.post('http://localhost:5000/api/blogs/add', {
            title: formData.title,
            description: formData.description,
        })
        const result = await response.data;
        if(result) {
            setFormData({
                title : '',
                description : '',
            });
            navigation('/');
        }
    }
    

    return (
        <div className='wrapper'>
            <h1>Add a blog</h1>
            <div className='form-wrapper'>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder='Enter Blog title'
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value,
                    })} />

                <textarea
                    name="description"
                    id="description"
                    placeholder='Enter Blog description'
                    value={formData.description}
                    onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value,
                    })} />
                <button onClick={handleSaveBlogToDatabase}>Add New Blog</button>
            </div>
        </div>
    )
}
