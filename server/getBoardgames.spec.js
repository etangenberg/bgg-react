const fetchMock = require('fetch-mock');
import React from 'react';
import ReactDOM from 'react-dom';
import yields from 'express-yields';
import path from 'path';
import getBoardgames from './getBoardgames';

it('retrieves boardgames in JSON format', async () => {
    // expect.assertions(1);
    // const url = 'http://fake.com';
    //const url = 'https://www.boardgamegeek.com/xmlapi/search?search=Catan';
    //fetchMock.get('http://fake.com' );
    // fetchMock.get('*', "<xml>Hello</xml>");
    const filename = path.resolve(__dirname,'../data/mock-boardgames.xml');
    getBoardgames(filename).then(data => {
        let count = 0;
        for(i in data.boardgames.boardgame){
            count++;
        }
        expect(count).toEqual(61);
    })
    .catch(err =>
        console.error(err)
    );
});