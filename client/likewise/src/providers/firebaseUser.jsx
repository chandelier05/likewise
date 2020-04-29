import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../utils/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null
  };
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const firebaseUser = await generateUserDocument(userAuth);
      this.setState({ user: firebaseUser });
    });
  };
  render() {
    if (!this.state.user) {
      return (
        <UserContext.Provider value={"loading"}>
          {this.props.children}
        </UserContext.Provider>
      )
    } else {
      return (
        <UserContext.Provider value={this.state.user}>
          {this.props.children}
        </UserContext.Provider>
      );
    }
  }
}
export default UserProvider;