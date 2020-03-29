import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
// STYLESHEET
import mainTheme from '../../util/theme/mainTheme';

const styles = {
    ...mainTheme,
    commentImage: {
        maxWidth: '100%',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
    },

    commentData: {
        marginLeft: '20px',
    },
};

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;

        return (
            <Grid container>
                {comments ? comments.map((comment, index) => {
                    const { body, timeCreated, user, userImage } = comment;
                    return (
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
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                }) : null}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array,
};

export default withStyles(styles)(Comments);