import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import BannerItems from './BannerItems';

const Banner = () => {
    {
        var items = [
            {
                name: "Random Name #1",
                description: "Probably the most random thing you have ever seen!"
            },
            {
                name: "Random Name #2",
                description: "Hello World!"
            },
            {
                name: "Random Name #3",
                description: "Hello World!"
            }
        ]
    }
    return (
        <Carousel>
            {
                items.map( (item, i) => <BannerItems key={i} item={item} /> )
            }
        </Carousel>
    );
};

export default Banner;

