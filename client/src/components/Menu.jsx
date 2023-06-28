import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Menu = () => {


    const [posts,setPosts]=useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('/posts')
          setPosts(res.data.slice(0,5))
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }, [])

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post)=>(
            <div className="post" key={post._id}>
        <img src={`../upload/${post?.img}`} alt="" />

                <h2>{post.title}</h2>
              <Link className='link' to={`/post/${post._id}`}>

                <button  >Read More</button>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Menu
