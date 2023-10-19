import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { postDataBlogs, postBlogs, currentData } from '../reducers/blogsReducer';
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const NewForm = () =>
{
  const navigate = useNavigate();
  const [ file, setFile ] = useState(null);

  console.log(file)

  const [ postData, setPostData ] = useState({
    title: "",
    category: "",
    content: "",
    readTime: {
      value: 0,
      unit: ""
    },
    author: {
      name: "",
      avatar: "",
    },
  })
  const dispatch = useDispatch()

console.log(postData)

  const handleInputChange = (e) => {
    e.preventDefault();
  
    const { name, value } = e.target;
  
    // Dividi il nome in parti separate utilizzando il punto come separatore
    const nameParts = name.split('.');
  
    if (nameParts.length === 1) {
      // Se il campo non è annidato, aggiorna direttamente l'oggetto postData
      setPostData({ ...postData, [name]: value });
    } else if (nameParts.length === 2) {
      // Se il campo è annidato in un oggetto, aggiorna l'oggetto padre corretto
      setPostData({
        ...postData,
        [nameParts[0]]: {
          ...postData[nameParts[0]],
          [nameParts[1]]: value,
        },
      });
    }
  }
  

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
      const response = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/blogPosts/uploads`, {
        method: 'POST',
        body: fileData
      });
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Errore nella chiamata post del file');
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
        setPostData({
          title: '',
          category: '',
          content: '',
          readTime: {
            value: 0,
            unit: '',
          },
          author: {
            name: '',
            avatar: '',
          },
        });
        setFile(null);
        setTimeout(() => {
          navigate('/home');
        }, "1000");
        
      } catch (error) {
        console.log('errore nel invio del post', error);
      }
    }
  };


  return (
    <div className="justify-content-center  vh-100 d-flex align-items-center ">
      <Form encType='multipart/form-data' onSubmit={ sendPost } >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={ handleInputChange }
            placeholder="Titolo"
            autoFocus
          />
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Category"
            onChange={ handleInputChange }
            autoFocus
          />
          <Form.Label>Inserisci la tua cover</Form.Label>
          <Form.Control
            type="file"
            onChange={ onChangeSetFile }
            placeholder="Cover"
            name="cover"
            autoFocus
          />
          <Form.Label>Valore</Form.Label>
          <Form.Control
            type="number"
            onChange={ handleInputChange }
            placeholder="Value"
            name="readTime.value"
            autoFocus
          />
          <Form.Label>Unità in min</Form.Label>
          <Form.Control
            type="text"
            onChange={ handleInputChange }
            name="readTime.unit"
            placeholder="Unità in min"
            autoFocus
          />
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            onChange={ handleInputChange }
            placeholder="Il nome dell autore"
            name="author.name"
            autoFocus
          />
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            onChange={ handleInputChange }
            placeholder="Avatar"
            name="author.avatar"
            autoFocus
          />
          <Form.Label>Content</Form.Label>
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
