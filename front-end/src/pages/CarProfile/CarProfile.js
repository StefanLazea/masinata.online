import Page from '../../components/Page';
import React from 'react';

export default class CarProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id)
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