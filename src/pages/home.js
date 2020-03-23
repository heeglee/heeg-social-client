import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { getSqueaksList } from '../redux/actions/dataActions';

import Squeak from '../components/squeak/Squeak';
import Profile from '../components/profile/Profile';
import SqueakSkeleton from '../util/SqueakSkeleton';

class home extends Component {
    componentDidMount() {
        this.props.getSqueaksList();
    }

    render() {
        const { squeaksList, loading } = this.props.data;
        let recentSqueaksMarkup = !loading ? squeaksList.map(squeak => <Squeak key={squeak.screamId} squeak={squeak} />) : (<SqueakSkeleton />);

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentSqueaksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getSqueaksList: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.data,
});

const mapActionsToProps = {
    getSqueaksList
};

export default connect(mapStateToProps, mapActionsToProps)(home);