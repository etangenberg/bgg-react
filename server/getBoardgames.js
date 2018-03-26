
require('es6-promise').polyfill();
require('isomorphic-fetch');
import fs from 'fs-extra';
import xml2js from 'xml2js';
import { read } from 'fs';

//changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

export function readFile(filename, enc){
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

export default function getBoardgames(filename){
	console.log('Read file {filename}.');
    return new Promise(function (fulfill, reject){
        readFile(filename, 'utf-8')
        .then((readData) => {
            const parser = new xml2js.Parser();
            parser.parseString(readData, (err, res)=> {
                if (err){ 
                    console.error(err);
                    reject(err);
                }
                else{
                    console.dir(res);
                    fulfill(res);//JSON.stringify(res);
                }
            });
        });
    });
}   
