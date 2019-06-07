import React from 'react';
import './salon.css';
import firebase from '../firebaseConfig';
// import withFirebaseAuth from 'react-with-firebase-auth';

function Salon() {
    return (
        <main className="container">
            <header className="logo">
                <h1 className="txt-logo">Burger Queen</h1>
            </header>

            <footer className="footer">
                <img className="img-footer" src="burger-queen.png" />
            </footer>
        </main>
    )
}

export default Salon

// export default withFirebaseAuth({
//     firebaseAppAuth,
// })(Salon);