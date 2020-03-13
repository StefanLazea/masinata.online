import React from 'react';
import { Button } from 'reactstrap';
import './Landing.css';
import car from '../../assets/img/untitled.png';


export default class Landing extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6">
                    <img id="img" src={car} alt="car"></img>
                </div>
                <div id="text" className="col-xs-6 col-sm-6 col-md-6">
                    <h1 className="center-text">masinaTa.online</h1>
                    <h6 className="center-text">Forget about your car</h6>
                    <Button id="button">Press me</Button>
                </div>
            </div>
        );
    }
}
