import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ children, onClick, tooltip, btnClassName, tipClassName }) => (
    <Tooltip title={tooltip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
);