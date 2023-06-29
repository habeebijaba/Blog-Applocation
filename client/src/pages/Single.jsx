import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import Avatar from '../images/avatar1.png'
import Badge from '../images/quality.png'

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
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/posts/${postId}`).then(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            navigate("/")
          })
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='single' >
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          <img className='profileimg' src={Avatar} alt="" />
          <div className="info">
            <span>{post?.author?.username}  <img className='badge' src={Badge} alt="" /> </span>
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
        <p>{post.desc}</p>
      </div>
      <Menu postId={postId} />
    </div>
  )
}

export default Single
