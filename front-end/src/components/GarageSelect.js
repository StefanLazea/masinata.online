import React, { useEffect, useState } from "react";
import PropTypes from '../utils/propTypes';
import { Col, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import GarageService from '../services/GarageService.js';

export default function GarageSelect({
    name,
    garage_id,
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
                    console.log(err.response)
                    toast("An error occurred, please try later!");
                    if (err.response.status === 403) {
                        toast("Your session has expired. Please login!");
                        this.setState({ hasTokenExpired: true });
                    }
                });
        }

        getGarages();
    }, []);

    return (
        <>
            <Label for="type" sm={5}>Adaugati un garaj</Label>
            <Col sm={7}>
                <Input
                    type="select"
                    name="garageId"
                    id="garage_id"
                    onChange={(e) => { handleChange(e) }}
                    value={garage_id}
                >
                    <option>Selectecteaza garaj</option>
                    {
                        garages.map(g => {
                            return <option key={g.id} value={g.id}>{g.name}</option>
                        })
                    }
                </Input>
            </Col>
        </>
    );
};

GarageSelect.propTypes = {
    history: PropTypes.object,
    garage_id: PropTypes.string,
};

GarageSelect.defaultProps = {
    garage_id: null,
}