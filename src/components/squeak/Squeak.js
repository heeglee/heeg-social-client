import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
import LikeButton from './LikeButton';
import DeleteSqueak from './DeleteSqueak';
import SqueakDialog from './SqueakDialog';
// REDUX ACTIONS
import { connect } from 'react-redux';
// import { likeSqueak, unlikeSqueak } from '../../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Chat as ChatIcon } from '@material-ui/icons';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: '20px',
    },
    image: {
        minWidth: '200px',
    },
    content: {
        padding: '25px',
        objectFit: 'cover',
    },
};

class Squeak extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            squeak: {
                body, timeCreated, user, screamId, likeCount, commentCount
            },
            user: {
                authenticated, credentials: {
                    handle
                },
            },
        } = this.props;

        const deleteButton = authenticated && user === handle ? (
            <DeleteSqueak screamId={screamId} />
        ) : null;

        const placeholder = "https://placekitten.com/100/100";

        // TODO: place image
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={placeholder} title="Profile Image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${user}`} color="primary">{user}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(timeCreated).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <FuncButton tooltip="Comments">
                        <ChatIcon color="primary" />
                    </FuncButton>
                    <span>{commentCount} Comments</span>
                    <SqueakDialog squeakId={screamId} user={user} openDialog={this.props.openDialog} />
                    {deleteButton}
                </CardContent>
            </Card>
        )
    }
}

Squeak.propTypes = {
    // likeSqueak: PropTypes.func.isRequired,
    // unlikeSqueak: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    squeak: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapActionsToProps = {
    // likeSqueak,
    // unlikeSqueak
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Squeak));