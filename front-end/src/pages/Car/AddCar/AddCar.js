import Page from '../../../components/Page';
import {
    Row,
    Col,
    Card,
    CardBody,
    Label,
    Input,
    FormGroup,
    Button,
    FormText,
} from 'reactstrap';
import { Redirect } from "react-router-dom";
import CarsService from '../../../services/CarsService.js';
import React from 'react';
import { toast } from 'react-toastify';

export default class AddCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {},
            hasTokenExpired: false,
            redirectToDashboard: false,
            dropdownOpen: false
        }
    }

    handleChange = (e) => {
        const car = { ...this.state.car, [e.target.name]: e.target.value }
        this.setState(() => ({ car }))
        console.log(this.state.car)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        CarsService.createCar(this.state.car)
            .then((res) => {
                toast(res.data.message);
                this.setState({ redirectToDashboard: true });
            })
            .catch((err) => {
                console.log(err)
                toast("An error occurred, please try later!");
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    render() {
        if (this.state.hasTokenExpired) {
            return <Redirect to="/login" />
        }
        if (this.state.redirectToDashboard) {
            return <Redirect to="/" />
        }
        return (
            <Page
                className="AddCar"
                title="Adaugare masina"
                breadcrumbs={[{ name: 'Adaugare masina', active: true }]}>
                <Row>
                    <Col className="col-xs-12 col-sm-12 col-md-12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Row>
                                                <Label for="vin" sm={2}>VIN</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="vin"
                                                        id="vin"
                                                        defaultValue={this.state.car.vin}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="licence_plate" sm={2}>Numar</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="licence_plate"
                                                        id="licence_plate"
                                                        defaultValue={this.state.car.licence_plate}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>

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
                                                <Label for="type" sm={3}>Caroserie</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="select"
                                                        name="type"
                                                        id="type"
                                                        onChange={this.handleChange}
                                                    >
                                                        <option value="Sedan">Berlina</option>
                                                        <option value="Hatchback">Hatchback</option>
                                                        <option value="Suv">SUV</option>
                                                        <option value="Coupe">Coupe</option>
                                                        <option value="Cabriolet">Cabriolet</option>
                                                    </Input>
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
                                                <Label for="pollution_grade" sm={2}>Norma</Label>
                                                <Col>
                                                    <Input
                                                        type="text"
                                                        name="pollution_grade"
                                                        id="pollution_grade"
                                                        defaultValue={this.state.car.pollution_grade}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="engine_capacity" sm={3}>Capacitate cilindrica</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="text"
                                                        name="engine_capacity"
                                                        id="engine_capacity"
                                                        defaultValue={this.state.car.engine_capacity}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="mileage" sm={3}>Kilometraj</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="text"
                                                        name="mileage"
                                                        id="mileage"
                                                        defaultValue={this.state.car.mileage}
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>

                                            </Row>
                                            <Col sm={10}>
                                                <Input type="file" name="file" />
                                                <FormText color="muted">
                                                    Adauga fotografia principala pe care vrei sa o afisam in profilul
                                                    masinii tale.
                                                </FormText>
                                            </Col>
                                            <Col>
                                                <h4>Adauga masina unui garaj</h4>
                                            </Col>
                                        </FormGroup>

                                    </Col>
                                    <Col className="col-xs-6 col-sm-6 col-md-6">
                                        <img className="img-fluid rounded mx-auto d-block" src="https://via.placeholder.com/370.png" alt="Card cap" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Button className="mx-auto" onClick={(e) => { this.handleSubmit(e) }}>Salveaza masina</Button>
                                </Row>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Page>
        );
    }
}