import React from "react";
import "./create-account.css";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";
import { Link } from "react-router-dom";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      senha: "",
      tipo: "cozinha"
    };
  }

  changeName = event => {
    this.setState({ nome: event.target.value });
  };

  changeEmail = event => {
    this.setState({ email: event.target.value });
  };

  changePassword = event => {
    this.setState({ senha: event.target.value });
  };

  changePosition = event => {
    this.setState({ tipo: event.target.value });
  };

  singUp = event => {
    event.preventDefault();
    const name = this.state.nome;
    const email = this.state.email;
    const password = this.state.senha;
    const type = this.state.tipo;
    this.props.createUserWithEmailAndPassword(email, password)
      .then(response => {
        const id = response.user.uid;
        database.doc(`users/${id}`).set({ nome: name, email: email, tipo: type });
      })
      .then(() => {
        this.props.history.push(`/${this.state.tipo}`);
      });
  };

  render() {
    return (
      <main className="container">
        <header className="logo">
          <h1 className="txt-logo">Burger Queen</h1>
        </header>
        <form className="container-form">
          <input className="input-style" placeholder="nome" 
            value={this.state.nome}
            onChange={this.changeName}
          />
          <input className="input-style" placeholder="email"
            value={this.state.email}
            onChange={this.changeEmail}
          />
          <input className="input-style" type="password" placeholder="senha"
            value={this.state.senha}
            onChange={this.changePassword}
          />
          <select className="local-type" onChange={this.changePosition}>
            <option value="cozinha">Cozinha</option>
            <option value="salao">Salão</option>
          </select>
          <button className="btn-style" onClick={this.singUp}> 
            Criar conta
          </button>
          <Link className="sing-in" to="/">
            Já tem uma conta?
          </Link>
        </form>
        <footer className="footer">
          <img className="img-footer" src="burger-queen.png" />
        </footer>
      </main>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth
})(CreateAccount);
