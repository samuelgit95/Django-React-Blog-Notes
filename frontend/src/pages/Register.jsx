import Form from "../components/Form";
import Header from "../components/Header";
import "../styles/Login.css";

function Register() {
    return (
        <div className="register-container">
            <Header />
            <Form route="/api/user/register/" method="register" />
        </div>
    );
}

export default Register;
