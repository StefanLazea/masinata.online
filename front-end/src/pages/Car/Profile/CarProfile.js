import Page from '../../../components/Page';
import { Redirect } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Badge,
    Label,
    Input,
    FormGroup,
    Button,
} from 'reactstrap';


import React from 'react';
import CarsService from '../../../services/CarsService.js';
import { toast } from 'react-toastify';
import './CarProfile.css';

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {},
            hasTokenExpired: false
        }
    }

    componentDidMount = () => {
        this.getCarById();
    }

    handleChange = (e) => {
        const car = { ...this.state.car, [e.target.name]: e.target.value }
        this.setState(() => ({ car }))
        console.log(this.state.car)
    }

    getCarById = () => {
        CarsService.getCarById(this.props.match.params.id)
            .then((res) => {
                this.setState({ car: res.data.message });
                console.log(res.data.message)
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    updateCar = (e) => {

    }
    render() {
        if (this.state.hasTokenExpired) {
            return <Redirect to="/login" />
        }
        return (
            <Page
                className="CarProfile"
                title="Car Profile"
                breadcrumbs={[{ name: 'Car Profile', active: true }]}>
                <Row>
                    <Col className="col-xs-12 col-sm-12 col-md-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="d-flex align-items-center">
                                        <Badge color="primary">
                                            <span className="pb-2 align-middle badge-text-size">{this.state.car.licence_plate}
                                            </span>
                                        </Badge>
                                        <Badge color="success" className="ml-auto badge-text-size">{this.state.car.vin}</Badge>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Row>
                                                <Label for="model" sm={2}>Model</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="model"
                                                        id="model"
                                                        defaultValue={this.state.car.model}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="brand" sm={2}>Marca</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="brand"
                                                        id="brand"
                                                        defaultValue={this.state.car.brand}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="type" sm={2}>Tip</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="type"
                                                        id="type"
                                                        defaultValue={this.state.car.type}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="year" sm={2}>An</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        defaultValue={this.state.car.year}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="engine_type" sm={3}>Combustibil</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="text"
                                                        name="engine_type"
                                                        id="engine_type"
                                                        defaultValue={this.state.car.engine_type}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="eco" sm={2}>Norma</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="eco"
                                                        id="eco"
                                                        defaultValue={this.state.car.pollution_grade}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                    </Col>
                                    <Col className="col-xs-6 col-sm-6 col-md-6">
                                        <img className="img-fluid rounded mx-auto d-block" src="https://via.placeholder.com/370.png" alt="Card cap" />
                                    </Col>
                                </Row>
                                {this.state.car.garageId
                                    ?
                                    <Row>
                                        <Col md={6}>
                                            <h5>face parte din garaj</h5>
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col md={12} className="d-flex align-items-center">
                                            <h5 className="mx-auto">Adauga masina la un garaj</h5>
                                        </Col>
                                    </Row>
                                }

                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="d-flex align-items-center">
                                        <Badge color="primary">
                                            <span className="pb-2 align-middle badge-text-size">Imagini
                                            </span>
                                        </Badge>
                                        <Badge color="success" className="ml-auto badge-text-size">{this.state.car.vin}</Badge>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>

                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="d-flex align-items-center">
                                        <Badge color="primary">
                                            <span className="pb-2 align-middle badge-text-size">Acte
                                            </span>
                                        </Badge>
                                        <Badge color="success" className="ml-auto badge-text-size">{this.state.car.vin}</Badge>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <Button className="d-flex mx-auto" onClick={(e) => this.updateCar(e)}>Salveaza modificarile</Button>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}