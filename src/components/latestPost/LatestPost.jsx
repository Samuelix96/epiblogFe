import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  allBlogs,
  getBlogPostsFromApi,
  getAllTotalBlogs,
  searchBlogs,
  currentPageBlogs,
  setCurrentPages,
} from '../../reducers/blogsReducer';
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { Container, Col, Row } from 'react-bootstrap'
import BlogsCard from '../blogsCard/BlogsCard'
import { nanoid } from 'nanoid'
import { useSession } from '../../middlewares/ProtectedRoute';


const LatestPost = () => {
  const dispatch = useDispatch()
  const currentPages = useSelector(currentPageBlogs)
  const blogPosts = useSelector(allBlogs)
  const searchTerm = useSelector(searchBlogs);

  const handlePageChange = (page) => {
    //! DEVI SEMPRE DISPACCIARE LO STATE  
    dispatch(setCurrentPages(page));
  };



  useEffect(() => {
    if (searchTerm) {
      // Se è presente un termine di ricerca, effettua una richiesta API per la ricerca
      dispatch(getAllTotalBlogs(searchTerm));
    } else {
      // Altrimenti, carica i dati normali della pagina corrente
      dispatch(getBlogPostsFromApi(currentPages));
    }
  }, [dispatch, currentPages, searchTerm]);



  return (
    <Container>
      <Row>
        <Col className=" d-flex justify-content-between  gap-3 ">
          {blogPosts &&
            blogPosts.blog?.map((blogs) => {
              return (
                <BlogsCard
                  key={nanoid()}
                  cover={blogs.cover}
                  title={blogs.title}
                  content={blogs.content}
                  category={blogs.category}
                  value={blogs.readTime.value}
                  unit={blogs.readTime.unit}
                  name={blogs.author.name}
                  avatar={blogs.author.avatar}
                />
              )
            })}
        </Col>
        <ResponsivePagination
      current={currentPages}
      total={blogPosts && blogPosts.totalPages}
      onPageChange={handlePageChange}
    />
      </Row>
    </Container>
  )
}

export default LatestPost
