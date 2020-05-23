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
        this.handleBeginDateChange = this.handleBeginDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.state = {
            paper: {},
            hasTokenExpired: false,
            dropdownOpen: false,
            file: null,
            preview: "https://via.placeholder.com/370.png",
            beginDate: undefined,
            endDate: undefined
        }
    }

    handleBeginDateChange(day) {
        console.log(day.toLocaleDateString());
        this.setState({ beginDate: day });
    }
    handleEndDateChange(day) {
        console.log(day.toLocaleDateString());
        this.setState({ beginDate: day });
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

    handleSubmit = (e) => {
        e.preventDefault();
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
                                                <Label sm={4}>Data inceput</Label>
                                                <Col sm={2}>
                                                    <DayPickerInput
                                                        onDayChange={this.handleBeginDateChange}
                                                        dayPickerProps={{
                                                            month: new Date(2018, 10),
                                                            showWeekNumbers: true,
                                                            todayButton: 'Today',
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label sm={4}>Data final</Label>
                                                <Col sm={2}>
                                                    <DayPickerInput
                                                        onDayChange={this.handleEndDateChange}
                                                        dayPickerProps={{
                                                            month: new Date(2018, 10),
                                                            showWeekNumbers: true,
                                                            todayButton: 'Today',
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Label for="cost" sm={2}>Cost</Label>
                                                <Col sm={4}>
                                                    <Input
                                                        type="number"
                                                        name="cost"
                                                        id="cost"
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="period" sm={3}>Perioada</Label>
                                                <Col sm={3}>
                                                    <Input
                                                        type="number"
                                                        name="period"
                                                        id="period"
                                                        onChange={this.handleChange}
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