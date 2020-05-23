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
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './AddEditPaper.css';

export default class AddEditPaper extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            paper: {},
            hasTokenExpired: false,
            dropdownOpen: false,
            file: null,
            preview: "https://via.placeholder.com/370.png",
            selectedDay: undefined,
        }
    }

    handleDayChange(day) {
        console.log(day.toLocaleDateString());
        this.setState({ selectedDay: day });
    }

    handleChange = async (e) => {
        const paper = { ...this.state.paper, [e.target.name]: e.target.value }
        await this.setState(() => ({ paper }))
        console.log(this.state.paper)
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
                                                <Label for="type" sm={3}>Tip act</Label>
                                                <Col sm={5}>
                                                    <Input
                                                        type="select"
                                                        name="type"
                                                        id="type"
                                                        onChange={this.handleChange}
                                                    >
                                                        <option>Tip act</option>
                                                        <option value="ITP">ITP</option>
                                                        <option value="RCA">RCA</option>
                                                        <option value="Rovigneta">Rovigneta</option>
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
                                            <Row>
                                                <Col sm={3}>
                                                    <DayPickerInput
                                                        onDayChange={this.handleDayChange}
                                                        dayPickerProps={{
                                                            month: new Date(2018, 10),
                                                            showWeekNumbers: true,
                                                            todayButton: 'Today',
                                                        }}
                                                    // inputProps={{ style: { width: 250 } }}
                                                    />
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