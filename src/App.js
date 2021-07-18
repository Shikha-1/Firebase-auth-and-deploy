import './App.css';
import { Route} from "react-router-dom"
import LoginPage from './Component/LoginPage';
import SignUpPage from './Component/SignupPage';
import UpdatePage from './Component/UpdatePage';
import MainPage from './Component/MainPage';
import UpdateProfile from './Component/UpdateProfile';
import { Container } from 'react-bootstrap';
import { AuthProvider} from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Route
            exact
            path="/signup"
            render={(props) => <SignUpPage {...props} />}
          ></Route>
          <Route
            exact
            path="/"
            render={(props) => <LoginPage {...props} />}
          ></Route>
          <Route
            exact
            path="/update"
            render={(props) => <UpdatePage {...props} />}
          ></Route>
          <Route
            exact
            path="/updateProfile"
            render={(props) => <UpdateProfile {...props} />}
          ></Route>
          <Route
            exact
            path="/main"
            render={(props) => <MainPage {...props} />}
          ></Route>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
