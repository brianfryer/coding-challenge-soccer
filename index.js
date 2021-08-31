#! /usr/bin/env node
const { program } = require('commander');
const parseScoresFromFile = require('./commands/parseScoresFromFile');

program.action(parseScoresFromFile);
program.parse();
