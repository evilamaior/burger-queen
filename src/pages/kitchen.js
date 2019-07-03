import React from 'react';
import './kitchen.css';
import menu from "../pages/menu";
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bag: [],
        cliente: "",
        nome: "",
        status: ""
      };
    }

    getBag = () => {
        database.collection("orders").doc().get()
          .then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
            this.setState({ bag:data })
          })
    }

    getCliente = () => {
        const user = firebase.auth().currentUser;
        database.collection("orders").doc(user.uid).get()
          .then(response => {
            const data = response.data();
            const cliente = data.cliente;
            this.setState({ cliente })
          });
    }

    render() {
        this.getBag();
        return (
        <main className="container">
            <div className="menu">
                <div className="pointer">Pedidos</div>
                <ul className="container-menu">
                  {menu.map((item, i) => {
                    return (
                    <li key={i}>
                      <p>{item.bag}</p>
                      <p>{item.cliente}</p>
                      <p>{item.nome}</p>
                    </li>
                    );
                  })
                  }
                </ul>
            </div>

            <footer className="footer">
                <img className="img-footer" src="burger-queen.png" />
            </footer>
        </main>
        );
    }
}

export default withFirebaseAuth({
    firebaseAppAuth,
})(Kitchen);