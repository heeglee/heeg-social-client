import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { getSqueak, clearErrors } from '../../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, Grid, CircularProgress, Typography } from '@material-ui/core';
import { Close as CloseIcon, UnfoldMore, Chat as ChatIcon } from '@material-ui/icons';

const styles = {
    closeButton: {
        position: 'absolute',
        left: '90%',
    },

    invisibleSeparator: {
        border: 'none',
        margin: '4px',
    },

    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },

    profileImage: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        objectFit: 'cover'
    },

    dialogContent: {
        padding: '20px',
    },

    spinnerDiv: {
        textAlign: 'center',
        margin: '50px auto',
    },
};

// TODO: squeak.user - user.handle
class SqueakDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: '',
    };

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        const { user, squeakId } = this.props;

        let oldPath = window.location.pathname;
        const newPath = `/users/${user}/squeak/${squeakId}`;

        if (oldPath === newPath) oldPath = `/users/${user}`;

        window.history.pushState(null, null, newPath);

        this.setState({
            open: true,
            oldPath,
            newPath
        });
        this.props.getSqueak(this.props.squeakId);
    };

    // TODO: add clearErrors()
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {
        const { classes, squeak: {
            squeakId, body, timeCreated, userImage, countLike, countComment, user, comments
        }, ui: {
            loading
        }} = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${user}`}>@{user}</Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(timeCreated).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <LikeButton squeakId={squeakId} />
                    <span>{countLike} likes</span>
                    <FuncButton tooltip="Comments">
                        <ChatIcon color="primary" />
                    </FuncButton>
                    <span>{countComment} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm squeakId={squeakId} />
                <Comments comments={comments} />
            </Grid>
        );

        return (
            <>
                <FuncButton onClick={this.handleOpen} tooltip="Expand Squeak" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </FuncButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <FuncButton tooltip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </FuncButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

SqueakDialog.propTypes = {
    getSqueak: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    squeakId: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    squeak: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    squeak: state.data.squeak,
    ui: state.ui
});

const mapActionsToProps = {
    getSqueak,
    clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SqueakDialog));