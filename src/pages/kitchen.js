import React from 'react';
import './kitchen.css';
import firebase from '../firebaseConfig';
// import withFirebaseAuth from 'react-with-firebase-auth';

function Kitchen() {
    return (
        <main className="container">
            <header className="logo">
                <h1 className="txt-logo">Burger Queen</h1>
            </header>
            <footer className="footer">
                <img className="img-footer" src="burger-queen.png" />
            </footer>
        </main>
    );
}

export default Kitchen


// export default withFirebaseAuth({
//     firebaseAppAuth,
// })(Kitchen);