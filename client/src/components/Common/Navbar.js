
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { userIsAuthenticated } from '../Helpers/auth'
import { getTokenFromLocalStorage } from '../Helpers/auth'

const PageNavbar = () => {

  const navigate = useNavigate()

  const [profile, setProfile] = useState([])
  const [profileErrors, setProfileErrors] = useState(false)

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    navigate('/home')
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/user/', {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
        console.log(data)
        setProfile(data)
      } catch (error) {
        setProfileErrors(error)
      }
    }
    getUser()
  }, [])

  return ( 
    <Navbar>
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Brand as={Link} to="/jobs">Home</Navbar.Brand>
          </Nav>
          {userIsAuthenticated() ?
            <>
              <Nav.Link as={Link} to="/post">Post</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile<img className='navbar-pic' src={profile.profile_image} /> </Nav.Link>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
            </>
            :
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          }   
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar