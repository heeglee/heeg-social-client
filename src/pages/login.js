import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
// MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
// STYLESHEET
import authTheme from '../util/authTheme';
// RESOURCES
import AppIcon from '../images/squirrel.png';

class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData, this.props.history);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} className={classes.mainLogo} alt="SQUEAKER" />
                    <Typography variant="h2" className={classes.pageTitle}>
                        LOGIN
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="E-mail address"
                            className={classes.TextField} value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password"
                            className={classes.TextField} value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true : false} fullWidth />
                        {errors.general && (<Typography variant="body2" className={classes.customError}>{errors.general}</Typography>)} {/* CHK */}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <small>Don't have an account? <Link to="/signup">Sign up!</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui,
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(authTheme)(login));