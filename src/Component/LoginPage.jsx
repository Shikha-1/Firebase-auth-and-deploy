import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

function LoginPage() {
    const email = useRef();
    const password = useRef();
    const { login } = useAuth();
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const history = useHistory();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(email.current.value, password.current.value);
            email.current.value = "";
            password.current.value = "";
            history.push("/main");
        } catch {
            setError("Invalid Credentials!");
            email.current.value = "";
            password.current.value = "";
            history.push("/signup")
        }
        setLoading(false);
    }

    return (
        <>
            {Error && !Loading && <Alert variant="danger">{Error}</Alert>}
            <Card className="shadow border-dark">
                <Card.Body>
                    <center>
                        <i className="fas fa-user-circle" style={{fontSize: "5rem"}}></i>
                    </center>
                    <Form onSubmit={submitHandler}>
                        <Form.Group id="email" className="py-2">
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control type="email" ref={email} required />
                        </Form.Group>
                        <Form.Group id="password" className="py-2">
                            <Form.Label>PASSWORD</Form.Label>
                            <Form.Control type="password" ref={password} required />
                        </Form.Group>
                        <Button  disabled={Loading} className="w-100 mt-2" type="submit">
                            LOGIN
                        </Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mb-2">
                    <Link to="/update"> FORGOT PASSWORD</Link>
                </div>
            </Card>
            <div className="w-100 text-center mt-2">
                Create An Account? {" "}
                <Link to="/signup">SIGNUP</Link>
            </div>
        </>
    )
}

export default LoginPage
