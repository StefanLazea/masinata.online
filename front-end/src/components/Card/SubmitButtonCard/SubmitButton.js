import React from 'react';
import { Button, Card, CardHeader, CardTitle } from 'reactstrap';
import './SubmitButton.css'

export default function SubmitButton({
    name,
    updateCar,
    ...restProps
}) {

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Button className="d-flex mx-auto" onClick={(e) => updateCar(e)}>{name}</Button>
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    );
};
