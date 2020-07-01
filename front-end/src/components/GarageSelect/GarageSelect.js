import React, { useEffect, useState } from "react";
import PropTypes from '../../utils/propTypes';
import { Col, Label, Input, Row, Badge } from 'reactstrap';
import { toast } from 'react-toastify';
import GarageService from '../../services/GarageService.js';
import './GarageSelect.css';

export default function GarageSelect({
    name,
    garage_id,
    history,
    handleChange,
    adminView,
    count,
    ...restProps
}) {
    const [garages, setGarages] = useState([]);
    const [garage, setGarage] = useState({});

    useEffect(() => {
        const getGarages = () => {
            GarageService.getGaragesByUserId()
                .then((res) => {
                    setGarages(res.data);
                })
                .catch((err) => {
                    toast("An error occurred, please try later!");
                    if (err.response.status === 403) {
                        toast("Your session has expired. Please login!");
                    }
                });
        }
        const getGarageInfo = () => {
            GarageService.getGarageById(garage_id)
                .then((res) => {
                    setGarage(res.data.message);
                    console.log(garage_id === null ? '' : garage_id)
                });
        }
        console.log(garage_id, garage_id === null)
        if (garage_id !== null && adminView) {
            getGarageInfo();
        } else {
            getGarages();
        }
    }, [garage_id, adminView]);

    return (
        <>
            <Row>
                <Label for="type" sm={3}>{name}</Label>
                <Col sm={4}>
                    {
                        !adminView ?
                            <Input
                                type="select"
                                name="garageId"
                                id="garage_id"
                                onChange={(e) => { handleChange(e) }}
                                value={garage_id === null ? '' : garage_id}
                            >
                                <option>Selectecteaza garaj</option>
                                {
                                    garages.map(g => {
                                        return <option key={g.id} value={g.id}>{g.name}</option>
                                    })
                                }
                            </Input>
                            :
                            < Badge color="warning" className="ml-auto">{garage.name}</Badge>
                    }

                </Col>
            </Row>
        </>
    );
};

GarageSelect.propTypes = {
    description: PropTypes.string,
    history: PropTypes.object,
    garage_id: PropTypes.string,
    adminView: PropTypes.bool,
};

GarageSelect.defaultProps = {
    garage_id: null,
}