import Page from '../../components/Page';
import { GarageDetailsCard } from '../../components/Card';
import GarageService from '../../services/GarageService.js';
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import CarsService from '../../services/CarsService.js';
import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Row
} from 'reactstrap';
import './Garage.css';

export default class Garage extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            garages: [],
            hasTokenExpired: false,
            isDeleteButtonClicked: false,
            carsNumberInGarage: 0
        }
    }

    getCarsNumberInGarage = (id) => {
        let number = 0;
        CarsService.getCarsByGarageId(id)
            .then(res => {
                console.log(res.data.length)
                number = res.data.length;
            }).catch((err) => {
                number = 0;
            });
        return number;
    }

    getUserGarages = () => {
        GarageService.getGaragesByUserId()
            .then((res) => {
                this.setState({ garages: res.data });
            })
            .catch((err) => {
                console.log(err.response)
                toast("An error occurred, please try later!");
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }


    componentDidMount() {
        this._isMounted = true;
        this.getUserGarages();
    }

    render() {
        if (this.state.hasTokenExpired === true) {
            return <Redirect to="/login" />
        }
        return (
            <Page
                className="Garages"
                title="Garage"
                breadcrumbs={[{ name: 'Garage', active: true }]}
                addCarButton={true}
                history={this.props.history}
            >
                <Row>
                    {this.state.garages.length > 0 ?
                        this.state.garages.map(garage =>
                            <GarageDetailsCard
                                key={garage.id}
                                car_id={garage.id}
                                name={garage.name}
                                cars_number={(this.getCarsNumberInGarage(garage.id))}
                                history={this.props.history}
                                onItemClickDeleteCar={this.onItemClickDeleteCar}
                            />)
                        :
                        <Col lg="4" md="12" sm="12" xs="12">
                            <div>
                                <Card>
                                    <CardBody className="text-center">
                                        <CardTitle>Nu exista nici un garaj!</CardTitle>
                                        <Button className="btn-success" onClick={(e) => this.setState({ redirectToAddCarPage: true })} >Adauga un garaj</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    }
                </Row>
            </Page>
        );
    }
}