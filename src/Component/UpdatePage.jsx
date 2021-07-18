import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

function UpdatePage() {
    const email = useRef();
    const { resetPassword } = useAuth();
    const [Error, setError] = useState("");
    const [msz, setMsz] = useState("");
    const [Loading, setLoading] = useState(false);
    const history = useHistory();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await resetPassword(email.current.value);
            setMsz("Password Reset Email Sent. Check Your Inbox!");
            email.current.value = "";
            history.push("/");
        } catch {
            setError("Invalid Credentials!");
            email.current.value = "";       
        }
        setLoading(false);
    }

    return (
    <>
        {msz && <Alert variant="success">{msz}</Alert>}
        {Error && !Loading && <Alert variant="danger">{Error}</Alert>}
        <Card className="shadow border-dark">
            <Card.Body>
                <center>
                    <i className="fas fa-user-circle" style={{fontSize: "5rem"}}></i>
                </center>
                <Form onSubmit={submitHandler}>
                    <Form.Group id="email" className="py-2">
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control type="email" ref={email} />
                    </Form.Group>
                        <Button disabled={Loading} className="w-100 mt-2" type="submit">
                            RESET PASSWORD
                        </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to="/">LOGIN</Link>
                </div>
            </Card.Body>       
        </Card>
        <div className="w-100 text-center mt-2">
            Create An Account? {" "}
            <Link to="/signup">SIGNUP</Link>
        </div>
    </>
    )
}

export default UpdatePage
