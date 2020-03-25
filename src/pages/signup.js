import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';
// MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
// STYLESHEET
import authTheme from '../util/authTheme';
// RESOURCES
import AppIcon from '../images/squirrel.png';

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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
        this.setState({ loading: true });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        };

        this.props.signUpUser(newUserData, this.props.history);
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
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} className={classes.mainLogo} alt="SQUEAKER" />
                    <Typography variant="h2" className={classes.pageTitle}>
                        SIGN UP
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="E-mail address"
                            className={classes.TextField} value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth />
                        <TextField id="password" name="password" type="password" label="Password"
                            className={classes.TextField} value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true : false} fullWidth />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password"
                            className={classes.TextField} value={this.state.confirmPassword} onChange={this.handleChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} fullWidth />
                        <TextField id="handle" name="handle" type="text" label="User Name"
                            className={classes.TextField} value={this.state.handle} onChange={this.handleChange} helperText={errors.handle} error={errors.handle ? true : false} fullWidth />
                        {/* {errors.general && (<Typography variant="body2" className={classes.customError}>{errors.general}</Typography>)} */}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Sign Up
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <small>Already have an account? <Link to="/login">Login!</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps, { signUpUser })(withStyles(authTheme)(signup));