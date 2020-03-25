import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
// MATERIAL-UI
import { Menu, Badge, Tooltip, IconButton, MenuItem, Typography } from '@material-ui/core';
import { Notifications as NotificationsIcon, Favorite as FavoriteIcon, Chat as ChatIcon } from '@material-ui/icons';

// TODO: test this whole thing
class Notifications extends Component {
    state = {
        anchorEl: null,
    }

    handleOpen = e => {
        this.setState({ anchorEl: e.target });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onMenuOpened = () => {
        let unreadNotiId = this.props.notifications.filter(noti => !noti.read).map(noti => noti.notificationId);
        this.props.markNotificationsRead(unreadNotiId);
    }

    render() {
        const { notifications } = this.props;
        const { anchorEl } = this.state;

        dayjs.extend(relativeTime);

        let notiIcon;
        if (notifications && notifications.length > 0) {
            let countUnreadNoti = notifications.filter(noti => noti.read === false).length;
            countUnreadNoti > 0 ? (
                notiIcon = (
                    <Badge badgeContent={countUnreadNoti} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                )
            ) : (
                notiIcon = <NotificationsIcon />
            );
        } else {
            notiIcon = <NotificationsIcon />
        }

        let notiMarkup = notifications && notifications.length > 0 ? (
            notifications.map(noti => {
                const verb = noti.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(noti.timeCreated).fromNow();
                const iconColor = noti.read ? 'primary' : 'secondary';
                const icon = noti.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight: '10px' }} />
                ) : (
                    <ChatIcon color={iconColor} style={{ marginRight: '10px' }} />
                );

                return (
                    <MenuItem key={noti.timeCreated} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link} color="default" variant="body1" to={`/users/${noti.recipient}/squeak/${noti.squeakId}`}>
                            {noti.sender} {verb} your squeak {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>You have no notifications yet.</MenuItem>
        );

        return (
            <>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleOpen}>
                        {notiIcon}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
                    {notiMarkup}
                </Menu>
            </>
        );
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications : PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    notifications: state.user.notifications
});

const mapActionsToProps = {
    markNotificationsRead
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);