import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from "nanoid"
import {allBlogs,searchBlogs,currentPageBlogs,setCurrentPages,} from '../../reducers/blogsReducer';
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { Container, Col, Row } from 'react-bootstrap'
import BlogsCard from '../blogsCard/BlogsCard';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import "./main.css"

const LatestPost = () =>
{
  const dispatch = useDispatch()
  const currentPages = useSelector(currentPageBlogs)
  
  
  
  const blogPosts = useSelector(allBlogs)
  console.log(blogPosts)


  const handlePageChange = (value) =>
  {
    //! DEVI SEMPRE DISPACCIARE LO STATE  
    dispatch(setCurrentPages(value));
  }

  

  return (
    <Container   className='main-container-post'>
      <div className='d-flex'>
        <Button className="btn btn-danger  ">
          <Link className=' link-offset-2 link-underline link-underline-opacity-0 text-light' to={ '/newblogs' }>
            AGGIUNGI UN NUOVO POST
          </Link>
        </Button>
      </div>
      <Row>

        <Col  className=" respo-card d-flex justify-content-center gap-2 my-5 ">
          { blogPosts &&
            blogPosts.blog?.map((blogs) =>
            {
              return (
                <BlogsCard

                  key={ nanoid() }
                  id={ blogs._id }
                  cover={ blogs.cover }
                  title={ blogs.title }
                  content={ blogs.content }
                  category={ blogs.category }
                  readTime={ blogs.readTime }
                  author={ blogs.author.firstName }
                />
              )
            }) }
        </Col>
       
        <ResponsivePagination
          extraClassName="mb-3 d-flex justify-content-center "
          current={ currentPages }
          total={ blogPosts && blogPosts.totalPages }
          onPageChange={ handlePageChange }
        />
      </Row>

    </Container>
  )
}

export default LatestPost
