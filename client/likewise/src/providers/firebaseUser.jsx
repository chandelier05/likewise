import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../utils/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    loading: true
  };
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const firebaseUser = await generateUserDocument(userAuth);
      this.setState({ user: firebaseUser, loading: false });
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <UserContext.Provider value={"loading"}>
          {this.props.children}
        </UserContext.Provider>
      )
    } else if (!this.state.user) {
      return (
        <UserContext.Provider value={"logout"}>
          {this.props.children}
        </UserContext.Provider>
      );
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