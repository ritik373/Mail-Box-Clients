
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from './composemail.module.css'
import { authCompose } from '../../store/authRedux';
import { useDispatch } from 'react-redux';




function ComposeMail(props) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
    const dispatch = useDispatch();
    // console.log(editorState)

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    const EmailchangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const SubjectchangeHandler = (e) => {
        setSubject(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("form submit", subject, email)

        const sender = email.replace(/['@','.']/g, '');
        const sentemail=localStorage.getItem('email').replace(/['@','.']/g,'');


        await fetch(`https://mail-box-clients-default-rtdb.firebaseio.com/sentbox/${sender}.json`, {
            method: 'POST',
            body: JSON.stringify({
                to: email,
                subject: subject,
                message: editorState.getCurrentContent().getPlainText(),
                date: new Date().toDateString(),


            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                alert(res.error.message)
            } else {
                console.log('successfull');
                console.log(sender);
            }
        })



        await fetch(`https://mail-box-clients-default-rtdb.firebaseio.com/sentRecieverbox/${sentemail}.json`, {
            method: 'POST',
            body: JSON.stringify({
                to: email,
                subject: subject,
                message: editorState.getCurrentContent().getPlainText(),
                date: new Date().toDateString(),


            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                alert(res.error.message)
            } else {
                console.log('successfull');
                console.log(sender);
            }
        })


    }


    const onCloseComposeHandler = () => {
        dispatch(authCompose.onCloseComposeHandler());



    }



    return (
        <div className={classes.main} >
            <form onSubmit={onSubmitHandler} className={`${classes.To}`}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={EmailchangeHandler} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" value={subject} onChange={SubjectchangeHandler} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send
                </Button>

            </form>

            <div className={classes.editor}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                />
            </div>

            <Button variant="primary" type="submit" onClick={onCloseComposeHandler}>
                Close Compose
            </Button>






        </div>
    );
}

export default ComposeMail;