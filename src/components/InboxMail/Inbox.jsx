import React, { useEffect, useState } from 'react';

import classes from './inbox.module.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { authCompose } from '../../store/authRedux';
import ComposeMail from '../composeMail/ComposeMail';
import ReadMsg from './ReadMsg';
import { useNavigate } from 'react-router-dom';

function Inbox(props) {
    const showCompose = useSelector(state => state.compose.showCompose);
    const showReadMsg = useSelector(state => state.compose.showReadMsg);
    const [reRender, setreRender] = useState(false);
    const [showDot, setShowDot] = useState(true);
    // const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [inboxItem, setInboxItem] = useState([]);
    const [readitem, setReadItem] = useState({
        to: '',
        subject: '',
        message: '',
    })
    const emailReplace = localStorage.getItem('email').replace(/['@','.']/g, '');
    console.log(emailReplace);


    const userMailItem = [];

    useEffect(() => {

        fetch(`https://mail-box-clients-default-rtdb.firebaseio.com/sentbox/${emailReplace}.json`, {
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
                        userMailItem.push({
                            id: key,
                            to: responce[key].to,
                            subject: responce[key].subject,
                            message: responce[key].message,
                            time: responce[key].date



                        })
                        setInboxItem(userMailItem)
                        setreRender(false)
                    }
                })
            }
        })
    }, [showCompose, reRender])
    console.log(showCompose);
    const onComposeHandler = () => {
        console.log("clicked on compose");
        dispatch(authCompose.onOpenComposeHandler())
        console.log(showCompose);

    }
    const onReadMsgHandler = (item) => {
        dispatch(authCompose.onOpenReadMsgHandler())
        setReadItem({
            to: item.to,
            subject: item.subject,
            message: item.message,
        })
        setShowDot(false);


    }
    const onDeleteHandler = (id) => {
        console.log(id)
        fetch(`https://mail-box-clients-default-rtdb.firebaseio.com/sentbox/${emailReplace}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setreRender(true)

    }

    const onSentHandler = () => {
        console.log("click on sent")
        navigate('/inbox/sent', { replace: true })

    }
    const onLogOutHandler = () => {
        dispatch(authCompose.onLogoutHander())
        navigate('/', { replace: true })
    }

    // const onChangeHandler = (e) => {
    //     console.log(e.target.value)
    //     inboxItem = inboxItem.filter((item,index) => {
    //         console.log((item.to))
    //         return item.subject!== e.target.value;
    //     })

    //     console.log(inboxItem)

    // }


    // console.log(new Date().toLocaleString())


    return (
        <div>

            <div className={classes.topsearch}>

                <h3>Yohoo/Mail</h3>
                <h3><input type="serach" placeholder='Find Messages , Photos ,Documents ' className={classes.input}  /></h3>
                <h3> <img src="https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=
                80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=a2f8c40e39b8dfee1534eb32acfa6bc7" alt="image loading.." /></h3>
                <h3>{emailReplace}</h3>
                <h3>Home</h3>
                <button onClick={onLogOutHandler}>LogOut</button>
            </div>

            <div className={classes.sideNavbar}>

                <Row>
                    <Col>

                        <button onClick={onComposeHandler}>Compose</button>

                        <span>  <h3>Inbox {inboxItem.length}  </h3> </span>
                        <h3>unread</h3>
                        <h3>starred</h3>
                        <h3>Draft</h3>
                        <h3 onClick={onSentHandler}>Sent</h3>
                        <h3>Archive</h3>
                        <h3>Spam</h3>


                    </Col>
                    <Col xs={8} style={{ backgroundColor: 'white', height: '100vh' }}>
                        {!showCompose && <ListGroup as="l" numbered>

                            {inboxItem.map((item, index) => {

                                return (<div>

                                    <div key={item.id} onClick={onReadMsgHandler.bind(null, item)}>


                                        {!showReadMsg && <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >

                                            <input type="checkbox" name="" id="" style={{ marginTop: '10px' }} />
                                            {showDot && <div className={classes.dot}></div>}
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.subject}</div>

                                            </div>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.message}</div>

                                            </div>
                                            <Badge bg="primary" pill>
                                                {item.time}
                                            </Badge>


                                        </ListGroup.Item>}




                                    </div>
                                    {!showReadMsg && <button onClick={onDeleteHandler.bind(null, item.id)}>Delete Mail</button>}
                                </div>)

                            })}
                        </ListGroup>}
                        {showReadMsg && <ReadMsg
                            to={readitem.to}
                            subject={readitem.subject}
                            message={readitem.message}

                        />}

                        {showCompose && <ComposeMail />}





                    </Col>
                    <Col style={{ backgroundColor: 'red' }}>setting</Col>
                </Row>



            </div>







        </div>
    );
}

export default Inbox;