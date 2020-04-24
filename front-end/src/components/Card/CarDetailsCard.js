import React from 'react';
import PropTypes from '../../utils/propTypes';

import { Button, Card, Col, CardHeader, CardTitle, CardSubtitle, CardImg, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom'
import CarProfile from "../../pages/CarProfile/CarProfile"

const CarDetailsCard = ({
    car_id,
    brand,
    model,
    licence_plate,
    vin,
    year,
    ...restProps
}) => {
    const clickBtn = (e) => {
        console.log(car_id);
    }

    const redirectToProfile = (e) => {
        console.log("aici")
    }

    return (
        <Col lg="4" md="12" sm="12" xs="12">
            <Card>
                <CardHeader onClick={(e) => { redirectToProfile(e) }}>
                    <div className="d-flex align-items-center">
                        <CardTitle><strong>{licence_plate}</strong></CardTitle>
                        <Button className="ml-auto btn-warning">
                            <i className="fa fa-pencil"></i>
                        </Button>
                        <Button className="btn-danger" onClick={(e) => { clickBtn(e) }}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                    <CardSubtitle>VIN {vin}</CardSubtitle>
                </CardHeader>
                <CardImg width="50%" height="50%" src="https://via.placeholder.com/75.png" alt="Card image cap" />

                <CardBody>
                    <CardTitle>{brand} {model}</CardTitle>
                </CardBody>
            </Card>
        </Col>
    );
};

CarDetailsCard.propTypes = {
    avatar: PropTypes.string,
    avatarSize: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
};

CarDetailsCard.defaultProps = {
    avatarSize: 80,
};

export default CarDetailsCard;
