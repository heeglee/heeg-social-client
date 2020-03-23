import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoImg from '../images/no-img.png';
import { Paper } from '@material-ui/core';
import { LocationOn, Link as LinkIcon, CalendarToday } from '@material-ui/icons';
import profileTheme from './profileTheme';

// TODO: correct this
const styles = {
    ...profileTheme,
    handle: {
        height: '20px',
        // backgroundColor: theme.palette.primary.main,
        width: '60px',
        margin: '0 auto 7px auto',
    },
    fullLine: {
        height: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        marginBottom: '10px',
    },
    halfLine: {
        height: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '50%',
        marginBottom: '10px',
    },
}

const ProfileSkeleton = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-img" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color="primary" />
                    <span>Location</span>
                    <hr />
                    <LinkIcon color="primary" />
                    https://website.com
                    <hr />
                    <CalendarToday color="primary" />
                    Joined
                </div>
            </div>
        </Paper>
    );
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);