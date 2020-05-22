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
import React from 'react';
import { toast } from 'react-toastify';

export default class AddEditPaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {},
            hasTokenExpired: false,
            redirectToDashboard: false,
            dropdownOpen: false,
            file: null,
            preview: "https://via.placeholder.com/370.png"
        }
    }

    handleChange = async (e) => {
        const car = { ...this.state.car, [e.target.name]: e.target.value }
        await this.setState(() => ({ car }))
        console.log(this.state.car)
    }

    handleChangeFile = async (e) => {
        console.log(URL.createObjectURL(e.target.files[0]))

        await this.setState({
            preview: URL.createObjectURL(e.target.files[0]),
        })
    }

    handleImagePreview = async (e) => {
        toast("ura")
        await this.setState({
            file: e.target.files[0],
        })
        console.log(this.state.file)
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
                className="AddPaper"
                title="Adaugare document"
                breadcrumbs={[{ name: 'Adaugare document', active: true }]}>
                <Row>
                    <Col className="col-xs-12 col-sm-12 col-md-12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>

                                            <Row>
                                                <Label for="engine_type" sm={3}>Combustibil</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="select"
                                                        name="engine_type"
                                                        id="engine_type"
                                                        onChange={this.handleChange}
                                                    >
                                                        <option>Tip act</option>
                                                        <option value="ITP">ITP</option>
                                                        <option value="RCA">RCA</option>
                                                        <option value="Rovigneta">Rovigneta</option>
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