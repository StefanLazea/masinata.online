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
import GarageService from '../../../services/GarageService.js';
import { toast } from 'react-toastify';
import './CarProfile.css';

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            car: {},
            hasTokenExpired: false,
            image: null,
            garage: {}
        }

    }

    componentDidMount = () => {
        this._isMounted = true;
        this.getCarById();
    }

    handleChange = async (e) => {
        const car = { ...this.state.car, [e.target.name]: e.target.value }
        await this.setState(() => ({ car }))
        console.log(this.state.car)
    }

    getCarById = () => {
        CarsService.getCarById(this.props.match.params.id)
            .then((res) => {
                this.setState({ car: res.data.message });
                // todo check if garageId is null
                this.getGarageInfo(res.data.message.garageId);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    getGarageInfo = (id) => {
        GarageService.getGaragesById(id)
            .then((res) => {
                this.setState({ garage: res.data.message });
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    handleUndefiendValues = (value) => {
        return value === "undefined" ? "" : value;
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
                                                        defaultValue={this.handleUndefiendValues(this.state.car.model)}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="brand" sm={2}>Marca</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="brand"
                                                        id="brand"
                                                        defaultValue={this.handleUndefiendValues(this.state.car.brand)}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="type" sm={3}>Caroserie</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="select"
                                                        name="type"
                                                        id="type"
                                                        onChange={this.handleChange}
                                                        value={this.state.car.type}
                                                    >
                                                        <option>Tip caroserie</option>
                                                        <option value="SUV">SUV</option>
                                                        <option value="Coupe">Coupe</option>
                                                        <option value="Berlina">Berlina</option>
                                                        <option value="Hatchback">Hatchback</option>
                                                        <option value="Pick-up">Pick-up</option>
                                                        <option value="4x4">4x4</option>
                                                    </Input>
                                                </Col>
                                                <Label for="year" sm={2}>An</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        defaultValue={this.handleUndefiendValues(this.state.car.year)}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="engine_type" sm={3}>Combustibil</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="select"
                                                        name="engine_type"
                                                        id="engine_type"
                                                        onChange={this.handleChange}
                                                        value={this.state.car.engine_type}
                                                    >
                                                        <option>Tip combustibil</option>
                                                        <option value="Motorina">Motorina</option>
                                                        <option value="Benzina">Benzina</option>
                                                        <option value="Hidrogen">Hidrogen</option>
                                                    </Input>
                                                </Col>
                                                <Label for="eco" sm={2}>Norma</Label>
                                                <Col>
                                                    <Input
                                                        type="select"
                                                        name="pollution_grade"
                                                        id="pollution_grade"
                                                        onChange={this.handleChange}
                                                        value={this.state.car.pollution_grade}
                                                    >
                                                        <option>Norma poluare</option>
                                                        <option value="non-euro">non-euro</option>
                                                        <option value="eco">eco</option>
                                                        <option value="Euro 1">Euro 1</option>
                                                        <option value="Euro 2">Euro 2</option>
                                                        <option value="Euro 3">Euro 3</option>
                                                        <option value="Euro 4">Euro 4</option>
                                                        <option value="Euro 5">Euro 5</option>
                                                        <option value="Euro 6">Euro 6</option>
                                                    </Input>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="engine_capacity" sm={4}>Capacitate cilindrica</Label>
                                                <Col sm={2}>
                                                    <Input
                                                        type="text"
                                                        name="engine_capacity"
                                                        id="engine_capacity"
                                                        defaultValue={this.handleUndefiendValues(this.state.car.engine_capacity)}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="mileage" sm={3}>Kilometraj</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="text"
                                                        name="mileage"
                                                        id="mileage"
                                                        defaultValue={this.handleUndefiendValues(this.state.car.mileage)}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                    </Col>
                                    <Col className="col-xs-6 col-sm-6 col-md-6">
                                        <img className="img-fluid rounded mx-auto d-block" src={`${getBasename()}/car/image/${this.props.match.params.id}`} alt="Card cap" />
                                    </Col>
                                </Row>
                                {this.state.car.garageId
                                    ?
                                    <Row>
                                        <Col md={6}>
                                            <h5>Face parte din garaj <Badge color="secondary">{this.state.garage.name} <i className="fa fa-times"></i></Badge></h5>
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