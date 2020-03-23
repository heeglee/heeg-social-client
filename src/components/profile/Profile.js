import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
// COMPONENTS
import EditDetails from './EditDetails';
import FuncButton from '../../util/FuncButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// REDUX ACTIONS
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper, Link as MuiLink, Typography } from '@material-ui/core';
import { LocationOn, Link as LinkIcon, CalendarToday, Edit as EditIcon, KeyboardReturn } from '@material-ui/icons';
// STYLESHEET
import profileTheme from '../../util/profileTheme';

class Profile extends Component {
    handleImageChange = e => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.querySelector('#imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle, timeCreated, imageUrl, bio, website, location
                },
                loading,
                authenticated,
            },
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} className="profile-image" alt="profile" />
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                            <FuncButton tooltip='Edit Profile Picture' onClick={this.handleEditPicture} btnClassName={classes.button}>
                                <EditIcon color="primary" />
                            </FuncButton>
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
                        <FuncButton tooltip="Logout" onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </FuncButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found :( Please log in again.
                        <div className={classes.Button}>
                            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                            <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
                        </div>
                    </Typography>
                </Paper>
            )
        ) : (<ProfileSkeleton />);

        return profileMarkup;
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(profileTheme)(Profile));