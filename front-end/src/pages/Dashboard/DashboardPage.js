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
    }
    this.getCars();
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

  render() {
    if (this.state.hasTokenExpired === true) {
      return <Redirect to="/login" />
    }
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          {this.state.cars.length > 0 ?
            this.state.cars.map(car => <CarDetailsCard
              key={car.id}
              car_id={car.id}
              licence_plate={car.licence_plate}
              model={car.model}
              brand={car.brand}
              vin={car.vin}
            />)
            :
            <Col lg="4" md="12" sm="12" xs="12">
              <div>
                <Card>
                  <CardBody className="text-center">
                    <CardTitle>Nu exista nici o masina!</CardTitle>
                    <Button className="btn-success">Adauga masina</Button>
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