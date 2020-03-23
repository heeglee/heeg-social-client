import React, { Component } from 'react';
import PropTypes from 'prop-types';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { deleteSqueak } from '../../redux/actions/dataActions';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const styles = {
    deleteSqueak: {
        position: 'absolute',
        left: '90%',
    }
};

class DeleteSqueak extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteSqueak = () => {
        this.props.deleteSqueak(this.props.screamId);
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <>
                <FuncButton tooltip="Delete This Squeak" onClick={this.handleOpen} btnClassName={classes.deleteSqueak}>
                    <DeleteOutline color="secondary" />
                </FuncButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure you really want to delete this squeak?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteSqueak} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

DeleteSqueak.propTypes = {
    deleteSqueak: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({

});

const mapActionsToProps = {
    deleteSqueak
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DeleteSqueak));