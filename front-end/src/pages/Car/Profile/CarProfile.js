import React from 'react';
import Page from '../../../components/Page/Page';
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

import CarsService from '../../../services/CarsService.js';
import GarageService from '../../../services/GarageService.js';
import PapersService from '../../../services/PaperService.js';
import NoteService from '../../../services/NoteService.js';
import NotesCard from '../../../components/Card/NotesCard/NotesCard.js';
import * as _ from "lodash";

import GarageSelect from '../../../components/GarageSelect/GarageSelect';
import { toast } from 'react-toastify';
import ImageGallery from 'react-image-gallery';
import './CarProfile.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import 'react-image-gallery/styles/css/image-gallery.css';

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
            garage: {},
            renewDocumentButton: false,
            indexImageSelected: null,
            imageTest: [],
            carId: '',
            notes: [],
            addNote: false,
            filterNotes: ''
        };
    }

    checkTypes = () => {
        PapersService.checkTypes(this.props.match.params.id)
            .then(res => {
                let i = 0;
                for (let itemType in res.data) {
                    console.log(itemType)
                    if (res.data[itemType] === 1) {
                        this.setState({ imageTest: [...this.state.imageTest, PapersService.getData(this.props.match.params.id)[i]] })
                    }
                    i++;
                }
            })
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.getCarById();
        this.checkTypes();
        this.getNotes();
    }

    refreshList = (message = '') => {
        if (message.length !== 0) {
            toast(message)
        }
        this.getNotes();
    }

    onCancelButtonClick = () => {
        this.setState({ addNote: false })
    }

    redirectToRenewPage = () => {
        let selectedDocumentType = this.state.images[this.state.indexImageSelected].thumbnailLabel;
        this.props.history.push(`/renew/car/${this.props.match.params.id}/paper/${selectedDocumentType}`)
    }

    redirectToAddPaper = () => {
        this.props.history.push(`/add/car/${this.state.car.id}/paper`)
    }

    handleChange = async (e) => {
        const car = { ...this.state.car, [e.target.name]: e.target.value }
        await this.setState(() => ({ car }))
    }

    handleFilterChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ notes: _.orderBy(this.state.notes, [e.target.value], ['desc']) })
    }

    getCarById = () => {
        CarsService.getCarById(this.props.match.params.id)
            .then((res) => {
                this.setState({ car: res.data.message });
                if (res.data.message.garageId !== null) {
                    this.getGarageInfo(res.data.message.garageId);
                }
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    getGarageInfo = (id) => {
        GarageService.getGarageById(id)
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

    getNotes = () => {
        NoteService.getAllNotes(this.props.match.params.id).then((res) => {
            this.setState({ notes: res.data });
            // this.setState({ notes: _.orderBy(res.data, ['distance'], ['desc']) })
        }).catch((err) => {
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
        e.preventDefault();
        CarsService.updateCar(this.props.match.params.id, this.state.car)
            .then((res) => { toast(res.data.message); })
            .catch((err) => {
                toast("An error occurred, please try later!");
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    selectDocumentForRenew = (index) => {
        this.setState({ renewDocumentButton: true });
        this.setState({ indexImageSelected: index });
        console.log(this.state.indexImageSelected, this.state.renewDocumentButton)
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
                                        <Button id="shareCar" className="btn-success ml-auto">
                                            <i className="fa fa-share"></i>
                                        </Button>
                                        <Badge color="success" className="badge-text-size">{this.state.car.vin}</Badge>
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

                                {this.state.car.garageId ?
                                    <GarageSelect
                                        name={"Face parte din garajul"}
                                        handleChange={this.handleChange}
                                        garage_id={this.state.car.garageId}
                                        count={0}
                                    />
                                    : null
                                }
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <Button className="d-flex mx-auto" onClick={(e) => this.updateCar(e)}>Salveaza modificarile</Button>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="d-flex align-items-center">
                                        <Badge color="primary">
                                            <span className="pb-2 align-middle badge-text-size">Acte
                                            </span>
                                        </Badge>
                                        <Button id="addPaper" className="btn-success ml-auto" onClick={this.redirectToAddPaper}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                        {this.state.renewDocumentButton ?
                                            <Button id="renewPaper" className="btn-warning" onClick={this.redirectToRenewPage}>
                                                <i className="fa fa-pencil"></i>
                                            </Button>

                                            : null
                                        }
                                        <Badge color="success" className="badge-text-size">{this.state.car.vin}</Badge>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                {this.state.imageTest.length > 0 ?
                                    < ImageGallery items={this.state.imageTest} onSlide={(index) => this.selectDocumentForRenew(index)} />
                                    : <h5>Nu sunt imagini</h5>
                                }
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className="d-flex align-items-center">
                                        <Badge color="primary">
                                            <span className="pb-2 align-middle badge-text-size">Notite
                                            </span>
                                        </Badge>
                                        <Input
                                            type="select"
                                            name="filter_results"
                                            id="filter"
                                            className="ml-auto"
                                            onChange={this.handleFilterChange}
                                        >
                                            <option>Sorteaza notitele</option>
                                            <option value="distance">dupa distanta</option>
                                            <option value="createdAt">dupa data adaugarii</option>
                                            <option value="urgent">dupa urgenta</option>
                                        </Input>

                                        <Button id="addPaper" className="btn-success" onClick={() => { this.setState({ addNote: !this.state.addNote }) }}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {this.state.addNote ?
                                        <NotesCard
                                            noteType={"Adaugare"}
                                            car={this.props.match.params.id}
                                            refreshList={this.refreshList}
                                            onCancelButtonClick={this.onCancelButtonClick}
                                        />
                                        : null
                                    }
                                    {this.state.notes.length > 0 ?
                                        this.state.notes.map(note =>
                                            <NotesCard
                                                key={note.id}
                                                history={this.props.history}
                                                note={note}
                                                refreshList={this.refreshList}
                                            />)
                                        : null}

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}