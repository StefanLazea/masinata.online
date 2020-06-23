import React, { useEffect, useState } from "react";
import PropTypes from '../../utils/propTypes';
import { Col, Label, Input, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import UserService from '../../services/UserProfileService.js';
import './AdminSelect.css';

export default function AdminSelect({
    name,
    history,
    handleChange,
    ...restProps
}) {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        const getGarages = () => {
            UserService.getAllPaperAdmins()
                .then((res) => {
                    setAdmins(res.data);
                    console.log(res.data)
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
                <Label for="type" sm={12}>{name}</Label>
                <Col sm={12}>
                    <Input
                        type="select"
                        name="adminId"
                        id="admin_id"
                        onChange={(e) => { handleChange(e) }}
                    >
                        <option>Selectecteaza admin</option>
                        {
                            admins.map(admin => {
                                return <option key={admin.id} value={admin.id}>{admin.email}</option>
                            })
                        }
                    </Input>
                </Col>
            </Row>
        </>
    );
};

AdminSelect.propTypes = {
    history: PropTypes.object,
};

AdminSelect.defaultProps = {
}