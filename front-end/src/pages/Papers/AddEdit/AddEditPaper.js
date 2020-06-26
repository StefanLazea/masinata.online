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
import PaperService from '../../../services/PaperService.js';
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
            endDate: undefined,
            renew: false,
            carId: '',
            carType: '',
            redirectToCarProfile: false,
        }
    }

    componentDidMount = async () => {
        await this.setState({ carId: this.props.match.params.id })
        await this.setState({ carType: this.props.match.params.type })
        console.log(this.state.carId, this.state.carType)
    }

    handleBeginDateChange = async (day) => {
        const paper = { ...this.state.paper, begin_date: day }
        await this.setState(() => ({ paper }))
        console.log(this.state.paper)
    }

    handleEndDateChange = async (day) => {
        const paper = { ...this.state.paper, expiration_date: day }
        await this.setState(() => ({ paper }))
        console.log(this.state.paper)
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
    }

    handleCheckboxChange = async (e) => {
        const paper = { ...this.state.paper, [e.target.name]: e.target.checked }
        await this.setState(() => ({ paper }))
    }

    updatePaper = (formData) => {
        PaperService.updatePaper(this.state.carId, this.state.paper.type, formData)
            .then((res) => {
                toast(res.data.message);
                this.setState({ redirectToCarProfile: true })
            })
            .catch((err) => {
                console.log(err.response)
            });
    }

    createFormData = () => {
        let formData = new FormData();
        console.log(this.state.paper.renew)
        formData.append('details', this.state.paper.details);
        formData.append('type', this.state.paper.type);
        formData.append('expirationDate', this.state.paper.expiration_date);
        formData.append('beginDate', this.state.paper.begin_date);
        formData.append('period', this.state.paper.period);
        formData.append('cost', this.state.paper.cost);
        formData.append('companyName', this.state.paper.companyName);
        formData.append('document', this.state.file);
        formData.append('renew', this.state.paper.renew === undefined ? false : this.state.paper.renew);
        formData.append('car_id', this.props.match.params.id);
        return formData;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = this.createFormData();

        if (this.state.file) {
            console.log(this.state.renew, formData.get('renew'))
            if (this.state.paper.renew) {
                this.updatePaper(formData);
            } else {
                PaperService.addFormDataPaper(formData)
                    .then((res) => {
                        toast(res.data.message);
                        this.setState({ redirectToCarProfile: true })
                    })
                    .catch((err) => {
                        console.log(err)
                        if (err.response.status === 409) {
                            toast("Documentul deja exista. Selectati optiunea de reinoire!")
                        }
                        if (err.response.status === 403) {
                            toast("Your session has expired. Please login!");
                            this.setState({ hasTokenExpired: true });
                        }
                    });
            }
        } else {
            toast("Trebuie adaugata o imagine");
        }
    }

    render() {
        if (this.state.hasTokenExpired) {
            return <Redirect to="/login" />
        }
        if (this.state.redirectToCarProfile) {
            return <Redirect to={{
                pathname: `/car-profile/${this.state.carId}`,
                state: { macarena: '123' }
            }}
            />
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

                                                <Label sm={4}>
                                                    <Input type="checkbox" name="renew" onClick={e => this.handleCheckboxChange(e)} />{'Reinoire'}
                                                </Label>

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
                                                <Col sm={3}>
                                                    <Input
                                                        type="number"
                                                        name="cost"
                                                        id="cost"
                                                        onChange={this.handleChange}
                                                    />
                                                </Col>
                                                <Label for="period" sm={3}>Perioada</Label>
                                                <Col sm={4}>
                                                    <Input
                                                        type="select"
                                                        name="period"
                                                        id="period"
                                                        onChange={this.handleChange}
                                                    >
                                                        <option>Perioada</option>
                                                        <option value="1 luna">1 luna</option>
                                                        <option value="3 luni">3 luni</option>
                                                        <option value="6 luni">6 luni</option>
                                                        <option value="1 an">1 an</option>

                                                    </Input>
                                                </Col>
                                            </Row>
                                            {this.state.paper.type === "RCA" ?
                                                <Row>
                                                    <Label for="companyName" sm={6}>Companie asigurare</Label>
                                                    <Col sm={6}>
                                                        <Input
                                                            type="text"
                                                            name="companyName"
                                                            id="companyName"
                                                            onChange={this.handleChange}
                                                        />
                                                    </Col>
                                                </Row> : null
                                            }
                                            <Row>
                                                <Label for="details" sm={2}>Detalii</Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="textarea"
                                                        name="details"
                                                        id="details"
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
                                    <Button className="mx-auto" onClick={(e) => { this.handleSubmit(e) }}>{this.state.paper.renew ? 'Reinnoire' : 'Salveaza documentul'}</Button>
                                </Row>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>

            </Page>
        );
    }
}