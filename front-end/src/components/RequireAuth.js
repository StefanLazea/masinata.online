import React from 'react';
import TokenService from "../services/Token.js";
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

export default function (ComposedComponent) {

    class RequireAuth extends React.Component {

        constructor(props) {
            super(props);
            this._isMounted = false;

            this.state = {
                loginRedirect: false
            }
        }

        componentDidMount() {
            this._isMounted = true;
            if (TokenService.getToken() === null) {
                this.setState({ loginRedirect: true })
                toast("Please be sure you are logged in!");
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