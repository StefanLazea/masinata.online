import React from "react";
import PropTypes from '../../../utils/propTypes';
import { Button, Card, Col, CardHeader, CardTitle, CardBody, Label, Input, Row } from 'reactstrap';
import './GarageAddEditCard.css'

export default function GarageAddEditCard({
    cardPurpose,
    garage_id,
    history,
    onCancelButtonClick,
    handleChange,
    submitMethod,
    ...restProps
}) {
    return (

        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <div>
                    <Card>
                        <CardHeader>
                            <div className="d-flex align-items-center">
                                <CardTitle>{cardPurpose} garaj</CardTitle>

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
                                    onChange={e => handleChange(e)}
                                />
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
};

