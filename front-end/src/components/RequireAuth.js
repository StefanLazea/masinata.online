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

        // Push to login route if not authenticated on mount
        componentDidMount() {
            if (getToken() !== null) {
                this.setState({ isAuthenticated: true });
            }
            if (!this.state.authenticated) {
                this.setState({ loginRedirect: true })
                // Use your router to redirect them to login page
            }
        }
        componentWillReceiveProps(nextProps) {
            if (getToken() !== null) {
                this.setState({ isAuthenticated: true });
            }
            if (!this.state.authenticated) {
                this.setState({ loginRedirect: true })

            }
        }


        // Otherwise render the original component
        render() {
            if (this.state.loginRedirect === true) {
                return <Redirect to='/login' />
            }
            return <ComposedComponent {...this.props} />
        }

    }

    return RequireAuth

}