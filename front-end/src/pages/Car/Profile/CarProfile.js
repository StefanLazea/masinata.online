import Page from '../../../components/Page';
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
} from 'reactstrap';


import React from 'react';
import CarsService from '../../../services/CarsService';
import { toast } from 'react-toastify';
import './CarProfile.css';

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {}
        }
    }

    componentDidMount = () => {
        this.getCarsById();
    }

    getCarsById = () => {
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
    render() {
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
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Email</Label>
                                            <Col>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col className="col-xs-6 col-sm-6 col-md-6">
                                        <img className="img-fluid rounded mx-auto d-block" src="https://via.placeholder.com/370.png" alt="Card cap" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <h5>face parte din garaj</h5>
                                    </Col>
                                </Row>
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
                    </Col>
                </Row>
            </Page>
        );
    }
}