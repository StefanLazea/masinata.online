import Page from '../../components/Page/Page';
import React from 'react';
import { Redirect } from "react-router-dom";
import CarsService from '../../services/CarsService.js';
import PaperTable from '../../components/Table/PaperTable/PaperTable.js';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Badge } from "reactstrap";

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      hasTokenExpired: false,
      carIdView: '',
      carNumber: ''
    }
    this.getCars();
  }

  getCars = () => {
    CarsService.getAllCars()
      .then((res) => {
        this.setState({ cars: res.data })
      })
      .catch((err) => {
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
        {/* //TODO get only the cars that admin has */}
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>Masini in administrare</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Vizualizarea acte</th>
                      <th>Model</th>
                      <th>Brand</th>
                      <th>VIN</th>
                      <th>Year</th>
                      <th>Kilometrii</th>
                      <th>Ecologic</th>
                      <th>Detalii masina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.cars.map(car =>
                        <tr key={car.id}>
                          <th scope="row"> {car.id}</th>
                          <td>
                            <Button className="btn-warning" onClick={(e) => {
                              this.setState({ carIdView: car.id });
                              this.setState({ carNumber: car.licence_plate });
                            }}>
                              <i className="fa fa-eye"></i>
                            </Button>
                          </td>
                          <td>{car.model}</td>
                          <td>{car.brand}</td>
                          <td>{car.vin}</td>
                          <td>{car.year}</td>
                          <td>{car.mileage}</td>
                          <td>{this.getBadge(car.eco)}</td>
                          <td>
                            <Button className="btn-primary">
                              <i className="fa fa-eye"></i>
                            </Button>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            {
              this.state.carIdView ?
                <Card className="mb-3">
                  <CardHeader>Acte pentru <strong>{this.state.carNumber}</strong> </CardHeader>
                  <CardBody>
                    <PaperTable carId={this.state.carIdView} />
                  </CardBody>
                </Card>
                : null
            }
          </Col>
        </Row>
      </Page>
    );
  }
};
