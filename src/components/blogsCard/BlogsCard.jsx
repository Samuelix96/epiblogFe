import React from 'react'
import './blog.css'

const BlogsCard = ({
  cover,
  title,
  author,
  name,
  unit,
  value,
  content,
  readTime,
  avatar
  
}) => {
  return (
    <div>
      <div className='container'>
        <div className='card'>
          <img src={cover} className='top-image' />
          <img src={avatar} className='card-image' />
          <h2 className='card-name'>{name}</h2>
          <p className='card-job'>{title}</p>
          <p className='card-info'>{content}</p>
          <a href='' className='btn'>
            Contact
          </a>
          <ul className='card-social'>
            <li>
              <a href=''>
                <i className='fab fa-facebook-square' />
              </a>
            </li>
            <li>
              <a href=''>
                <i className='fab fa-twitter-square' />
              </a>
            </li>
            <li>
              <a href=''>
                <i className='fab fa-instagram' />
              </a>
            </li>
            <li>
              <a href=''>
                <i className='fab fa-youtube' />
              </a>
            </li>
          </ul>
          <p>{value} {unit} </p>

        </div>
      </div>
    </div>
  )
}

export default BlogsCard
