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

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: null
        }
        this.getCarsById();
        console.log("aici")
    }

    getCarsById = () => {
        console.log(this.props.match.params.id)
        CarsService.getCarById(this.props.match.params.id)
            .then((res) => {
                this.setState({ car: res.data.message });
                console.log(res.data)
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
                breadcrumbs={[{ name: 'Car Profile', active: true }]}
            >

                <Row>
                    <Col className="col-xs-12 col-sm-12 col-md-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <Badge color="light"><h4>AG 72 VOB</h4></Badge>
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
                                        <img className="img-fluid rounded mx-auto d-block" src="https://via.placeholder.com/375.png" alt="Card cap" />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}