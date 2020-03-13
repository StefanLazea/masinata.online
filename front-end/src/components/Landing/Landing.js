import React from 'react';
import { Button } from 'reactstrap';
import './Landing.css';
import { Redirect } from "react-router-dom";
import car from '../../assets/img/untitled.png';


export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToSignUp: false,
            redirectToLogin: false,
        };
    }
    render() {
        console.log(this.state.redirectToLogin, this.state.redirectToSignUp);
        if (this.state.redirectToSignUp) {
            return <Redirect to="/signup" />;
        }
        if (this.state.redirectToLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                    <img id="img" src={car} alt="car"></img>
                </div>
                <div id="text" className="col-xs-6 col-sm-6 col-md-6">
                    <h1 id="brand" className="center-text">masinaTa.online</h1>
                    <h6 id="slogan" className="center-text">Forget about your car</h6>
                    <div className="row-3">
                        <Button id="button" onClick={() => { this.setState({ redirectToSignUp: true }) }}>Sign up</Button>
                        <Button id="second" onClick={() => { this.setState({ redirectToLogin: true }) }}>Sign in</Button>
                    </div>

                </div>
            </div>
        );
    }
}
