
require('es6-promise').polyfill();
require('isomorphic-fetch');
import fs from 'fs-extra';
import xml2js from 'xml2js';
import { read } from 'fs';
import rp from 'request-promise';

function readFile(filename, enc){
    return new Promise(function (fulfill, reject){
        fs.readFile(filename, enc, (readError, readData) =>{
            if(readError){
                console.error(readError);
                reject(readError);
            }
            else{
                console.log(readData);
                fulfill(readData);
            }
        })
    });
}

const handleXMLData = (readData) => {
    const parser = new xml2js.Parser();
    return new Promise(function (fulfill, reject){
        parser.parseString(readData, (err, res)=> {
            if (err){
                console.log('error when parsing, see error.') 
                console.error(err);
                reject(err);
            }
            else{
                console.log('Succesfull parse:');
                //console.dir(res);
                fulfill(res);//JSON.stringify(res);
            }
        });
    });
}

export default function getBoardgames(filename){
	console.log('Read file ' + filename);
    return new Promise(function (fulfill, reject){
        readFile(filename, 'utf-8')
        .then(handleXMLData)
        .then(fulfill)
        .catch(reject);
    });
}   

export function getBoardgamesAPI(searchValue){
	var options = {
			uri: 'https://boardgamegeek.com/xmlapi/search',
			qs: {
				search:searchValue // -> uri + '?access_token=xxxxx%20xxxxx'
			}
        };
        
    console.log('Retreive API data with search: '+searchValue);
    console.dir(options);
    return new Promise(function (fulfill, reject){
        rp(options)
        .then(handleXMLData)
        .then(fulfill)
        .catch(reject);
    });
}   
