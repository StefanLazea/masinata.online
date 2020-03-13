import React from 'react';
import { Button } from 'reactstrap';
import './Landing.css';
import { Redirect } from "react-router-dom";
import car from '../../assets/img/untitled.png';


export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToSignUp: false
        };
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                    <img id="img" src={car} alt="car"></img>
                </div>
                <div id="text" className="col-xs-6 col-sm-6 col-md-6">
                    <h1 id="brand" className="center-text">masinaTa.online</h1>
                    <h6 id="slogan" className="center-text">Forget about your car</h6>
                    <div className="row-3">
                        <Button id="button">Sign up</Button>
                        <Button id="second">Sign in</Button>
                    </div>

                </div>
            </div>
        );
    }
}
