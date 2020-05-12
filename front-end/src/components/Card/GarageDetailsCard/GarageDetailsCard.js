import React from "react";
import PropTypes from '../../../utils/propTypes';
import { Button, Card, Col, CardHeader, CardTitle, CardSubtitle, CardBody, Badge } from 'reactstrap';
import './GarageDetailsCard.css'

// const getBasename = () => {
//     return process.env.REACT_APP_BACK_END_URL;
// };

export default function GarageDetailsCard({
    garage_id,
    name,
    history,
    onItemClickDeleteCar,
    ...restProps
}) {

    return (
        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                    <CardHeader>
                        <div className="d-flex align-items-center">
                            <CardTitle><strong>Garajul meu</strong></CardTitle>
                            <Button className="ml-auto btn-danger" >
                                <i className="fa fa-trash"></i>
                            </Button>
                            <Button className="btn-success">
                                <i className="fa fa-eye"></i>
                            </Button>
                        </div>
                        <CardSubtitle>Altceva</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <CardTitle>
                                {name}
                            </CardTitle>
                            <Badge color="success" pill className="ml-auto">ITP</Badge>
                            <Badge color="warning" pill className="mr-1">RCA</Badge>
                            <Badge color="danger" pill className="mr-1">Rovigneta</Badge>
                        </div>

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

