import Page from '../../components/Page';
import { CarDetailsCard } from '../../components/Card';
import CarsService from '../../services/CarsService.js';
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row
} from 'reactstrap';
import './DashboardPage.css';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      hasTokenExpired: false,
      isDeleteButtonClicked: false,
      redirectToAddCarPage: false
    }
  }

  getCars = () => {
    CarsService.getAllCars()
      .then((res) => {
        this.setState({ cars: res.data })
        console.log(res.data)
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast("Your session has expired. Please re-login!");
          this.setState({ hasTokenExpired: true });
        }
      });
  }

  onItemClickDeleteCar = (e, car_id) => {
    CarsService.deleteCar(car_id).then((response) => {
      toast(response.data.message);
      this.getCars();
    }).catch((err) => {
      console.log(err)
      toast("An error occurred, please try later!");
      if (err.response.status === 403) {
        toast("Your session has expired. Please login!");
        this.setState({ hasTokenExpired: true });
      }
    });
  };

  componentDidMount() {
    this.getCars();
  }

  render() {
    if (this.state.hasTokenExpired === true) {
      return <Redirect to="/login" />
    }
    if (this.state.redirectToAddCarPage) {
      return <Redirect to="/add/car" />
    }
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
        addCarButton={this.state.cars.length === 0 ? false : true}
        history={this.props.history}
      >
        <Row>
          {this.state.cars.length > 0 ?
            this.state.cars.map(car =>
              <CarDetailsCard
                key={car.id}
                car_id={car.id}
                licence_plate={car.licence_plate}
                model={car.model}
                brand={car.brand}
                vin={car.vin}
                history={this.props.history}
                onItemClickDeleteCar={this.onItemClickDeleteCar}
              />)
            :
            <Col lg="4" md="12" sm="12" xs="12">
              <div>
                <Card>
                  <CardBody className="text-center">
                    <CardTitle>Nu exista nici o masina!</CardTitle>
                    <Button className="btn-success" onClick={(e) => this.setState({ redirectToAddCarPage: true })} >Adauga masina</Button>
                  </CardBody>
                </Card>
              </div>
            </Col>
          }
        </Row>
      </Page>
    );
  }
}