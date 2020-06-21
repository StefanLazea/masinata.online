import React, { useEffect, useState } from "react";
import NoteService from '../../../services/NoteService';
import PropTypes from '../../../utils/propTypes';
import { Badge, Button, Card, Col, CardHeader, CardTitle, CardBody, Label, Input, Row, FormGroup } from 'reactstrap';
import './NotesCard.css'

export default function NotesCard({
    history,
    noteType,
    onCancelButtonClick,
    car,
    note,
    refreshList,
    ...restProps
}) {
    const [disableFields, setDisabled] = useState(true);
    const [disableUrgentButton, setDisableUrgentButton] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [addForm] = useState(note === undefined);
    const [formData, setFormData] = useState({ title: "", description: "", distance: 0, urgent: false, type: "", carId: car });

    useEffect(() => {
        if (addForm) {
            setDisabled(false);
        }
    }, [addForm])

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleCheckboxChange = e => {
        setDisableUrgentButton(!disableUrgentButton);
        const { name, checked } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: checked }));
    }

    const deleteNote = id => {
        NoteService.deleteNote(id).then(() => {
            refreshList("Nota a fost stearsa");
        });
    }

    const createNote = (event) => {
        event.preventDefault();
        console.log("adaugare nota", formData)
        if (addForm) {
            NoteService.createNote(formData).then(res => {
                refreshList("Nota creata");
                onCancelButtonClick();
            });
        }
    }

    const updateNote = (event) => {
        event.preventDefault();
        console.log("editare nota", formData)

        NoteService.updateNote(note.id, formData).then(res => {
            refreshList(res.data.message);
            setEditForm(!editForm);
            setDisableUrgentButton(true);
        });
    }

    const getButton = () => {
        if (addForm) {
            return <Row>
                <Button id="submit" className="btn-success mx-auto" onClick={(e) => { createNote(e) }}>Salveaza</Button>
            </Row>
        } else if (editForm) {
            return <Row>
                <Button id="submit" className="btn-success mx-auto" onClick={(e) => { updateNote(e) }}>Edit</Button>
            </Row>
        }
        return null;
    }

    const editButtonPressed = (e) => {
        setDisabled(!disableFields);
        setEditForm(!editForm);
        console.log(note)
        setFormData(note)
    }
    return (
        <>
            <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="d-flex align-items-center">
                                <Badge color="primary">
                                    <span className="pb-2 align-middle badge-text-size">{addForm ? noteType : "Nota"}</span>
                                </Badge>
                                <Button id="deleteNote" className="btn-danger ml-auto" onClick={(e) => addForm ? onCancelButtonClick() : deleteNote(note.id)}>
                                    <i className={addForm ? "fa fa-times" : "fa fa-trash"}></i>
                                </Button>
                                {disableUrgentButton ?
                                    <Button id="prioritize" className="btn-warning">
                                        <i className="fa fa-fire"></i>
                                    </Button>
                                    : null
                                }
                                {!addForm ?
                                    <Button id="edit" className="btn-primary" onClick={(e) => editButtonPressed(e)}>
                                        <i className="fa fa-pencil"></i>
                                    </Button>
                                    : null
                                }

                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input name="urgent" type="checkbox" onClick={handleCheckboxChange} /> Urgent
                                </Label>
                            </FormGroup>

                            <Label for="distance">Kilometrii parcursi</Label>
                            <Input
                                type="number"
                                name="distance"
                                id="distance"
                                defaultValue={addForm ? '' : note.distance}
                                disabled={disableFields ? 'disabled' : ''}
                                onChange={handleChange}
                            />
                            <Label for="title">Titlu</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                defaultValue={addForm ? '' : note.title}
                                disabled={disableFields ? 'disabled' : ''}
                                onChange={handleChange}
                            />
                            <Label for="description">Descriere problema</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                defaultValue={addForm ? '' : note.description}
                                disabled={disableFields ? 'disabled' : ''}
                                onChange={handleChange}
                            />
                            {getButton()}
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

NotesCard.propTypes = {
    history: PropTypes.object,
    note: PropTypes.object,
    noteType: PropTypes.string
};

NotesCard.defaultProps = {
    notes_id: null
};

