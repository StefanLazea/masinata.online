import React, { useEffect, useState } from 'react';
import PropTypes from '../../../utils/propTypes';
import { Button, Table } from 'reactstrap';
import PaperService from '../../../services/PaperService.js';
import UserService from '../../../services/UserProfileService.js';
import Utils from '../../../services/Utils.js';
import './PaperTable.css'
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';

export default function PaperTable({
    carId,
    userId,
    car,
    ...restProps
}) {
    const [docs, setDocsPills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUserDetails] = useState({});
    const [adminDetails, setAdminDetails] = useState({});


    useEffect(() => {
        UserService.getUserDetails()
            .then(res => {
                setAdminDetails(res.data);
            })
    }, [])

    useEffect(() => {
        UserService.getUserDetailsById(userId)
            .then(res => {
                setUserDetails(res.data);
            })
    }, [userId])

    const handleNotification = (e, paper) => {
        e.preventDefault();
        const body = {
            email: user.email,
            paperType: paper.type,
            lastname: user.lastname,
            licencePlate: car.licence_plate,
            adminEmail: adminDetails.email,
            telephone: adminDetails.phone,
        }
        setLoading(!loading);
        PaperService.notifyExpiration(body)
            .then((res) => {
                toast("Notificare trimisa");
                setLoading(false);
            });
    }

    useEffect(() => {
        PaperService.getPapersForCar(carId)
            .then(res => {
                setDocsPills(res.data);
            });
    }, [carId]);

    return (
        <>
            {
                loading ?
                    < Spinner color="primary" />
                    : null
            }
            <Table responsive>
                <thead>
                    <tr>
                        <th>Notifica expirare</th>
                        <th>Tip document</th>
                        <th>Data incepere</th>
                        <th>Data expirare</th>
                        <th>Companie</th>
                        <th>Perioada</th>
                        <th>Cost</th>
                        <th>Utilizator</th>
                        <th>Numar telefon</th>
                        {/* <th>Vizualizare detaliata</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        docs.map(paper =>
                            <tr key={paper.id}>
                                <td>
                                    <Button className="btn-warning" disabled onClick={(e) => handleNotification(e, paper)}>
                                        <i className="fa fa-bell"></i>
                                    </Button>
                                    <Button className="btn-primary" onClick={(e) => handleNotification(e, paper)}>
                                        <i className="fa fa-envelope"></i>
                                    </Button>
                                </td>
                                <td>{paper.type}</td>
                                <td>{Utils.formatData(paper.beginDate)}</td>
                                <td>{Utils.formatData(paper.expirationDate)}</td>
                                <td>{paper.companyName}</td>
                                <td>{paper.period}</td>
                                <td>{paper.cost}</td>
                                <td>{user.lastname} {user.firstname}</td>
                                <td>{user.phone}</td>
                                {/* todo show button for viewing paper page */}
                                {/* <td></td> */}
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    );
};

PaperTable.propTypes = {
    carId: PropTypes.string,
    userId: PropTypes.string,
    history: PropTypes.object,
};

PaperTable.defaultProps = {
    carId: '3a47efe0 - b9df - 11ea- 8e4e - 3566bcc554f6'
};

