import React from 'react';
import { getToken } from "../services/Token";
import { Redirect } from "react-router";

export default function (ComposedComponent) {

    class RequireAuth extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false,
                loginRedirect: false
            }
        }

        UNSAFE_componentWillMount() {
            console.log(this.state.isAuthenticated, this.state.loginRedirect, getToken())
            // if (getToken() !== null) {
            //     console.log("is ok")
            //     this.setState({ isAuthenticated: true });

            // }
            if (!this.state.isAuthenticated && getToken() === null) {
                this.setState({ loginRedirect: true })
            }
        }
        // componentWillReceiveProps(nextProps) {
        //     if (getToken() !== null) {
        //         this.setState({ isAuthenticated: true });
        //     }
        //     if (!this.state.isAuthenticated) {
        //         this.setState({ loginRedirect: true })
        //     }
        // }

        render() {
            if (this.state.loginRedirect === true) {
                return <Redirect to='/login' />
            }
            return <ComposedComponent {...this.props} />
        }
    }

    return RequireAuth;

}