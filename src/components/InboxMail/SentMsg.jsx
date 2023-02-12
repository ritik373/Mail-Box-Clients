import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

function SentMsg(props) {
   const navigate=useNavigate()
   const [reRender,setreRender]=useState(false)
    const [inboxItem, setInboxItem] = useState([]);
    const sentemail = localStorage.getItem('email').replace(/['@','.']/g, '');
    const sentUserData = [];

    useEffect(() => {

        fetch(`https://mail-box-clients-default-rtdb.firebaseio.com/sentRecieverbox/${sentemail}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                alert(res.error.message)
            } else {
                return res.json().then((responce) => {
                    console.log(responce)
                    for (const key in responce) {
                        // console.log(responce[key].message)
                        sentUserData.push({
                            id: key,
                            to: responce[key].to,
                            subject: responce[key].subject,
                            message: responce[key].message,
                            time: responce[key].date
                        })
                        setInboxItem(sentUserData)
                        setreRender(false)


                    }
                })
            }
        })
    }, [reRender])

    const onBackHandler=()=>{
        navigate('/inbox',{replace:true})

    }
    const onDeleteHandler=(id)=>{
        console.log(id)
        fetch(`https://mail-box-clients-default-rtdb.firebaseio.com/sentRecieverbox/${sentemail}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setreRender(true)
    
      }
    return (
        <div>
        <button onClick={onBackHandler}>Back</button>
            <Row>
             
                <Col xs={10} style={{ backgroundColor: 'white', height: '100vh' }}>
                    <ListGroup as="l" numbered>

                        {inboxItem.map((item, index) => {

                            return (<div>

                                <div key={item.id} >


                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >

                                        <input type="checkbox" name="" id="" style={{ marginTop: '10px' }} />
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold">{item.to}</div>

                                    </div>
                                      
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.subject}</div>

                                        </div>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.message}</div>

                                        </div>
                                        <Badge bg="primary" pill>
                                            {item.time}
                                        </Badge>
                                        <button onClick={onDeleteHandler.bind(null,item.id)}>Delete Mail</button>


                                    </ListGroup.Item>




                                </div>

                            </div>)

                        })}
                    </ListGroup>






                </Col>

            </Row>



        </div>
    );
}

export default SentMsg;