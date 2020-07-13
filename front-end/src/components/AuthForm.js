import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import AuthService from '../services/AuthService.js';
import { setTokenToLocalStorage } from "../services/Token";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ' ',
      email: ' ',
      confirmPassword: '',
      companyName: '',
      redirectToDashboard: false,
      redirectToLogin: false,
      isPaperAdmin: false,
    }
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();
    this.props.onChangeAuthState(authState);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckboxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  handleError = (e) => {
    if (e.response !== undefined) {
      let errorMessage = e.response.data.message
      if (typeof errorMessage === 'object') {
        for (let error of Object.values(errorMessage)) {
          toast(error);
        }
      } else {
        toast(errorMessage);
      }
    }
  }

  handleForgotPassword = (e) => {

  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.authState === STATE_SIGNUP) {

      const form = {
        email: this.state.email,
        password: this.state.password,
        repeat_password: this.state.confirmPassword,
        isPaperAdmin: this.state.isPaperAdmin,
        companyName: this.state.companyName,
      }

      AuthService.register(form)
        .then((res) => {
          toast(res.data.message);
          this.setState({ redirectToLogin: true });
        })
        .catch(error => {
          this.handleError(error);
        });
    }

    if (this.props.authState === STATE_LOGIN) {
      const form = {
        email: this.state.email,
        password: this.state.password,
      }

      AuthService.login(form)
        .then((res) => {
          setTokenToLocalStorage(res.data.token);
          this.setState({ redirectToDashboard: true });
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      companyNameLabel,
      companyNameInputProps,
      children,
    } = this.props;

    if (this.state.redirectToDashboard === true) {
      return <Redirect to='/' />
    }

    if (this.state.redirectToLogin === true) {
      toast("Please login to continue your experience!")
      return <Redirect to="/login" />
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input name="email" {...usernameInputProps} onChange={e => this.handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input name="password" {...passwordInputProps} onChange={e => this.handleChange(e)} />
        </FormGroup>
        {
          this.isSignup ?
            <FormGroup>
              <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
              <Input name="confirmPassword" {...confirmPasswordInputProps} onChange={e => this.handleChange(e)} />
            </FormGroup>
            : null
        }
        {
          this.isSignup ?
            <FormGroup check>
              <Label check>
                <Input name="isPaperAdmin" type="checkbox" onClick={e => this.handleCheckboxChange(e)} />
            Administrator acte
               </Label>
            </FormGroup>
            : null
        }
        {this.state.isPaperAdmin ?
          <div>

            <FormGroup>
              <Label for={companyNameLabel}>{companyNameLabel}</Label>
              <Input name="companyName" {...companyNameInputProps} onChange={e => this.handleChange(e)} />
            </FormGroup>
          </div>
          : null
        }
        <Row>
          <Col style={{ 'margin-left': '10px' }}>
            <Label check>
              <Input type="checkbox" />{' '}
              {this.isSignup ? 'Accept termenii si conditiile' : 'Remember me'}
            </Label>
          </Col>
          <Col className="d-flex align-items-center">
            <Button
              color="link"
              style={{ 'padding': '0' }}
              className="ml-auto"
              onClick={(e) => this.handleForgotPassword(e)}
            >
              Am uitat parola
            </Button>
          </Col>
        </Row>


        <hr />
        <Button
          size="lg"
          className="bg-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
                <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                  Signup
                </a>
              )}
          </h6>
        </div>

        {children}
      </Form >
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  companyNameLabel: PropTypes.string,
  companyNameInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Parola',
  passwordInputProps: {
    type: 'password',
    placeholder: 'parola',
  },
  confirmPasswordLabel: 'Confirma parola',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirma parola',
  },
  companyNameLabel: 'Numele companiei',
  companyNameInputProps: {
    type: 'text',
    placeholder: 'Asirom SRL',
  },
};

export default AuthForm;
