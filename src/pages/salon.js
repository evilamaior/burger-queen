import React from "react";
import "./salon.css";
import menu from "../pages/menu";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Salon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bag: [],
      total: 0,
      cliente: "",
      nome: ""
    };
  }

  addToBag = item => {
    const { bag } = this.state;
    const itemIndex = bag.findIndex(bagItem => bagItem.item === item.item);
    if (itemIndex >= 0) {
      bag[itemIndex].quantidade++;    
      const total = bag.reduce((acc, cur) => {
            return acc + (cur.quantidade * cur.valor)
      },0);
      this.setState({ bag, total });
    } else {
      item.quantidade = 1;
      const newBag = [...bag, item]
      const total = newBag.reduce((acc, cur) => {
        return acc + (cur.quantidade * cur.valor)
      },0);
      this.setState({
        bag: newBag, total
      });
    }
  };

  removeToBag = item => {
    const { bag } = this.state;
    const itemIndex = bag.findIndex(bagItem => bagItem.item === item.item);
    if (bag[itemIndex].quantidade > 1) {
      bag[itemIndex].quantidade--;
      this.setState({ bag });
    } else {
      bag.splice(itemIndex, 1);
      this.setState({
        bag
      });
    }
  };

  addCustomer = event => {
    this.setState({ cliente: event.target.value });
  }

  getName = () => {
    const user = firebase.auth().currentUser;
    database.collection("users").doc(user.uid).get()
      .then(response => {
        const data = response.data();
        const nome = data.nome;
        this.setState({ nome })
      });
  }

  sendToKitchen = () => {
    database.collection("orders").add({ bag: this.state.bag, total: this.state.total, cliente: this.state.cliente, nome: this.state.nome});
  };

  render() {
    const { bag } = this.state;
    this.getName();

    return (
      <main className="container">
        <div className="breakfast-menu">
          <div className="pointer">Breakfast</div>
          <ul className="container-menu">
            {menu.map((item, i) => {
              if (item.tipo === "manha") {
                return (
                  <li key={i}>
                    <p className="item">
                      <i
                        className="fas fa-plus"
                        onClick={() => {
                          this.addToBag(item);
                        }}
                      />
                      {item.item}-
                    </p>
                    <p className="value">R$ {item.valor}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="menu">
          <div className="pointer">Menu</div>
          <ul className="container-menu">
            {menu.map((item, i) => {
              if (item.tipo === "tarde") {
                return (
                  <li key={i}>
                    <p className="item">
                      <i
                        className="fas fa-plus"
                        onClick={() => {
                          this.addToBag(item);
                        }}
                      />
                      {item.item}-
                    </p>
                    <p className="value">R$ {item.valor}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="total">
          <div className="pointer">Resumo do pedido</div>
          <ul>
            {bag.map((item, i) => {
              return (
                <li key={i}>
                  <p className="amount">
                    <i
                      className="fas fa-minus"
                      onClick={() => {
                        this.removeToBag(item);
                      }}
                    />
                    {item.quantidade}
                  </p>
                  <p className="item">{item.item}-</p>
                  <p className="value">R$ {item.valor}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="total-container">
          <hr className="line" />
          <p className="total">Total</p>
          {this.state.total}
        </div>

        <div className="input-container">
          <input className="input-style" placeholder="nome do cliente" value={this.state.cliente}
          onChange={this.addCustomer}/>
        </div>
        

        <div className="btn-container">
          <button className="btn-style"
            onClick={this.sendToKitchen}> 
            Enviar para cozinha
          </button>    
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
})(Salon);
