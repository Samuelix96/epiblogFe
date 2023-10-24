import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { dataBlogsById, patchBlogs, allBlogs} from '../reducers/blogsReducer';
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
import { useParams } from 'react-router-dom';





const UpdateBlogs = () =>
{
  const {id} = useParams()

  console.log({id})
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [ file, setFile ] = useState(null);

  console.log(file)
  const data = useSelector(allBlogs)
  const [postData, setPostData] = useState(data || {
    title: "",
    category: "",
    content: "",
    cover: "",
    readTime: "",
    author: "",
  });
 
  
console.log(data)
console.log(postData)

  const handleInputChange = (e) => {
    e.preventDefault();
  
    const { name, value } = e.target;

    setPostData({
      ...postData,
      [name]: value,
    })
  
  }
  
  useEffect(() => {
    dispatch(dataBlogsById({id}));

    if (data) {
      setPostData({
        title: data?.title,
        category: data.category,
        content: data.content,
        readTime: data.readTime,
        author: data.author,
      });
    }
  }, [ id, ]);
  

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

  const updatePost = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const uploadCover = await uploadFile(file);
        const finalBody = {
          ...postData,
          cover: uploadCover.cover,
        };
        dispatch(patchBlogs(finalBody));
        setPostData({
          title: '',
          category: '',
          content: '',
          readTime: "",
          cover: "",
          author: "",
        });
        setFile(null);
        setTimeout(() => {
          navigate('/home');
        }, 1000); 
        
      } catch (error) {
        console.log('errore nel invio del post', error);
      }
    }
  };




  return (
    <div className="justify-content-center  vh-100 d-flex align-items-center ">
      <Form encType='multipart/form-data' onSubmit={ updatePost } >
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
          <Form.Label>Data di Pubblicazione</Form.Label>
          <Form.Control
            type="datetime-local"
            onChange={ handleInputChange }
            placeholder="readTime"
            name="readTime"
            autoFocus
          />
         
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            onChange={ handleInputChange }
            placeholder="Id dell'autore"
            name="author"
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
        <button type="submit" className="btn btn-danger">Update Post</button>
      </Form>
    </div>
  )
}

export default UpdateBlogs
