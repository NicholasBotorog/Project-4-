
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { userIsAuthenticated } from '../helpers/auth'
import { getTokenFromLocalStorage } from '../helpers/auth'

const PageNavbar = () => {

  const navigate = useNavigate()

  const [profile, setProfile] = useState([])
  const [profileErrors, setProfileErrors] = useState(false)

  const handleLogOut = () => {
    window.localStorage.removeItem('token')
    navigate('/')
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
            {userIsAuthenticated() ?
              <Navbar.Brand as={Link} to="/jobs"> <img className='navbar-pic' style= {{ width: '30px' }} src={'https://www.kindpng.com/picc/m/206-2069779_generic-company-logo-clipart-best-transparent-background-generic.png'} /> Home</Navbar.Brand>
              :
              <img className='navbar-pic' style= {{ width: '30px' }} src='https://www.kindpng.com/picc/m/206-2069779_generic-company-logo-clipart-best-transparent-background-generic.png' />} 
          </Nav>
          {userIsAuthenticated() ?
            <>
              <Nav.Link style={{ color: 'black' }} as={Link} to="/post">Post</Nav.Link>
              <Nav.Link style={{ color: 'black' }} as={Link} to="/profile">{profile.first_name}<img style={{ marginLeft: '5px' }} className='navbar-pic' src={profile.profile_image} alt={profile.username} /> </Nav.Link>
              <Nav.Link style={{ color: 'black' }} onClick={handleLogOut}>Logout</Nav.Link>
            </>
            :
            <>
              <Nav.Link style={{ color: 'black' }} as={Link} to="/register">Register</Nav.Link>
              <Nav.Link style={{ color: 'black' }} as={Link} to="/login">Login</Nav.Link>
            </>
          }   
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar