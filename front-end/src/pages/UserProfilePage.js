import React from 'react';
import Page from '../components/Page';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import UserProfileService from '../services/UserProfileService.js';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index.es";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordShown: false,
      user: {
        firstname: '',
      },
      hasTokenExpired: false,
    }
    this.getUserDetails();
    this.handleChange = this.handleChange.bind(this);
  }

  getUserDetails = () => {
    UserProfileService.getUserDetails()
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.log(err.response)
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
        console.log(err.response)
        toast("An error occurred, please try later!");
        if (err.response.status === 403) {
          toast("Your session has expired. Please login!");
          this.setState({ hasTokenExpired: true });
        }
      });
  }

  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render() {
    const { isPasswordShown } = this.state;

    if (this.state.hasTokenExpired === true) {
      return <Redirect to="/login" />
    }

    return (
      <Page title="User profile" breadcrumbs={[{ name: 'user profile', active: true }]} >
        <Row>
          <Col xl={6} lg={12} md={12} className="mx-auto">
            <Card>
              <CardHeader>
                <Badge color="warning" pill className="float-right">
                  Not fully completed
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
                        <Label for="firstname">Firstname</Label>
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
                        <Label for="lastname">Lastname</Label>
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
                    <Label for="exampleEmail" sm={2}>
                      Email
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="email"
                        name="email"
                        defaultValue={this.state.user.email}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="examplePassword" sm={2}>
                      Password
                  </Label>
                    <Col sm={10}>
                      <InputGroup>
                        <Input
                          data-toggle="password"
                          type={(isPasswordShown) ? "text" : "password"}
                          name="password"
                          placeholder="password"
                        />
                        <InputGroupAddon addonType="append">
                          <Button color="secondary" onClick={this.togglePasswordVisibility}>
                            <FontAwesomeIcon icon={isPasswordShown ? faEye : faEyeSlash} />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="phone" sm={2}>
                      Phone
                  </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="phone"
                        defaultValue={this.state.user.phone}
                        onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleFile" sm={2}>
                      File
                  </Label>
                    <Col sm={10}>
                      <Input type="file" name="file" />
                      <FormText color="muted">
                        This is some placeholder block-level help text for the
                        above input. It's a bit lighter and easily wraps to a new
                        line.
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2} for="exampleAddress">Address</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="address"
                        id="exampleAddress"
                        defaultValue={this.state.user.address}
                        onChange={this.handleChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2} for="exampleAddress2">Address 2</Label>
                    <Col sm={10}>
                      <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleCity">City</Label>
                        <Input type="text" name="city" id="exampleCity" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleState">State</Label>
                        <Input type="text" name="state" id="exampleState" />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="exampleZip">Zip</Label>
                        <Input type="text" name="zip" id="exampleZip" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup row>
                    <Col className="text-center">
                      <Button onClick={(e) => { this.handleSubmit(e) }}>Save</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page >
    );

  }
};
