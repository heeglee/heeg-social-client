import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// COMPONENTS
import FuncButton from '../../util/FuncButton';
// REDUX ACTIONS
import { connect } from 'react-redux';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
// STYLESHEET
import mainTheme from '../../util/mainTheme';

const styles = {
    ...mainTheme,
    commentImage: {
        width: '100px',
        maxWidth: '100%',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        marginRight: '10px',
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

    commentData: {
        marginLeft: '20px',
    },
};

// TODO: deal with this first.
class Comments extends Component {
    

    render() {
        const { comments, classes } = this.props;
        console.log(comments);

        return (
            <Grid container>
                {comments.map((comment, cIndex) => {
                    const { body, timeCreated, user, userImage } = comment;
                    return (
                        // TODO: find another key
                        <Fragment key={timeCreated}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5" component={Link} to={`/users/${user}`} color="primary">
                                                {user}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(timeCreated).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {cIndex !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    
});

const mapActionsToProps = {
    
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Comments));