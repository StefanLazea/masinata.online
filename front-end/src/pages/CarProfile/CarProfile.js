import Page from '../../components/Page';
import { Row, Col } from 'reactstrap';
import React from 'react';
import CarsService from '../../services/CarsService';
import { toast } from 'react-toastify';

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            car: null
        }
        this.getCarsById();
    }

    getCarsById = () => {
        console.log(this.props.match.params.id)
        CarsService.getCarById(this.props.match.params.id)
            .then((res) => {
                this.setState({ car: res.data.message });
                console.log(res.data)
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    }
    render() {
        return (

            <Page
                className="CarProfile"
                title="Car Profile"
                breadcrumbs={[{ name: 'Car Profile', active: true }]}
            >

                <Row>
                    <Col>
                    </Col>
                </Row>
            </Page>
        );
    }
}