import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import {argv} from 'optimist';
import {get} from 'request-promise';
import getBoardgames from './getBoardgames';

const port = process.env.PORT || 3000;
const app = new express();

const useLiveData = argv.useLiveData === "true";

if(process.env.NODE_ENV === 'development'){
    const config = require('../webpack.config.dev.babel').default;
    const compiler = webpack(config);
    
    app.use(require('webpack-dev-middleware')(compiler, {noinfo: true}));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.get(['/api/boardgames'], async function (req,res) {

        getBoardgames('./data/mock-boardgames.xml')
        .then(data =>
            {
                try
                {
                    // console.dir(data);
                    const raw = JSON.stringify(data);
                    //console.log(raw);
                    res.json(raw);
                }                
                catch(ex)
                {
                    console.error('getboardgames failed with {ex}');
                }
            },
            (data)=>{
                    console.error('getboardgames failed {data}');
            });
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on ${port}`));