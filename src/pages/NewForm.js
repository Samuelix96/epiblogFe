import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { postBlogs, setResetPostData, setPostData } from '../reducers/blogsReducer';
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allPostData } from '../reducers/blogsReducer';
import "./newForm.css"


const NewForm = () =>
{
  const postData = useSelector(allPostData)
  const navigate = useNavigate();
  const [ file, setFile ] = useState(null);

  console.log(file)

  
  const dispatch = useDispatch()



  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
  
    dispatch(setPostData({ [name]: value }));
  };
  

  const onChangeSetFile = (e) =>
  {
    setFile(e.target.files[ 0 ])
  }

  const uploadFile = async (cover) =>
  {
    const fileData = new FormData()
    console.log(fileData)
    fileData.append("cover", cover)

    try
    {
      const response = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/blogPosts/cloudUpload`, {
        method: 'POST',
        body: fileData
      });
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Errore nella chiamata post del file con cloudinary');
      }
    } catch (error)
    {
      console.log("errore nella chiamata post del file", error)
    }
  }

  const sendPost = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const uploadCover = await uploadFile(file);
        const finalBody = {
          ...postData,
          cover: uploadCover.cover,
        };
        dispatch(postBlogs(finalBody));
        dispatch(setResetPostData()); 
        setFile(null);
        setTimeout(() => {
          navigate('/home');
        }, 1000); 
      } catch (error) {
        console.log('errore nell\'invio del post', error);
      }
    }
  };
  



  return (
    <div className="justify-content-center back-form  vh-100 d-flex align-items-center ">
      <Form className='bg-info p-5 rounded-4' encType='multipart/form-data' onSubmit={ sendPost } >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className='fs-4'>Titolo</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={ handleInputChange }
            placeholder="Titolo"
            autoFocus
          />
          <Form.Label className='fs-4'>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Category"
            onChange={ handleInputChange }
            autoFocus
          />
          <Form.Label className='fs-4'>Inserisci la tua cover</Form.Label>
          <Form.Control
            type="file"
            onChange={ onChangeSetFile }
            placeholder="Cover"
            name="cover"
            autoFocus
          />
          <Form.Label className='fs-4'>Valore</Form.Label>
          <Form.Control
            type="datetime-local"
            onChange={ handleInputChange }
            placeholder="ReadTime"
            name="readTime"
            autoFocus
          />
          
          <Form.Label className='fs-4'>Name</Form.Label>
          <Form.Control
            type="text"
            onChange={ handleInputChange }
            placeholder="ID dell autore"
            name="author"
            autoFocus
          />

          <Form.Label className='fs-4'>Content</Form.Label>
          <Form.Control
            as="textarea"
            onChange={ handleInputChange }
            rows={ 3 }
            name='content'
            placeholder='Content' />
        </Form.Group>
        <button type="submit" className="btn btn-danger">Send Post</button>
      </Form>
    </div>
  )
}

export default NewForm
