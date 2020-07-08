import React from 'react';
import Page from '../../components/Page/Page';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import UserProfileService from '../../services/UserProfileService.js';
import CarsService from '../../services/CarsService.js';
import GarageService from '../../services/GarageService.js';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import './UserProfilePage.css';


export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstname: '',
      },
      hasTokenExpired: false,
      numberOfCars: 0,
      numberOfGarages: 0
    }
    this.getUserDetails();
    this.getCarsNumber();
    this.getGaragesNumber();
    this.handleChange = this.handleChange.bind(this);
  }

  getGaragesNumber = () => {
    GarageService.getGaragesByUserId(this.state.user.id)
      .then(response => {
        this.setState({ numberOfGarages: response.data.length });
      })
  }

  getCarsNumber = () => {
    CarsService.getAllCarsByUserId()
      .then((res) =>
        this.setState({ numberOfCars: res.data.length }));
  }

  getUserDetails = () => {
    UserProfileService.getUserDetails()
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast("Your session has expired. Please login!");
          this.setState({ hasTokenExpired: true });
        }
      });
  }

  handleChange = (e) => {
    const user = { ...this.state.user, [e.target.name]: e.target.value }
    this.setState(() => ({ user }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    UserProfileService.updateUserDetails(this.state.user)
      .then((res) => { toast(res.data.message); })
      .catch((err) => {
        if (err.response.status === 403) {
          toast("Your session has expired. Please login!");
          this.setState({ hasTokenExpired: true });
        }
        this.handleError(err);
      });
  }

  handleError = (e) => {
    if (e.response !== undefined) {
      console.log(e.response)
      let errorMessage = e.response.data;
      if (typeof errorMessage === 'object') {
        for (let error of Object.values(errorMessage)) {
          toast(error);
        }
      } else {
        toast(errorMessage);
      }
    }
  }

  render() {
    if (this.state.hasTokenExpired === true) {
      return <Redirect to="/login" />
    }

    return (
      <Page title="Profil" breadcrumbs={[{ name: 'Profil', active: true }]} >
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card id="userDetails">
              <CardHeader>
                <Badge color="warning" pill className="float-right">
                  Incomplet
                </Badge>
                <Badge color="success" pill className="float-right">
                  {this.state.user.role}
                </Badge>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="firstname">Prenume</Label>
                        <Input
                          type="firstname"
                          name="firstname"
                          id="firstname"
                          defaultValue={this.state.user.firstname}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="lastname">Nume</Label>
                        <Input
                          id="lastname"
                          type="lastname"
                          name="lastname"
                          defaultValue={this.state.user.lastname}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="text"
                          name="email"
                          id="email"
                          defaultValue={this.state.user.email}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="phone">Telefon</Label>
                        <Input
                          type="text"
                          name="phone"
                          id="phone"
                          defaultValue={this.state.user.phone}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={2} for="address">Adresa</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        defaultValue={this.state.user.address}
                        onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleCity">Oras</Label>
                        <Input type="text" name="city" id="exampleCity" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleState">Judet</Label>
                        <Input type="text" name="state" id="exampleState" />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="exampleZip">Cod</Label>
                        <Input type="text" name="zip" id="exampleZip" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup row>
                    <Col className="text-center">
                      <Button onClick={(e) => { this.handleSubmit(e) }}>Salveaza</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <img id="avatar" src="https://api.adorable.io/avatars/173/abott@adorable.png" className="rounded-circle mx-auto" alt="avatar"></img>
                </div>
                <div id="statistics" className="d-flex align-items-center">
                  <Badge color="warning" className="mx-auto">
                    <i className="fa fa-car"> {this.state.numberOfCars}</i>
                  </Badge>
                  <Badge color="warning" className="mx-auto">
                    <i className="fa fa-home"> {this.state.numberOfGarages}</i>
                  </Badge>
                  <Badge color="warning" className="mx-auto">
                    <i className="fa fa-paperclip"> {this.state.numberOfCars}</i>
                  </Badge>
                </div>
                <div id="userEmail" className="d-flex align-items-center">
                  <Label className="mx-auto">{this.state.user.email}</Label>
                </div>

              </CardBody>
            </Card>
          </Col>

        </Row>
      </Page >
    );

  }
};
