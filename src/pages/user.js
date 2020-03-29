import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// COMPONENTS
import Squeak from '../components/squeak/Squeak';
import StaticProfile from '../components/profile/StaticProfile';
import SqueakSkeleton from '../util/skeletons/SqueakSkeleton';
import ProfileSkeleton from '../util/skeletons/ProfileSkeleton';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core'

const styles = {

}

class user extends Component {
    state = {
        profile: null,
        squeakIdParam: null,
    };

    componentDidMount() {
        const username = this.props.match.params.username;
        const squeakId = this.props.match.params.squeakId;

        if (squeakId) this.setState({ squeakIdParam: squeakId });

        this.props.getUserDetails(username);

        // TODO: THIS SUCKS; requesting the same GET call twice. nonsense.
        axios.get(`/user/${username}`).then(result => {
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
            squeaksList.map(squeak => <Squeak key={squeak.squeakId} squeak={squeak} />)
        ) : (
            squeaksList.map(squeak => {
                if (squeak.squeakId !== squeakIdParam) return (<Squeak key={squeak.squeakId} squeak={squeak} />);
                else return (<Squeak key={squeak.squeakId} squeak={squeak} openDialog />);
            })
        );

        return (
            <Grid container spacing={10}>
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