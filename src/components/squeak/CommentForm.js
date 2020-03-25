import React, { Component } from 'react';
import PropTypes from 'prop-types';
// REDUX ACTIONS
import { connect } from 'react-redux';
import { submitComment, clearErrors } from '../../redux/actions/dataActions'
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
// STYLESHEET
import mainTheme from '../../util/mainTheme';

const styles = {
    ...mainTheme,
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },
}

class CommentForm extends Component {
    state = {
        body: '',
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        } else if (!nextProps.ui.loading) {
            this.setState({ body: '' });
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.submitComment(this.props.squeakId, { body: this.state.body });
    };

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center '}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name="body" type="text" label="Comment on squeak"
                        error={errors.comment ? true : false} helperText={errors.comment}
                        value={this.state.body} onChange={this.handleChange} fullWidth className={classes.textField} />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>Submit</Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;

        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    squeakId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    ui: state.ui,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    submitComment,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));