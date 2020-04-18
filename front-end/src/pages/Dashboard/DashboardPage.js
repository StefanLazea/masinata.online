import { AnnouncementCard } from '../../components/Card';
import Page from '../../components/Page';
import SupportTicket from '../../components/SupportTicket';
import { CarDetailsCard } from '../../components/Card';
import {
  supportTicketsData,
} from '../../demos/dashboardPage';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardImg,
  Col,
  Row
} from 'reactstrap';
import './DashboardPage.css';

export default class DashboardPage extends React.Component {

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
            <AnnouncementCard
              color="secondary"
              header="Announcement"
              avatarSize={60}
              name="Jamy"
              date="1 hour ago"
              text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
              buttonProps={{
                children: 'show',
              }}
              style={{ height: 500 }}
            />
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <CardTitle><strong>AG 77 VOB</strong></CardTitle>
                  <Button className="ml-auto btn-warning">
                    <i className="fa fa-pencil"></i>
                  </Button>
                  <Button className="btn-danger">
                    <i className="fa fa-trash"></i>
                  </Button>
                </div>
                <CardSubtitle>VIN s4d5f67g980h9j</CardSubtitle>
              </CardHeader>
              <CardImg width="50%" height="50%" src="https://via.placeholder.com/75.png" alt="Card image cap" />

              <CardBody>
                <CardTitle>Dacia Logan</CardTitle>
              </CardBody>
            </Card>
          </Col>
          <CarDetailsCard />
          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <CardTitle><strong>AG 77 VOB</strong></CardTitle>
                  <Button className="ml-auto btn-warning">
                    <i className="fa fa-pencil"></i>
                  </Button>
                  <Button className="btn-danger">
                    <i className="fa fa-trash"></i>
                  </Button>
                </div>
                <CardSubtitle>VIN s4d5f67g980h9j</CardSubtitle>
              </CardHeader>
              <CardImg width="50%" height="50%" src="https://via.placeholder.com/75.png" alt="Card image cap" />

              <CardBody>
                <CardTitle>Dacia Logan</CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Support Tickets</span>
                  <Button>
                    <small>View All</small>
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {supportTicketsData.map(supportTicket => (
                  <SupportTicket key={supportTicket.id} {...supportTicket} />
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}