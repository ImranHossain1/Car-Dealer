import { Button, Paper } from '@mui/material';
import React from 'react';

const BannerItems = (props) => {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    );
};

export default BannerItems;