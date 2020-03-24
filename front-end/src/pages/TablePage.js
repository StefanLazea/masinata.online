import Page from '../components/Page';
import React from 'react';
import { Redirect } from "react-router-dom";
import CarsService from '../services/CarsService.js';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import { Badge } from "reactstrap";

export default class TablePage extends React.Component {
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
        console.log(this.state.cars)
      })
      .catch((err) => {
        console.log(err.response)
        if (err.response.status === 403) {
          toast("Your session has expired. Please login!");
          this.setState({ hasTokenExpired: true });
        }
      });
  }

  getBadge = (isEco) => {
    if (isEco) {
      return <Badge color="success" pill className="mr-1">
        Eco
      </Badge>;
    } else {
      return <Badge color="danger" pill className="mr-1">
        Combustion
      </Badge>;
    }
  }

  render() {
    if (this.state.hasTokenExpired === true) {
      return <Redirect to="/login" />
    }
    return (
      <Page
        title="Tables"
        breadcrumbs={[{ name: 'tables', active: true }]}
        className="TablePage"
      >

        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>Cars</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Model</th>
                      <th>Brand</th>
                      <th>VIN</th>
                      <th>Year</th>
                      <th>User ID</th>
                      <th>Ecologic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.cars.map(car =>
                        <tr key={car.id}>
                          <th scope="row"> {car.id}</th>
                          <td>{car.model}</td>
                          <td>{car.brand}</td>
                          <td>{car.vin}</td>
                          <td>{car.year}</td>
                          <td>{car.userId}</td>
                          <td>{this.getBadge(car.eco)}</td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
};
