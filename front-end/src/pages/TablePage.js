import Page from '../components/Page';
import React from 'react';
import CarsService from '../services/CarsService.js';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const getCars = () => {
  CarsService.getAllCars()
    .then((res) => { console.log(res.data); })
    .catch((err) => { console.log(err.message); });
}

const TablePage = () => {
  getCars();
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default TablePage;
