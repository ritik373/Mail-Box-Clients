import React from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { authCompose } from '../../store/authRedux';

function ReadMsg({to,subject,message}) {
    const dispatch=useDispatch();
    const onBackHandler=()=>{
        dispatch(authCompose.onCloseReadMsgHandler());

    }
    return (
        <div>
        <Card style={{ width: '58rem',height:'40rem' ,marginTop:'20px'}}>
        <Card.Body>
        <img src="" alt="not found..." />
          <Card.Title>{to}</Card.Title>
          <Card.Subtitle className="mb-5 text-muted">{subject}</Card.Subtitle>
          <Card.Text>
           {message}
          </Card.Text>
    
        </Card.Body>
      </Card>
      <button onClick={onBackHandler}>Back</button>

            
        </div>
    );
}

export default ReadMsg;