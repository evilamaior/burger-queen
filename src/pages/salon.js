import React from "react";
import "./salon.css";
import menu from "../pages/menu";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

class Salon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bag: []
    };
  }

  // changeAmount = (event) => {
  //     this.setState({ quantidade: event.target.value })
  // }

  addToBag = item => {
    const { bag } = this.state;
    const itemIndex = bag.findIndex(bagItem => bagItem.item === item.item);
    if (itemIndex >= 0) {
      bag[itemIndex].quantidade++;
      this.setState({ bag });
    } else {
      item.quantidade = 1;
      this.setState({
        bag: [...bag, item]
      });
    }
  };

  removeToBag = item => {
    const { bag } = this.state;
    const itemIndex = bag.findIndex(bagItem => bagItem.item === item.item);
    if (itemIndex >= 0) {
      bag[itemIndex].quantidade--;
      this.setState({ bag });
    } else {
      bag.splice(itemIndex, 1);
      this.setState({
        bag: [bag[itemIndex].quantidade--]
      });
    }
  };

  sendToKitchen = () => {
    const user = firebase.auth().currentUser;
  };

  render() {
    const { bag } = this.state;
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

        <footer className="footer">
          <img className="img-footer" src="burger-queen.png" />
        </footer>
      </main>
    );
  }
}

export default Salon;

// export default withFirebaseAuth({
//     firebaseAppAuth,
// })(Salon);
