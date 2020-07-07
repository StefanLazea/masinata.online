import React, { useEffect, useState } from "react";
import PropTypes from '../../../utils/propTypes';
import GarageService from '../../../services/GarageService.js';
import AdminSelect from '../../../components/AdminSelect/AdminSelect.js';
import { Button, Card, Col, CardHeader, CardTitle, CardBody, Label, Input, Row } from 'reactstrap';
import './GarageAddEditCard.css'

export default function GarageAddEditCard({
    cardPurpose,
    garage_id,
    garage_name,
    history,
    onCancelButtonClick,
    handleChange,
    submitMethod,
    ...restProps
}) {
    const [garage, setGarage] = useState({});
    const [adminId, setAdmin] = useState("");

    const handleSelectChange = (e) => {
        handleChange(e);
        setAdmin(e.target.value);
    }

    useEffect(() => {
        const getGarageDetails = () => {
            GarageService.getGarageById(garage_id)
                .then((res) => {
                    setGarage(res.data.message)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
        if (garage_id) {
            getGarageDetails();
        }

    }, [garage_id]);

    return (
        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <div>
                    <Card>
                        <CardHeader>
                            <div className="d-flex align-items-center">
                                <CardTitle>{cardPurpose} garaj {garage_name !== undefined ?
                                    <strong>{garage_name}</strong> : null}
                                </CardTitle>

                                <Button
                                    className="ml-auto btn-danger"
                                    onClick={(e) => {
                                        onCancelButtonClick(e)
                                    }}>
                                    <i className="fa fa-times"></i>
                                </Button>
                            </div>

                        </CardHeader>
                        <CardBody>
                            <Col>
                                <Label for="name">Denumire</Label>
                                <Input
                                    type="name"
                                    name="garageName"
                                    id="name"
                                    defaultValue={garage.name}
                                    onChange={e => handleChange(e)}
                                />
                            </Col>
                            <AdminSelect
                                name="Selecteaza adminstrator"
                                defaultValue={garage.adminId ? garage.adminId : adminId}
                                handleChange={e => handleSelectChange(e)}
                            />
                            <Col>
                                <Row>
                                    <Button className="btn-success mx-auto" onClick={(e) => submitMethod(e)} >{cardPurpose} garaj</Button>
                                </Row>
                            </Col>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </>
    );
};

GarageAddEditCard.propTypes = {
    avatar: PropTypes.string,
    avatarSize: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    history: PropTypes.object,
};

GarageAddEditCard.defaultProps = {
    avatarSize: 80,
    garage_id: null
};

