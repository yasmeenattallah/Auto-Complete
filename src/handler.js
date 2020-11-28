/* eslint-disable no-console */
const path = require('path');

const fs = require('fs');
const queryString = require('querystring');
const { searchFilter } = require('../utils/logic');

// handle main page endpoint==='/'

const handleMain = (res) => {
  const filepath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filepath, 'utf8', (error, file) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Invalid server , there is an error ');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(file);
    }
  });
};
// handle asset page endpoint.includes('/public')
const handleAsset = (res, endpoint) => {
  const mimetype = {
    css: 'text/css',
    html: 'text/html',
    js: 'text/javascript',
    jpg: 'image/jpeg',
    ico: 'image/x-icon',
    png: 'image/png',

  };
  const extension = endpoint.split('.')[1];
  const filepath = path.join(__dirname, '..', endpoint);
  fs.readFile(filepath, 'utf8', (error, file) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Invalid server , there is an error ');
    } else {
      res.writeHead(200, { 'Content-Type': mimetype[extension] });
      res.end(file);
    }
  });
};
// handle search form endpoint==='/name?q=""'
const handleSearchGet = (req, res) => {
  const filePath = path.join(__dirname, 'name.json');
  const searchValue = queryString.parse(req.url.split('?')[1]).q;
  fs.readFile(filePath, 'utf8', (error, file) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h2> server Error  <h2>');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const countries = JSON.parse(file);
      const filteredData = searchFilter(countries, searchValue);
      res.end(JSON.stringify(filteredData));
    }
  });
};
// handle json page endpoint==='/search'
const handleSearchPost = (req, res) => {
  let allData = '';
  req.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });
  req.on('end', () => {
    const searchValue = JSON.parse(allData);
    const filePath = path.join(__dirname, 'name.json');
    fs.readFile(filePath, 'utf8', (error, file) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h2> server Error  <h2>');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const fileParse = JSON.parse(file);
        const filterData = searchFilter(fileParse, searchValue);
        res.end(JSON.stringify(filterData));
      }
    });
  });
};

// handle json page endpoint==='/name'
const handleName = (res) => {
  const filePath = path.join(__dirname, 'name.json');
  fs.readFile(filePath, 'utf8', (error, file) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h2> server Error  <h2>');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(file);
    }
  });
};
module.exports = {
  handleMain,
  handleAsset,
  handleSearchGet,
  handleSearchPost,
  handleName,
};
