import React from 'react';
import './login.css';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import {Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            senha: "",
            tipo: "cozinha"
        };
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ senha: event.target.value })
    }

    singIn = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.senha;
        this.props.signInWithEmailAndPassword(email, password)
            .then(response => {
                const id = response.user.uid;
                database.collection("users").doc(id).get()
                    .then(response => {
                        const data = response.data();
                        this.props.history.push(`/${data.tipo}`);
                    });
            })
    };

    render() {
        return (
            <main className="container">
                <header className="logo">
                    <h1 className="txt-logo">Burger Queen</h1>
                </header>
                <form className="container-form">
                    <input className="input-style" placeholder="email" value={this.state.email} onChange={this.changeEmail}></input>
                    <input className="input-style" type="password" placeholder="senha" value={this.state.senha} onChange={this.changePassword}></input>
                    <button className="btn-style" onClick={this.singIn}>Entrar</button>
                    <Link className="sing-in" to="/create-account">Ainda não tem uma conta?</Link>
                </form>
                <footer className="footer">
                    <img className="img-footer" src="burger-queen.png" />
                </footer>
            </main>
        );
    }
}


export default withFirebaseAuth({
    firebaseAppAuth,
})(Login);