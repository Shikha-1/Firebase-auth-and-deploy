import React, {useState} from 'react'
import {Card, Alert, Button} from "react-bootstrap"
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

function MainPage() {
    const { logout } = useAuth();
    const [msz, setMsz] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const history = useHistory();

    async function clickHandler(e) {
        e.preventDefault();
        try {
            setError("")
            setLoading(true)
            await logout();
            setMsz("Logged Out Successfully!")
            history.push("/");
        } catch (err) {
            alert(err)
            setError("Something Went Wrong!");
        }
        setLoading(false)
    }

    return (
        <>
        {msz && <Alert variant="success">{msz}</Alert>}
        {Error && !Loading && <Alert variant="danger">{Error}</Alert>}
            <Card className="shadow text-center border-dark">
                <Card.Title className="mt-4">
                    WELCOME TO MAIN CONTENT
                </Card.Title>
                <Card.Body>
                    <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
                        facere, numquam vitae placeat consequatur corrupti officia
                        quibusdam. Blanditiis doloremque nemo ex facilis neque. A sint ipsam
                        earum nemo omnis et.
                    </Card.Text>
                    <Card.Footer>
                        <Link onClick={clickHandler} to="/">
                        <Button  disabled={Loading} className="w-100 mt-2" type="submit">
                            LOG OUT
                        </Button>
                        </Link>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/updateProfile">UPDATE CREDENTIALS</Link>
            </div>
        </>
    )
}

export default MainPage
