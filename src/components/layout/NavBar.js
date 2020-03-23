import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
import PostSqueak from '../squeak/PostSqueak';
import Notifications from './Notifications';
// MATERIAL-UI
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Home as HomeIcon } from '@material-ui/icons';

class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <>
                            <PostSqueak />
                            <Link to="/">
                                <FuncButton tooltip="Home">
                                    <HomeIcon color="primary" />
                                </FuncButton>
                            </Link>
                            <Notifications />
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
});;

const mapActionsToProps = {

};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);