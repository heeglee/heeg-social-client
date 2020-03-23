import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { likeSqueak, unlikeSqueak } from '../../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
// import { Dialog, DialogTitle, DialogContent, Grid, CircularProgress, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite as FavoriteIcon } from '@material-ui/icons';

const styles = {

};

class LikeButton extends Component {
    state = {
        
    };

    checkLiked = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
            return true;
        } else return false;
    };

    likeSqueak = () => {
        this.props.likeSqueak(this.props.screamId);
    };

    unlikeSqueak = () => {
        this.props.unlikeSqueak(this.props.screamId);
    };
    
    render() {
        const { authenticated } = this.props.user;

        const likeButton = !authenticated ? (
            <FuncButton tooltip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary" />
                </Link>
            </FuncButton>
        ) : (
            this.checkLiked ? (
                <FuncButton tooltip="Undo Like" onClick={this.unlikeSqueak}>
                    <FavoriteIcon color="primary" />
                </FuncButton>
            ) : (
                <FuncButton tooltip="Like" onClick={this.likeSqueak}>
                    <FavoriteBorder color="primary" />
                </FuncButton>
            )
        );

        return likeButton;
    }
}

LikeButton.propTypes = {
    likeSqueak: PropTypes.func.isRequired,
    unlikeSqueak: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapActionsToProps = {
    likeSqueak,
    unlikeSqueak
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton));