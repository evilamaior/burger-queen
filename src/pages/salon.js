import React from 'react';
import './salon.css';
import firebase from '../firebaseConfig';
// import withFirebaseAuth from 'react-with-firebase-auth';


class Salon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itens: [
                {
                    item: "Café americano",
                    valor: "5",
                    quantidade: "",
                    tipo: "manha",
                },
                {
                    item: "Café com leite",
                    valor: "7",
                    quantidade: "",
                    tipo: "manha",
                },
                {
                    item: "Sanduíche de presunto e queijo",
                    valor: "10",
                    quantidade: "",
                    tipo: "manha",
                },
                {
                    item: "Suco de fruta natural",
                    valor: "7",
                    quantidade: "",
                    tipo: "manha",
        
                },
                {
                    item: "Hambúrguer simples",
                    valor: "10",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Hambúrguer duplo",
                    valor: "15",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Batata frita",
                    valor: "5",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Anéis de cebola",
                    valor: "5",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Água 500ml",
                    valor: "5",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Água 750ml",
                    valor: "7",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Bebida gaseificada 500ml",
                    valor: "7",
                    quantidade: "",
                    tipo: "tarde",
                },
                {
                    item: "Bebida gaseificada 750ml",
                    valor: "10",
                    quantidade: "",
                    tipo: "tarde",
                }
            ]
        }
    }

    changeItem = (event) => {
        this.setState({ item: event.target.value })
    }

    changeValue = (event) => {
        this.setState({ valor: event.target.value })
    }

    changeAmount = (event) => {
        this.setState({ quantidade: event.target.value })
    } 

    render() {
        return (
            <main className="container">
                <div className="breakfast-menu">
                    <div className="pointer">Breakfast</div>
                        <ul>
                            {
                                this.state.itens.map( (item,i) => {
                                    if (item.tipo === "manha") {
                                        return (
                                            <li key={i}>
                                            <p>{item.item}</p>
                                            <p>{item.valor}</p>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                </div>
                
                <div className="menu">
                    <div className="pointer">Menu</div>
                        <ul>
                            {
                                this.state.itens.map( (item,i) => {
                                        if (item.tipo === "tarde") {
                                            return (
                                                <li key={i}>
                                                <p>{item.item}</p>
                                                <p>{item.valor}</p>
                                                </li>
                                            )
                                        }
                                    })
                            }
                        </ul>
                </div>

                <div className="total">
                    <div className="pointer">Resumo do pedido</div>
                </div>

                <footer className="footer">
                    <img className="img-footer" src="burger-queen.png" />
                </footer>
            </main>
        );
    }
}


export default Salon

// export default withFirebaseAuth({
//     firebaseAppAuth,
// })(Salon);