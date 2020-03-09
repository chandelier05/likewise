import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth';

class Firebase extends Component {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

}

export Firebase;

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignInGoogle />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
        return this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
    }).then(() => {
                this.setState({ error: null });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Google</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);
const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);
export default SignInPage;

export { SignInForm, SignInGoogle };
