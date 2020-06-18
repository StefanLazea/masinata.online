import React, { useEffect, useState } from "react";
import NoteService from '../../../services/NoteService';
import PropTypes from '../../../utils/propTypes';
import { Badge, Button, Card, Col, CardHeader, CardTitle, CardBody, Label, Input, Row } from 'reactstrap';
import './NotesCard.css'

export default function NotesCard({
    history,
    note,
    refreshList,
    ...restProps
}) {
    const [disableFields, setDisabled] = useState(true);
    useEffect(() => {
        console.log(note)
    }, [note])

    const deleteNote = id => {
        NoteService.deleteNote(id).then(() => {
            refreshList();
        });
    }

    return (
        <>
            <Col lg="3" md="12" sm="12" xs="12">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="d-flex align-items-center">
                                <Badge color="primary">
                                    <span className="pb-2 align-middle badge-text-size">Note 1</span>
                                </Badge>
                                <Button id="deleteNote" className="btn-danger ml-auto" onClick={(e) => deleteNote(note.id)}>
                                    <i className="fa fa-trash"></i>
                                </Button>
                                <Button id="prioritize" className="btn-warning">
                                    <i className="fa fa-level-up"></i>
                                </Button>
                                <Button id="edit" className="btn-primary" onClick={(e) => setDisabled(!disableFields)}>
                                    <i className="fa fa-pencil"></i>
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Col>
                            <Label for="distance">Kilometrii parcursi</Label>
                            <Input
                                type="number"
                                name="distance"
                                id="distance"
                                disabled={disableFields ? 'disabled' : ''}
                            />
                            <Label for="title">Titlu</Label>
                            <Input
                                type="number"
                                name="title"
                                id="title"
                                disabled={disableFields ? 'disabled' : ''}
                            />
                            <Label for="description">Descriere problema</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                disabled={disableFields ? 'disabled' : ''}
                            />
                            <Row>
                                <Button id="submit" className="btn-success mx-auto">Salveaza</Button>
                            </Row>
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

NotesCard.propTypes = {
    history: PropTypes.object,
    note: PropTypes.object
};

NotesCard.defaultProps = {
    notes_id: null
};

