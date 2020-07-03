import React, { useEffect, useState } from 'react';
import PropTypes from '../../../utils/propTypes';
import { Button, Table } from 'reactstrap';
import PaperService from '../../../services/PaperService.js';
import Utils from '../../../services/Utils.js';
import './PaperTable.css'

// const getBasename = () => {
//     return process.env.REACT_APP_BACK_END_URL;
// };

export default function PaperTable({
    carId,
    ...restProps
}) {
    const [docs, setDocsPills] = useState([]);

    // const formatData = (data) => {
    //     var event = new Date(data);
    //     let date = JSON.stringify(event)
    //     date = date.slice(1, 11)
    //     return date;
    // }

    useEffect(() => {
        PaperService.getPapersForCar(carId)
            .then(res => {
                setDocsPills(res.data);
            });
    }, [carId]);

    return (
        <>
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
                        <th>Vizualizare detaliata</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        docs.map(paper =>
                            <tr key={paper.id}>
                                <td>
                                    <Button className="btn-warning">
                                        <i className="fa fa-bell"></i>
                                    </Button>
                                </td>
                                <td>{paper.type}</td>
                                <td>{Utils.formatData(paper.beginDate)}</td>
                                <td>{Utils.formatData(paper.expirationDate)}</td>
                                <td>{paper.companyName}</td>
                                <td>{paper.period}</td>
                                <td>{paper.cost}</td>



                                {/* <td>{car.model}</td>
                                <td>{car.brand}</td>
                                <td>{car.vin}</td>
                                <td>{car.year}</td>
                                <td>{car.userId}</td> */}

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
    history: PropTypes.object,
};

PaperTable.defaultProps = {
    carId: '3a47efe0 - b9df - 11ea- 8e4e - 3566bcc554f6'
};

