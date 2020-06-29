import React, { useEffect, useState } from 'react';
import PropTypes from '../../../utils/propTypes';
import { Button, Card, Col, CardHeader, CardTitle, CardSubtitle, CardImg, CardBody, Badge } from 'reactstrap';
import PaperService from '../../../services/PaperService.js';
import './CarDetailsCard.css'

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

export default function CarDetailsCard({
    car_id,
    brand,
    model,
    licence_plate,
    vin,
    year,
    history,
    onItemClickDeleteCar,
    ...restProps
}) {
    const [docs, setDocsPills] = useState({});

    const redirectToProfile = (e) => {
        history.push(`/car-profile/${car_id}`)
    }

    //todo set docs in order to render pills with correct values
    useEffect(() => {
        PaperService.checkTypes(car_id)
            .then(res => {
                setDocsPills(res.data);
            });
    }, [car_id]);

    const getDocsPills = () => {
        return <>
            {
                docs.ITP !== 0 ?
                    <Badge color="success" pill className="ml-auto">ITP</Badge>
                    : null
            }
            {
                docs.RCA !== 0 ?
                    < Badge color="warning" pill className={docs.ITP === 0 ? "ml-auto" : "mr-1"}>RCA</Badge>
                    : null
            }
            {
                docs.Rovigneta !== 0 ?
                    <Badge color="danger" pill className={docs.ITP === 0 && docs.RCA === 0 ? "ml-auto" : "mr-1"}>Rovigneta</Badge>
                    : null
            }
        </>
    }

    return (
        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <CardTitle><strong>{licence_plate}</strong></CardTitle>
                            <Button className="ml-auto btn-danger" onClick={(e) => { onItemClickDeleteCar(e, car_id) }}>
                                <i className="fa fa-trash"></i>
                            </Button>
                            <Button className="btn-success" onClick={(e) => { redirectToProfile(e) }}>
                                <i className="fa fa-eye"></i>
                            </Button>
                        </div>
                        <CardSubtitle>VIN {vin}</CardSubtitle>
                    </CardHeader>
                    <CardImg src={`${getBasename()}/car/image/${car_id}`} alt="Card image cap" />

                    <CardBody>
                        <div className="d-flex align-items-center">
                            <CardTitle>
                                {brand} {model}
                            </CardTitle>
                            {getDocsPills()}
                        </div>

                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

CarDetailsCard.propTypes = {
    avatar: PropTypes.string,
    avatarSize: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.object,
};

CarDetailsCard.defaultProps = {
    avatarSize: 80,
};

