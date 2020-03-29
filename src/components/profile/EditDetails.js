import React, { Component } from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
// STYLESHEET
import mainTheme from '../../util/theme/mainTheme';

const styles = {
    ...mainTheme,
    details: {
        float: 'right',
    }
}

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false,
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <FuncButton tooltip="Edit Details" onClick={this.handleOpen} btnClassName={classes.details}>
                    <EditIcon color="primary" />
                </FuncButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="Your bio..."
                                className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullWidth />
                            <TextField name="website" type="text" label="Website" placeholder="Your website..."
                                className={classes.textField} value={this.state.website} onChange={this.handleChange} fullWidth />
                            <TextField name="location" type="text" label="Location" placeholder="Your location..."
                                className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    credentials: state.user.credentials,
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));