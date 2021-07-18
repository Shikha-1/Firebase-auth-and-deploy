import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router-dom"

export default function SignUpPage() {
    const email = useRef();
    const password = useRef();
    const cpassword = useRef();
    const { signup } = useAuth();
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const history = useHistory();

    async function submitHandler(e) {
        e.preventDefault();
        if (password.current.value !== cpassword.current.value) {
            password.current.value = "";         
            cpassword.current.value = "";
            return setError("Invalid Credentials!")
        } else {
            try {
                setError("")
                setLoading(true)
                await signup(email.current.value, password.current.value);
                email.current.value = "";
                password.current.value = "";         
                cpassword.current.value = "";
                history.push("/")
            } catch {
                setError("Something Went Wrong!")
                email.current.value = "";
                password.current.value = "";         
                cpassword.current.value = "";
            }
        setLoading(false)
        }
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
                            <Form.Control type="password" ref={password} autoComplete="false" required />
                        </Form.Group>
                        <Form.Group id="cpassword" className="py-2">
                            <Form.Label>CONFIRM PASSWORD</Form.Label>
                            <Form.Control type="password" ref={cpassword} autoComplete="false" required />
                        </Form.Group>
                        <Button disabled={Loading} className="w-100 mt-2" type="submit">
                            SIGNUP
                        </Button>
                    </Form>
                </Card.Body>
                 <div className="w-100 text-center mb-2">
                    <Link to="/updateProfile">UPDATE CREDENTIALS</Link>
                </div>
            </Card>
            <div className="w-100 text-center mt-2">
                Already Have An Account? {" "}
                <Link to="/">LOGIN</Link>
            </div>
        </>
    )
}
