import React, { useEffect, useState } from "react";
import PropTypes from '../../../utils/propTypes';
import { Button, Card, Col, CardHeader, CardTitle, CardBody, Badge } from 'reactstrap';
import { toast } from 'react-toastify';
import CarsService from '../../../services/CarsService.js';
import UserService from '../../../services/UserProfileService.js';
import './GarageDetailsCard.css'

export default function GarageDetailsCard({
    garage_id,
    name,
    history,
    adminView,
    adminId,
    onItemClickDeleteGarage,
    onItemClickEditGarage,
    ...restProps
}) {
    const [carsNumber, setCarsNumber] = useState(0);
    const [admin, setAdmin] = useState({});

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
    });

    useEffect(() => {
        UserService.getAdminDetails(adminId)
            .then(res => setAdmin(res.data))
            .catch((err) => {
                console.log(err.response)
            });
    }, [adminId])

    const getButtons = () => {
        return <>{
            !adminView ?
                <Button className="ml-auto btn-danger" onClick={(e) => { onItemClickDeleteGarage(e, garage_id) }}>
                    <i className="fa fa-trash"></i>
                </Button>
                : null
        }
            {
                !adminView ?
                    <Button className="btn-warning" onClick={(e) => { onItemClickEditGarage(e, garage_id, name) }}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                    : null
            }
        </>;
    }
    return (
        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <CardTitle>Garajul <strong>{name}</strong></CardTitle>
                            {getButtons()}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <CardTitle>
                                Masini care apartin garajului
                            </CardTitle>
                            <Badge color="success" pill className="ml-auto">{carsNumber}</Badge>
                        </div>
                        <div className="d-flex align-items-center">
                            {!adminView ?
                                <>
                                    <CardTitle>Admin garaj</CardTitle>
                                    <Badge color="success" pill className="ml-auto">{admin.email}</Badge>
                                </>
                                : null
                            }
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

GarageDetailsCard.propTypes = {
    history: PropTypes.object,
};

GarageDetailsCard.defaultProps = {
};

