import React, { Component } from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { postSqueak, clearErrors } from '../../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Button, TextField, CircularProgress } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';

const styles = {
    submitButton: {
        position: 'relative',
        marginTop: '10px',
        marginBottom: '10px',
        float: 'right',
    },
    progressSpinner: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%',
    },
};

class PostSqueak extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            console.log(nextProps.ui.errors);
            this.setState({
                errors: nextProps.ui.errors
            });
            
        } else if (!nextProps.ui.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, errors: {} });
        this.props.clearErrors();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        console.log('clicked');
        e.preventDefault();

        this.props.postSqueak({
            body: this.state.body,
        });
    };

    render() {
        const { errors } = this.state;
        const { classes, ui: { loading } } = this.props;

        return (
            <>
                <FuncButton tooltip="Post a scream!" onClick={this.handleOpen}>
                    <AddIcon color="primary" />
                </FuncButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <FuncButton tooltip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </FuncButton>
                    <DialogTitle>Post A New Squeak</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="SQUEAK!" multiline rows="3" placeholder="Squeak at your fellow mices!"
                                error={errors.body ? true : false} helperText={errors.body} className={classes.textField} onChange={this.handleChange} fullWidth />
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
            
        );
    }
}

PostSqueak.propTypes = {
    postSqueak: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    ui: state.ui,
});

const mapActionsToProps = {
    postSqueak,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostSqueak));