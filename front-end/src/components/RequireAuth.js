import React from 'react';
import TokenService from "../services/Token.js";
import { Redirect } from "react-router-dom";

export default function (ComposedComponent) {

    class RequireAuth extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false,
                loginRedirect: false
            }
        }

        componentDidMount() {
            console.log(this.state.isAuthenticated, this.state.loginRedirect, TokenService.getToken())
            if (!this.state.isAuthenticated && TokenService.getToken() === null) {
                this.setState({ loginRedirect: true })
            }
        }

        render() {
            if (this.state.loginRedirect === true) {
                return <Redirect to='/login' />
            }
            return <ComposedComponent {...this.props} />
        }
    }

    return RequireAuth;

}