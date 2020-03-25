import React from 'react';
import PropTypes from 'prop-types';
import NoImg from '../images/no-img.png';
// MATERIAL-UI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent } from '@material-ui/core';

import mainTheme from './mainTheme';

const styles = {
    ...mainTheme,
    card: {
        display: 'flex',
        marginBottom: '20px',
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: '25px',
    },
    cover: {
        minWidth: '200px',
        objectFit: 'cover',
    },
    handle: {
        width: '60px',
        height: '18px',
        backgroundColor: mainTheme.palette.primary.main,
        marginBottom: '7px',
    },
    date: {
        height: '14px',
        width: '100px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginBottom: '10px',
    },
    fullLine: {
        height: '15px',
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '10px',
    },
    halfLine: {
        height: '15px',
        width: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginBottom: '10px',
    },
};

const SqueakSkeleton = props => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.CardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))

    return <>{content}</>;
}

SqueakSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SqueakSkeleton);