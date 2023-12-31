import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBlogPostsFromApi,
  currentPageBlogs,
  getAllTotalBlogs,
  setSearchTerm,
  searchBlogs
} from '../../reducers/blogsReducer'
import './navbar.css'


const Navigation = () => {


  const searchTerm = useSelector(searchBlogs)
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageBlogs)
  const [searchValue, setSearchValue] = useState('');
  const [isSearchReset, setIsSearchReset] = useState(false);

  console.log(searchValue)
  
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setIsSearchReset(true);
    } else {
      setIsSearchReset(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchReset(false);
    dispatch(setSearchTerm(searchValue));
  };

  useEffect(() => {
    if (!isSearchReset) {
      if (!searchTerm) {
        dispatch(getBlogPostsFromApi(currentPage));
      } else {
        dispatch(getAllTotalBlogs(searchTerm));
      }
    } else {
      dispatch(getBlogPostsFromApi(currentPage));
    }
  }, [dispatch, currentPage, searchTerm, isSearchReset]);

  return (
    <Navbar className='navbar navbar-expand-lg nav-bg'>
      <Container>
        <Navbar.Brand className='d-flex align-items-center ' href='#home'>
          <img
            alt='Four season'
            src='https://media.gettyimages.com/id/1064580550/it/foto/oak-tree-in-meadow-through-the-seasons.jpg?s=612x612&w=0&k=20&c=ZtIj1nSmjsZYH9568l_mgOCr0eg5zudXMb42T7E9YiQ='
            width='30'
            height='30'
            className='d-inline-block rounded-5 mx-4'
          />
          <p className='fs-3 mt-3'>Find your place</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link className='fs-4 mx-5' href='/'>
              Home
            </Nav.Link>
            <Nav.Link className='fs-4' href='#link'>
              Link
            </Nav.Link>
          </Nav>
          <Form className='d-flex' onSubmit={handleSearchSubmit}>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              name= "searchValue"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <Button type="submit" className='btn-secondary' >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
