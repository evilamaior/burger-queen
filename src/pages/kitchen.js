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
        orders: [],
      };
    }
    componentDidMount() {
      database.collection("orders").get()
      .then((querySnapshot) => {    
        const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
        this.setState({ orders: data })
      })
    }


    render() {
        return (
          <div>
            {
              this.state.orders.map((order, i ) => {
                return (
                  <div key={i}>
                    <h1>nome do funcionario: {order.nome}</h1>
                    <h1>nome do cliente: {order.cliente}</h1>
                    <h2>Itens do pedido</h2>
                    {
                      order.bag.map((item, i) => {
                        return <div key={i}>{item.item}</div>
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        );
    }
}

export default withFirebaseAuth({
    firebaseAppAuth,
})(Kitchen);