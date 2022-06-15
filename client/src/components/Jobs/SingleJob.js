import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { Card, Button, Collapse, Col, Container, Row } from 'react-bootstrap'
import { getUserId, userIsOwner } from '../Helpers/auth'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'

import Jobs from './Jobs'

const SingleJob = () => { 

  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [errors, setErrors] = useState(false)

  const getSingleJob = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}/`)
      setJob(data)
      console.log(data)
    } catch (error) {
      setErrors(true)
    }
  }, [id])

  useEffect(() => {
    getSingleJob()
  }, [getSingleJob])

  const handleDelete = async () => { 
    try {
      await axios.delete(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/jobs/')
    } catch (error) { 
      console.log(error)
    }
  }

  const handleApply = async () => { 
    try { 
      await axios.post('/api/aplication/', {
        job: job.id,
        applied: true,
      },
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }
      )
      await getSingleJob()
    } catch (error) { 
      console.log(error)
    }
  }

  const handleDeleteAplication = async(aplicationId) => {
    try {
      await axios.delete(`/api/aplication/${aplicationId}/`, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      await getSingleJob()
    } catch (error) {
      console.log(error)
    }
  } 

  const userId = getUserId()
  const apply = job && job.aplication.find((aplication) => aplication.owner === userId)
  const userAplication = userId && !!apply

  function formatMoney(n) {
    return '$ ' + (Math.round(n * 100) / 100).toLocaleString()
  }
    
  return (
    <Container className="mt-4">
      <Row>
        { job ? 
          <>
            <Col className='job-col-single'>
              <Card className="mb-3 single-job-view">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title>
                        {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                      </Card.Title>
                      <Card.Subtitle className="text-muted mb-2">
                        {/* {new Date(job.created_at).toLocaleDateString()} */}
                        {formatMoney(job.salary)}
                      </Card.Subtitle>
                      {job.tags.map((tag) => (
                        <span className ="badge bg-secondary" style={{ marginRight: '10px' }} key={tag.name}>
                          {tag.name}
                        </span>
                      ))}
                      <span className = "badge bg-secondary">{job.job_location}</span>
                      <div style={{ wordBreak: 'break-all', marginTop: '10px' }}>
                        <a href='https://ro.indeed.com/jobs?q=part%20time&l=Bucure%C8%99ti%2C%20Ilfov&vjk=12474cd6a36758be' target='_blank' rel="noreferrer">https://ro.indeed.com/jobs?q=part%20time&l=Bucure%C8%99ti%2C%20Ilfov&vjk=12474cd6a36758be</a>
                      </div>
                    </div>
                    <img className="d-none d-md-block" height="50" alt={job.company} src='https://www.nms-mr.com/wp-content/uploads//2017/10/Mercedes-Benz-logo-2011-1920x1080.png' />
                  </div>
                  <Card.Text className='mt-4'> 
                    <p>{job.description}</p>
                    <div className='single-job-buttons' style={{ marginBottom: '10px' }}>
                      { userAplication ? (
                        <Button variant="danger" onClick={() => handleDeleteAplication(apply.id)}>
                          Unapply
                        </Button>
                      ) :
                        (
                          <Button variant="success" onClick={handleApply}>
                            Apply 
                          </Button>
                        )
                      }
                    </div>
                    <div className='single-job-buttons'>
                      <Link to="/jobs" className='btn btn-secondary'>Back to Jobs</Link>
                      {userIsOwner(job.owner.id) && (
                        <div>
                          <Button style={{ marginRight: '10px' }}  variant="light" onClick={handleDelete}>Delete Post</Button>
                          <Link className='btn btn-light' to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
                        </div>
                      )}
                    </div>
                  </Card.Text> 
                </Card.Body>
              </Card>
            </Col>
            <hr />
          </>
          :
          <h2 className='text-center'>
          Something went wrong! Please try again later!
          </h2>
        }
      </Row>
    </Container>
  )
}

export default SingleJob