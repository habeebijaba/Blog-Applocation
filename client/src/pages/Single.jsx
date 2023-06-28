import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import Menu from '../components/Menu'
import { AuthContext } from '../context/authContext'
import Swal from "sweetalert2"


const Single = () => {



  const [post, setPost] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const postId = location.pathname.split("/")[2]
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
        console.log(post, "tis is post");
        console.log(post.author.username, "this is username");
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async () => {

    

    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className='single' >
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          <img className='profileimg' src="https://images.pexels.com/photos/9122851/pexels-photo-9122851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className="info">
            <span>{post?.author?.username}</span>
            <p>posted {moment(post.createdAt).fromNow()}</p>
          </div>



          {currentUser?.username === post?.author?.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post} >
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h1>{post.title} </h1>

        {post.desc}

      </div>

      <Menu />

    </div>
  )
}

export default Single
