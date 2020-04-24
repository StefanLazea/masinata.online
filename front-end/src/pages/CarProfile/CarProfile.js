import Page from '../../components/Page';
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import React from 'react';
import {
    Button,
    Col,
    Row
} from 'reactstrap';

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }


    render() {

        return (

            <Page
                className="CarProfile"
                title="Car Profile"
                breadcrumbs={[{ name: 'Car Profile', active: true }]}
            >

            </Page>
        );
    }
}