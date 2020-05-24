import Page from '../../../components/Page/Page';
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
import TokenService from '../../../services/Token.js';
import GarageService from '../../../services/GarageService.js';
import React from 'react';
import { toast } from 'react-toastify';

export default class AddCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {},
            hasTokenExpired: false,
            redirectToDashboard: false,
            dropdownOpen: false,
            garages: [],
            file: null,
            preview: "https://via.placeholder.com/370.png"
        }
    }

    getGarages = (e) => {
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

    handleChange = async (e) => {
        const car = { ...this.state.car, [e.target.name]: e.target.value }
        await this.setState(() => ({ car }))
        console.log(this.state.car)
    }

    handleImagePreview = async (e) => {
        await this.setState({
            file: e.target.files[0],
        })
        console.log(this.state.file)
    }

    handleChangeFile = async (e) => {
        console.log(URL.createbjectURL(e.target.files[0]))

        await this.setState({
            preview: URL.createObjectURL(e.target.files[0]),
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let car = { ...this.state.car, "user_id": TokenService.getUserId() }

        let formData = new FormData();
        formData.append('model', car.model);
        formData.append('brand', car.brand);
        formData.append('type', car.type);
        formData.append('licence_plate', car.licence_plate);
        formData.append('mileage', car.mileage);
        formData.append('vin', car.vin);
        formData.append('engine_type', car.engine_type);
        formData.append('engine_capacity', car.engine_capacity);
        formData.append('year', car.year);
        formData.append('pollution_grade', car.pollution_grade);
        formData.append('avatar_photo', this.state.file);
        formData.append('user_id', car.user_id);

        if (this.state.car.garage_id !== undefined) {
            formData.append('garage_id', car.garage_id);
        }

        CarsService.createCarUsingFormData(formData)
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
    componentDidMount() {
        this.getGarages();
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
                                                        defaultValue={this.state.car.year}
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
                                                    >
                                                        <option>Tip combustibil</option>
                                                        <option value="Motorina">Motorina</option>
                                                        <option value="Benzina">Benzina</option>
                                                        <option value="Hidrogen">Hidrogen</option>
                                                    </Input>
                                                </Col>
                                                <Label for="pollution_grade" sm={2}>Norma</Label>
                                                <Col>
                                                    <Input
                                                        type="select"
                                                        name="pollution_grade"
                                                        id="pollution_grade"
                                                        onChange={this.handleChange}
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
                                            <Row>
                                                <Col sm={10}>
                                                    <Input type="file" name="file" onChange={(e) => {
                                                        this.handleImagePreview(e);
                                                        this.handleChangeFile(e);
                                                    }
                                                    } />
                                                    <FormText color="muted">
                                                        Adauga fotografia principala pe care vrei sa o afisam in profilul
                                                        masinii tale.
                                                    </FormText>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="type" sm={5}>Adaugati un garaj</Label>
                                                <Col sm={7}>
                                                    <Input
                                                        type="select"
                                                        name="garage_id"
                                                        id="garage_id"
                                                        onChange={this.handleChange}
                                                    >
                                                        <option>Selectecteaza garaj</option>
                                                        {
                                                            this.state.garages.map(g => {
                                                                return <option key={g.id} value={g.id}>{g.name}</option>
                                                            })
                                                        }
                                                    </Input>
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                    </Col>
                                    <Col className="col-xs-6 col-sm-6 col-md-6">
                                        <img className="img-fluid rounded mx-auto d-block" src={this.state.preview} alt="Card cap" />
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