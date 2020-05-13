import React, { useEffect, useState } from "react";
import PropTypes from '../../../utils/propTypes';
import { Button, Card, Col, CardHeader, CardTitle, CardBody, Badge } from 'reactstrap';
import { toast } from 'react-toastify';
import CarsService from '../../../services/CarsService.js';
import './GarageDetailsCard.css'

export default function GarageDetailsCard({
    garage_id,
    name,
    history,
    onItemClickDeleteGarage,
    ...restProps
}) {
    const [carsNumber, setCarsNumber] = useState(0);
    useEffect(() => {
        CarsService.getCarsByGarageId(garage_id)
            .then((res) =>
                setCarsNumber(res.data.length))
            .catch((err) => {
                console.log(err.response)
                toast("An error occurred, please try later!");
                if (err.response.status === 403) {
                    toast("Your session has expired. Please login!");
                    this.setState({ hasTokenExpired: true });
                }
            });
    })
    return (
        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <CardTitle>Garajul <strong>{name}</strong></CardTitle>
                            <Button className="ml-auto btn-danger" onClick={(e) => { onItemClickDeleteGarage(e, garage_id) }}>
                                <i className="fa fa-trash"></i>
                            </Button>
                            <Button className="btn-warning">
                                <i className="fa fa-pencil"></i>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <CardTitle>
                                Masini care apartin garajului
                            </CardTitle>
                            <Badge color="success" pill className="ml-auto">{carsNumber}</Badge>
                        </div>

                        <CardTitle>
                            Admin garaj
                            <Button className="btn-success">
                                <i className="fa fa-eye"></i>
                            </Button>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

GarageDetailsCard.propTypes = {
    avatar: PropTypes.string,
    avatarSize: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.object,
};

GarageDetailsCard.defaultProps = {
    avatarSize: 80,
};

