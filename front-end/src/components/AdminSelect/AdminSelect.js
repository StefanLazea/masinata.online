import React, { useEffect, useState } from "react";
import PropTypes from '../../utils/propTypes';
import { Col, Label, Input, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import GarageService from '../../services/GarageService.js';
import './GarageSelect.css';

export default function AdminSelect({
    name,
    history,
    handleChange,
    count,
    ...restProps
}) {
    const [garages, setGarages] = useState([]);
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

        getGarages();
    }, []);

    return (
        <>
            <Row>
                <Label for="type" sm={3}>{name}</Label>
                <Col sm={4}>
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
                </Col>
            </Row>
        </>
    );
};

AdminSelect.propTypes = {
    description: PropTypes.string,
    history: PropTypes.object,
    garage_id: PropTypes.string,
};

AdminSelect.defaultProps = {
    garage_id: null,
}