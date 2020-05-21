import Page from '../../components/Page/Page';
import { GarageDetailsCard, GarageAddEditCard } from '../../components/Card';
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
} from 'reactstrap';
import './Garage.css';

export default class Garage extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            garages: [],
            isDeleteButtonClicked: false,
            displayCreateGarageCard: false,
            garageName: "",
            editGarageId: null,
            hasTokenExpired: false,
        }
    }

    handleChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClickCreateGarage = (e) => {
        this.setState({ displayCreateGarageCard: true });
    }

    onItemClickDeleteGarage = (e, garage_id) => {
        GarageService.deleteGarage(garage_id)
            .then((response) => {
                toast(response.data.message);
                this.getUserGarages();
            }).catch((err) => {
                console.log(err.response)
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

    updateGarage = (e) => {
        const form = {
            "name": this.state.garageName,
        }

        GarageService.updateGarage(this.state.editGarageId, form)
            .then((res) => {
                toast(res.data.message);
                this.setState({ editGarageId: null });
                this.getUserGarages();
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

    onCancelButtonClick = () => {
        this.setState({ displayCreateGarageCard: false })
    }

    onItemClickEditGarage = (e, garage_id, garage_name) => {
        this.setState({ garageName: garage_name })
        this.setState({ editGarageId: garage_id });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getUserGarages();
    }

    render() {
        if (this.state.hasTokenExpired) {
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
                    {
                        this.state.displayCreateGarageCard ?
                            <GarageAddEditCard
                                cardPurpose={"Adaugare"}
                                handleChange={this.handleChange}
                                onCancelButtonClick={this.onCancelButtonClick}
                                submitMethod={this.createGarage}
                            />
                            : null
                    }

                    {
                        this.state.editGarageId ?
                            <GarageAddEditCard
                                cardPurpose={"Editare"}
                                garage_id={this.state.editGarageId}
                                garage_name={this.state.garageName}
                                handleChange={this.handleChange}
                                onCancelButtonClick={this.onCancelButtonClick}
                                submitMethod={this.updateGarage}
                            /> : null
                    }

                    {this.state.garages.length > 0 ?
                        this.state.garages.map(garage =>
                            <GarageDetailsCard
                                key={garage.id}
                                garage_id={garage.id}
                                name={garage.name}
                                history={this.props.history}
                                onItemClickEditGarage={this.onItemClickEditGarage}
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