import Page from '../components/Page';
import React from 'react';
import CarsService from '../services/CarsService.js';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { toast } from 'react-toastify';

export default class TablePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
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
        toast(err.response.data.message.name);
      });
  }

  render() {
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
