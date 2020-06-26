import React, { useEffect, useState } from "react";
import PropTypes from '../../utils/propTypes';
import { Col, Label, Input, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import GarageService from '../../services/GarageService.js';
import './GarageSelect.css';

export default function CustomSelect({
    name,
    placeholder,
    list,
    history,
    handleChange,
    ...restProps
}) {
    // const [garages, setGarages] = useState([]);
    // useEffect(() => {
    //     const getGarages = () => {
    //         GarageService.getGaragesByUserId()
    //             .then((res) => {
    //                 setGarages(res.data);
    //             })
    //             .catch((err) => {
    //                 toast("An error occurred, please try later!");
    //                 if (err.response.status === 403) {
    //                     toast("Your session has expired. Please login!");
    //                 }
    //             });
    //     }

    //     getGarages();
    // }, []);

    return (
        <>

            <Input
                type="select"
                name={name}
                id="custom_select"
                onChange={(e) => { handleChange(e) }}
            // value={garage_id === null ? '' : garage_id}
            >
                <option>{placeholder}</option>
                {
                    list.map(g => {
                        return <option key={g.id} value={g.id}>{g.name}</option>
                    })
                }
            </Input>

        </>
    );
};

GarageSelect.propTypes = {
    history: PropTypes.object,
};

GarageSelect.defaultProps = {
}