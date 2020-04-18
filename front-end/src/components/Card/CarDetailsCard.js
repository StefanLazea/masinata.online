import React from 'react';
import PropTypes from '../../utils/propTypes';

import { Button, Card, Col, CardHeader, CardTitle, CardSubtitle, CardImg, CardBody } from 'reactstrap';

const UserCard = ({
    avatar,
    avatarSize,
    title,
    subtitle,
    text,
    ...restProps
}) => {

    return (
        <Col lg="4" md="12" sm="12" xs="12">
            <Card>
                <CardHeader>
                    <div className="d-flex align-items-center">
                        <CardTitle><strong>AG 72 VOB</strong></CardTitle>
                        <Button className="ml-auto btn-warning">
                            <i className="fa fa-pencil"></i>
                        </Button>
                        <Button className="btn-danger">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                    <CardSubtitle>VIN s4d5f67g980h9j</CardSubtitle>
                </CardHeader>
                <CardImg width="50%" height="50%" src="https://via.placeholder.com/75.png" alt="Card image cap" />

                <CardBody>
                    <CardTitle>Dacia Logan</CardTitle>
                </CardBody>
            </Card>
        </Col>
    );
};

UserCard.propTypes = {
    avatar: PropTypes.string,
    avatarSize: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
};

UserCard.defaultProps = {
    avatarSize: 80,
};

export default UserCard;
