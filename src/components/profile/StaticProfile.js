import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
// COMPONENTS
import EditDetails from './EditDetails';
import FuncButton from '../../util/FuncButton';
// REDUX ACTIONS
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Paper, Link as MuiLink, Typography } from '@material-ui/core';
import { LocationOn, Link as LinkIcon, CalendarToday, Edit as EditIcon, KeyboardReturn } from '@material-ui/icons';
// STYLESHEET
import profileTheme from '../../util/profileTheme';

const StaticProfile = props => {
    const { classes, profile: { handle, timeCreated, imageUrl, bio, website, location } } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} className="profile-image" alt="profile" />
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <>
                            <LocationOn color="primary" />
                            <span>{location}</span>
                            <hr />
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">{' '}{website}</a>
                            <hr />
                        </>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(timeCreated).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(profileTheme)(StaticProfile));