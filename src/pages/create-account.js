import React from 'react';
import './create-account.css';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    singUp = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.senha;
        const type = this.state.tipo;
        this.props.createUserWithEmailAndPassword(email, password)
        .then(response => {
            const id = response.user.uid;
            database.doc(`users/${id}`).set({email: email, tipo: type});
        });
    }

    changePosition = (event) => {
        this.setState({ tipo: event.target.value })
    }

    render() {
        return (
            <main className="container">
                <header className="logo">
                    <h1 className="txt-logo">Burger Queen</h1>
                </header>
                <form className="container-form">
                    <input className="input-style" placeholder="email" value={this.state.email} onChange={this.changeEmail}></input>
                    <input className="input-style" type="password" placeholder="senha" value={this.state.senha} onChange={this.changePassword}></input>
                    <select className="local-type" onChange={this.changePosition}>
                        <option value="cozinha">Cozinha</option>
                        <option value="salao">Salão</option>
                    </select>
                    <button className="btn-style" onClick={this.singUp}>Criar conta</button>
                    <a className="sing-in"href="#">Já tem uma conta?</a>
                </form>
                <footer className="img-footer">
                    <img src="burger-queen.png" />
                </footer>
            </main>
        );
    }
}


export default withFirebaseAuth({
    firebaseAppAuth,
})(CreateAccount);