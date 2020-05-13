import Page from '../../components/Page';
import { GarageDetailsCard } from '../../components/Card';
import GarageService from '../../services/GarageService.js';
import TokenService from '../../services/Token.js';
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
    CardHeader,
    Input,
    Label
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
            displayCreateGarageCard: false,
            garageName: "",
            cars: []
        }
    }

    handleChange = async (e) => {
        console.log(e.target.name)
        await this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClickCreateGarage = (e) => {
        console.log("creare garaj")
        this.setState({ displayCreateGarageCard: true });
    }

    onItemClickDeleteGarage = (e, garage_id) => {
        GarageService.deleteGarage(garage_id)
            .then((response) => {
                toast(response.data.message);
                this.getUserGarages();
            }).catch((err) => {
                console.log(err)
                toast("An error occurred, please try later!");
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }

    createGarage = (e) => {
        e.preventDefault();
        let data = {
            name: this.state.garageName,
            user_id: TokenService.getUserId()
        }
        GarageService.createGarage(data)
            .then((res) => {
                toast(res.data.message)
                this.getUserGarages();
                this.setState({ displayCreateGarageCard: false })
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
                addGarageButton={true}
                addCarButton={true}
                onClickCreateGarage={this.onClickCreateGarage}
                history={this.props.history}
            >
                <Row>
                    {this.state.displayCreateGarageCard ?
                        <Col lg="4" md="12" sm="12" xs="12">
                            <div>
                                <Card>
                                    <CardHeader>
                                        <div className="d-flex align-items-center">
                                            <CardTitle>Creare garaj</CardTitle>

                                            <Button
                                                className="ml-auto btn-danger"
                                                onClick={(e) => {
                                                    this.setState({ displayCreateGarageCard: false })
                                                }}>
                                                <i className="fa fa-times"></i>
                                            </Button>
                                        </div>

                                    </CardHeader>
                                    <CardBody>
                                        <Col>
                                            <Label for="name">Denumire</Label>
                                            <Input
                                                type="name"
                                                name="garageName"
                                                id="name"
                                                onChange={e => this.handleChange(e)}
                                            />
                                            <Row>
                                                <Button className="btn-success mx-auto" onClick={(e) => this.createGarage(e)} >Adauga un garaj</Button>
                                            </Row>
                                        </Col>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col> : null}
                    {this.state.garages.length > 0 ?
                        this.state.garages.map(garage =>
                            <GarageDetailsCard
                                key={garage.id}
                                garage_id={garage.id}
                                name={garage.name}
                                history={this.props.history}
                                onItemClickDeleteGarage={this.onItemClickDeleteGarage}
                            />
                        )
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