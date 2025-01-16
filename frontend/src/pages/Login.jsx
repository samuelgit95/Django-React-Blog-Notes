import Form from "../components/Form";
import Header from "../components/Header";
import "../styles/Login.css";

function Login() {
    return (
        <div className="login-container">
            <Header />
            <Form route="/api/token/" method="login" />
        </div>
    );
}

export default Login;
