import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

function UpdateProfile() {
    const email = useRef();
    const password = useRef();
    const cpassword = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [msz, setMsz] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const history = useHistory();

    function submitHandler(e) {
        e.preventDefault();
        if (password.current.value !== cpassword.current.value) {
            password.current.value = "";         
            cpassword.current.value = "";
            return setError("Invalid Credentials!")
        } else {
            const promises = [];
            if (email.current.value !== currentUser.email) {
                promises.push(updateEmail(email.current.value));
            }
            if (password.current.value) {
                promises.push(updatePassword(password.current.value));
            }
            Promise.all(promises).then(() => {
                email.current.value = "";
                password.current.value = "";         
                cpassword.current.value = "";
                setMsz("Profile Updated Successfully!")
                history.push("/");
            }).catch(() => {
                setError("Something Went Wrong!")
                email.current.value = "";
                password.current.value = "";         
                cpassword.current.value = "";
            }).finally(() => {
                setLoading(false)
            });
        }
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
                            <Form.Control type="email" ref={email} defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password" className="py-2">
                        <Form.Label>PASSWORD</Form.Label>
                        <Form.Control type="password" ref={password} autoComplete="false" placeholder="Leave blank to keep the same!"/>
                    </Form.Group>
                    <Form.Group id="cpassword" className="py-2">
                        <Form.Label>CONFIRM PASSWORD</Form.Label>
                        <Form.Control type="password" ref={cpassword} autoComplete="false"  placeholder="Leave blank to keep the same!"/>
                    </Form.Group>
                    <Button disabled={Loading} className="w-100 mt-2" type="submit">
                       UPDATE CREDENTIALS
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

export default UpdateProfile