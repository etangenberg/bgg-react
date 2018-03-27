import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';
import webpack from 'webpack';
import {argv} from 'optimist';
import {get} from 'request-promise';
import getBoardgames, {getBoardgamesAPI} from './getBoardgames';

const port = process.env.PORT || 3000;
const app = new express();

const useLiveData = argv.useLiveData === "true";

if(process.env.NODE_ENV === 'development'){
    const config = require('../webpack.config.dev.babel').default;
    const compiler = webpack(config);
    
    app.use(require('webpack-dev-middleware')(compiler, { noInfo:true}));
    app.use(require('webpack-hot-middleware')(compiler,{ noInfo:true}));
}


const handleGamesData = (readData) => {
    return new Promise(function (fulfill, reject){
        try
        {
            console.log('stringify data');
            const raw = JSON.stringify(data);
            //console.log(raw);           
            fulfill(raw);
        }                   
        catch(ex)
        {
            console.error('getboardgames failed with: '+ ex);
            reject(ex);
        }
    });
}

app.get(['/api/boardgames/:search'], async function (req,res) {
    if(useLiveData){
        const searchTerm = req.params.search;
        console.log('search term = '+searchTerm);  
        getBoardgamesAPI(searchTerm)
        //.then(handleGamesData)
        .then(data => res.json(data))
        .catch(err => console.log('error fetching boardgame data : '+err));
    }else{
        getBoardgames('./data/mock-boardgames.xml')
        //.then(handleGamesData)
        .then(data => res.json(data))
        .catch(err => console.log('error fetching boardgame data : '+err));
    }
});

app.get(['/','/api/boardgames'], function * (req,res ){
    let index = yield fs.readFile('./public/index.html',"utf-8");
    res.send(index);
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on ${port}`));