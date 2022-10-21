#!/usr/bin/env node

const commands = ['arrayRandom', 'objectRandom', 'randomString', 'random', 'randomNum', 'reverseLetters', 'reverseWords', 'filterWords', 'onlyWords'];

const args = process.argv;
const command = args[2];

const rl = require('readline');

const randoms = require('@justhxnry/randoms');

const usage = function() {
    const usageText = `
    REST Client in CLI is faster to open that the one with UI
    usage:
        randoms <command>
        commands can be:

        arrayRandom         Get random value from an array
        objectRandom        Get random value from an object in format { "key": "value" }
        randomString        Generate random string with selected length
        random              Generate random string with selected length and custom string
        randomNum           Get random number in the selected range
        reverseLetters      Reverses all the letters in the string
        reverseWords        Reverses all the words in the string
        filterWords         Returns an array of words which length is equal or more than the selected length
        onlyWords           Returns an array of words which length is equal to the selected length
    `;

    console.log(usageText);
};

// prompts
function prompt(question) {
    const r = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    return new Promise((resolve, reject) => {
        try {
            r.question(question, answer => {
                r.close();
                return resolve(answer);
            });
        } catch (error) {
            return reject(error);
        }
    });
};

// help menu
if (args.length == 2) {
    return usage();
};

// checks the correct amount of arguments
if (args.length > 3) {
    console.log(`SYNTAX ERROR: Only one command can be used at the time`);
    return usage();
};

// checks if the command exists
if (args.indexOf(command) == -1) {
    console.log(`SYNTAX ERROR: Command "${command}" doesn't exist`);
    return usage();
};

function arrayRandom() {
    prompt(`Define an array [type=Array]: `).then(arr => {
        if (!arr) {
            console.log(`ARG ERROR: Array is required argument`);
            return usage();
        };
        arr = JSON.parse(arr);
        if (typeof arr != 'object') {
            console.log(`ARG ERROR: Array must be an Object, recieved: ${arr}`);
            return usage();
        };
        if (typeof arr == 'object' && !Array.isArray(arr)) {
            console.log(`ARG ERROR: Array must be an Array, recieved: ${arr}`);
            return usage();
        };

        var randomValue = randoms.arrayRandom(arr);
        return console.log(randomValue);
    });
};

function objectRandom() {
    prompt(`Define an object [type=Object]: `).then(obj => {
        if (!obj) {
            console.log(`ARG ERROR: Object is required argument`);
            return usage();
        };
        obj = JSON.parse(obj);
        if (typeof obj != 'object') {
            console.log(`ARG ERROR: Array must be an Object, recieved: ${obj}`);
            return usage();
        };

        var randomValue = randoms.objectRandom(obj);
        return console.log(randomValue);
    });
};

function randomString() {
    prompt(`Define a length [type=Number]: `).then(len => {
        if (!len) len = 8;
        len = Number(len);
        if (typeof len != 'number') {
            console.log(`ARG ERROR: Length must be a Number, recieved: ${len}`);
            return usage();
        };

        var randomValue = randoms.randomString(len);
        return console.log(randomValue);
    });
};

function random() {
    prompt(`Define a length [type=Number]: `).then(len => {
        if (!len) len = 8;
        len = Number(len);
        if (typeof len != 'number') {
            console.log(`ARG ERROR: Length must be a Number, recieved: ${len}`);
            return usage();
        };

        prompt(`Define a string [type=String|Number]: `).then(str => {
            if (!str) {
                console.log(`ARG ERROR: String is required argument`);
                return usage();
            };
            if (typeof str != 'number' && typeof str != 'string') {
                console.log(`ARG ERROR: Length must be a String or Number, recieved: ${str}`);
                return usage();
            };

            var randomValue = randoms.random(str, len);
            return console.log(randomValue);
        });
    });
};

function randomNum() {
    prompt(`Define a starting number [type=Number]: `).then(from => {
        if (!from) from = 0;
        from = Number(from);
        if (typeof from != 'number') {
            console.log(`ARG ERROR: Length must be a Number, recieved: ${from}`);
            return usage();
        };

        prompt(`Define an ending number [type=String|Number]: `).then(to => {
            if (!to) to = 10;
            to = Number(to);
            if (typeof to != 'number') {
                console.log(`ARG ERROR: Length must be a Number, recieved: ${to}`);
                return usage();
            };

            var randomValue = randoms.randomNum(from, to);
            return console.log(randomValue);
        });
    });
};

function reverseLetters() {
    prompt(`Define a string [type=String|Number]: `).then(str => {
        if (!str) {
            console.log(`ARG ERROR: String is required argument`);
            return usage();
        };
        if (typeof str != 'string' && typeof str != 'number') {
            console.log(`ARG ERROR: String must be a String or Number, recieved: ${str}`);
            return usage();
        };

        var randomValue = randoms.reverseLetters(str);
        return console.log(randomValue);
    });
};

function reverseWords() {
    prompt(`Define a string [type=String|Number]: `).then(str => {
        if (!str) {
            console.log(`ARG ERROR: String is required argument`);
            return usage();
        };
        if (typeof str != 'string' && typeof str != 'number') {
            console.log(`ARG ERROR: String must be a String or Number, recieved: ${str}`);
            return usage();
        };

        var randomValue = randoms.reverseWords(str);
        return console.log(randomValue);
    });
};

function filterWords() {
    prompt(`Define a string [type=String|Number]: `).then(str => {
        if (!str) {
            console.log(`ARG ERROR: String is required argument`);
            return usage();
        };
        if (typeof str != 'string' && typeof str != 'number') {
            console.log(`ARG ERROR: String must be a String or Number, recieved: ${str}`);
            return usage();
        };

        prompt(`Define a min. number [type=Number]: `).then(min => {
            if (!min) {
                console.log(`ARG ERROR: Min. Number is required argument`);
                return usage();
            };
            min = Number(min);
            if (typeof min != 'number') {
                console.log(`ARG ERROR: String must be a Number, recieved: ${min}`);
                return usage();
            };

            var randomValue = randoms.filterWords(str, min);
            return console.log(randomValue);
        });
    });
};

function onlyWords() {
    prompt(`Define a string [type=String|Number]: `).then(str => {
        if (!str) {
            console.log(`ARG ERROR: String is required argument`);
            return usage();
        };
        if (typeof str != 'string' && typeof str != 'number') {
            console.log(`ARG ERROR: String must be a String or Number, recieved: ${str}`);
            return usage();
        };

        prompt(`Define a required word length [type=Number]: `).then(min => {
            if (!min) {
                console.log(`ARG ERROR: Required Word Length is required argument`);
                return usage();
            };
            min = Number(min);
            if (typeof min != 'number') {
                console.log(`ARG ERROR: String must be a Number, recieved: ${min}`);
                return usage();
            };

            var randomValue = randoms.onlyWords(str, min);
            return console.log(randomValue);
        });
    });
};

switch (command.toLowerCase()) {
    case 'arrayrandom':
        arrayRandom();
        break;
    case 'objectrandom':
        objectRandom();
        break;
    case 'randomstring':
        randomString();
        break;
    case 'random':
        random();
        break;
    case 'randomnum':
        randomNum();
        break;
    case 'reverseletters':
        reverseLetters();
        break;
    case 'reversewords':
        reverseWords();
        break;
    case 'filterwords':
        filterWords();
        break;
    case 'onlywords':
        onlyWords();
        break;
    default:
        console.log(`SYNTAX ERROR: Command "${command}" is invalid`);
        usage();
        break;
};