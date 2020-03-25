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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index.es";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordShown: false,
      user: {}
    }
    this.getUserDetails();
  }

  getUserDetails = () => {
    UserProfileService.getUserDetails()
      .then((res) => {
        console.log(res)
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.user)
    UserProfileService.postUserDetails(this.state.user)
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) });
  }

  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  render() {
    const { isPasswordShown } = this.state;
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
                          placeholder={this.state.user.firstname ? this.state.user.firstname : "Add firstname"} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="lastname">Lastname</Label>
                        <Input
                          id="lastname"
                          type="lastname"
                          name="lastname"
                          placeholder={this.state.user.lastname ? this.state.user.lastname : "Add lastname"} />
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
                        placeholder="ionpopescu@gmail.com"
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
                      <Input type="text" name="phone" placeholder="0748587117" />
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
                      <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
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
