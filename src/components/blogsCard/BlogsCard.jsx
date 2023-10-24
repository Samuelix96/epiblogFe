
import React, { useState, useEffect } from 'react';
import './blog.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBlogs } from '../../reducers/blogsReducer'
import { getComments, postComments, putComments, deleteComments, allComments, } from '../../reducers/commentsBlog';
import { resetData, setCommentsData } from '../../reducers/commentsBlog';


const BlogsCard = ({ cover, category, readTime, author, title, content, id }) =>
{
  const dispatch = useDispatch();
  const [commentsData, setCommentsData] = useState({
    userName: '',
    content: '',
    code: id, 
  });
  const comments = useSelector(allComments);
  const [ confirmationMessage, setConfirmationMessage ] = useState(null);
  const [ editFormData, setEditFormData ] = useState({})
  const [ showComments, setShowComments ] = useState(false);
  const [ editingComment, setEditingComment ] = useState("");
  const [ isAddingComment, setIsAddingComment ] = useState(false);

  console.log(commentsData)

  //! Delete del blogPost
  const handleDeletePost = (e) =>
  {
    e.preventDefault();
    dispatch(deleteBlogs(id));
  }

  console.log(comments)



  //! logica dei comments
  useEffect(() =>
  {
    if (showComments)
    {
      dispatch(getComments({ id }));
    }
  }, [ id, showComments ]);


  const handleToggleComments = () =>
  {
    setShowComments(!showComments);
  };

  const handleAddComment = (e) =>
  {
    e.preventDefault();
    const newComment = {
      userName: commentsData.userName,
      content: commentsData.content,
      code: id,
    };

    dispatch(postComments({ id, commentsData: newComment }));
    dispatch(resetData());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setCommentsData({
      ...commentsData,
      [name]: value,
    });
  };
  

  const handleCancelEditComment = () =>
  {
    setEditingComment(null);
    //* Resetta il form
    setEditFormData({ userName: '', content: '' });
  };


  const handleEditComment = (commentPost) =>
  {
    setEditingComment(commentPost);
    setEditFormData({
      userName: commentPost.userName,
      content: commentPost.content,
    });
  };

  const handleUpdateComment = (e) =>
  {
    e.preventDefault();
    if (editingComment)
    {
      const updatedComment = {
        id: editingComment._id,
        userName: editFormData.userName,
        content: editFormData.content,
      };

      dispatch(
        putComments({
          id,
          commentsid: editingComment._id,
          updateComments: updatedComment,
        })
      );

      setEditingComment({
        ...editingComment,
        userName: updatedComment.userName,
        content: updatedComment.content,
      });

      setEditFormData({ userName: '', content: '' });
    }
  };


  const handleDeleteComment = async (commentId) =>
  {

    try
    {
      dispatch(deleteComments({ id, commentsid: commentId }));
      setConfirmationMessage("Post eliminato con successo");
    } catch (error)
    {
      setConfirmationMessage("Errore durante la post Riprova");
    }
    setTimeout(() =>
    {
      setConfirmationMessage(null);
    }, 5000);
  };


  return (
    <div className="container my-5">
      <div className="card">
        <img src={ cover } className="top-image" />
        <h2 className="card-name">{ title }</h2>
        <p className="card-info">{ content }</p>
        <p className="card-info">{ category }</p>
        <p className="card-info">{ author }</p>
        <a href="" className="btn">
          Contact
        </a>
        <ul className="card-social">
          <li>
            <a href="https://www.facebook.com">
              <i className="fab fa-facebook-square" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com">
              <i className="fab fa-twitter-square" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/accounts/login/">
              <i className="fab fa-instagram" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com">
              <i className="fab fa-youtube" />
            </a>
          </li>
        </ul>
        <p>{ readTime }</p>
        <div>
          <button onClick={ handleDeletePost } className="btn btn-danger p-2 mx-2">
            Elimina Post
          </button>
         { /*  Non funziona la put quindi per sicurezza non la implemento nel codice*/}
          <Link to={ `/updateBlogs/${ id }` }>
            <button className=" disabled  btn btn-success p-2">Modifica Post</button>
          </Link>
        </div>
        <div>
          <div>
            <button
              onClick={ handleToggleComments }
              className="btn btn-dark p-1 my-3"
            >
              { showComments ? 'Nascondi Commenti' : 'Mostra Commenti' }
            </button>
            { showComments && (
              <div>
                <ul>
                  { comments.commentBlogPost?.map((commentPost) => (
                    <li key={ commentPost._id }>
                      <p>{ commentPost.userName }</p>
                      <p>{ commentPost.content }</p>
                      { editingComment && editingComment._id === commentPost._id ? (
                        <form onSubmit={ handleUpdateComment }>
                          <input
                            type="text"
                            value={ editFormData.userName }
                            onChange={ (e) =>
                              setEditFormData({
                                ...editFormData,
                                userName: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            value={ editFormData.content }
                            onChange={ (e) =>
                              setEditFormData({
                                ...editFormData,
                                content: e.target.value,
                              })
                            }
                          />
                          <button type='submit' >Aggiorna</button>
                          <button onClick={ handleCancelEditComment } >Torna indietro</button>
                        </form>
                      ) : (
                        <div>
                          <button onClick={ () => handleEditComment(commentPost) }>
                            Modifica
                          </button>
                          <button onClick={ () => handleDeleteComment(commentPost._id) }>
                            Elimina
                          </button>
                        </div>
                      ) }
                    </li>
                  )) }
                </ul>
              </div>
            ) }
          </div>
        </div>
        { confirmationMessage && (
          <div className="bg-success text-light">
            { confirmationMessage }
          </div>
        ) }
        <div>
          <button
            onClick={ () => setIsAddingComment(!isAddingComment) }
            className="btn btn-primary p-2 my-2"
          >
            { isAddingComment ? "Annulla Commento" : "Aggiungi Commento" }
          </button>
          { isAddingComment && (
            <form onSubmit={ handleAddComment }>
              <input
  type="text"
  name='userName'
  placeholder="Nome utente"
  value={commentsData.userName}
  onChange={handleInputChange}
/>
<input
  type="text"
  name='content'
  placeholder="Contenuto"
  value={commentsData.content}
  onChange={handleInputChange}
/>
<input
  type="text"
  name='code'
  placeholder="Id dei blog"
  value={commentsData.code}
  onChange={handleInputChange}
/>

              <button type='submit'>Aggiungi un nuovo commento</button>
            </form>
          ) }


        </div>
      </div>
    </div>
  );
};

export default BlogsCard;

