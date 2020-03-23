import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// COMPONENTS
import Squeak from '../components/squeak/Squeak';
import StaticProfile from '../components/profile/StaticProfile';
import SqueakSkeleton from '../util/SqueakSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core'

const styles = {

}

class user extends Component {
    state = {
        profile: null,
        squeakIdParam: null,
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const squeakId = this.props.match.params.squeakId;

        if (squeakId) this.setState({ squeakIdParam: squeakId });

        this.props.getUserDetails(handle);

        // TODO: THIS SUCKS; requesting the same get call twice. nonsense.
        axios.get(`/user/${handle}`).then(result => {
            this.setState({
                profile: result.data.user
            });

        }).catch(e => console.log(e));
    }

    render() {
        const { squeaksList, loading } = this.props.data;
        const { squeakIdParam } = this.state;

        const squeaksMarkup = loading ? (
            <SqueakSkeleton />
        ) : squeaksList === null ? (
            <p>No squeaks from this user.</p>
        ) : !squeakIdParam ? (
            squeaksList.map(squeak => <Squeak key={squeak.screamId} squeak={squeak} />)
        ) : (
            squeaksList.map(squeak => {
                if (squeak.screamId !== squeakIdParam) return (<Squeak key={squeak.screamId} squeak={squeak} />);
                else return (<Squeak key={squeak.screamId} squeak={squeak} openDialog />);
            })
        );

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {squeaksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    data: state.data,
});

const mapActionsToProps = {
    getUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(user));