var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/reverse', function (req, res) {

    reverseDictionary(req.query, res);
});

router.post('/reverse', function (req, res) {

    reverseDictionary(req.body, res);
});

function reverseDictionary(dict, res) {

    var outBody = {};

    try {

        for(var key in dict) {

            if(dict.hasOwnProperty(key) && (typeof key === 'string') && (typeof dict[key] === 'string')) {
                outBody[dict[key].split('').reverse().join('')] = key.split('').reverse().join('');
            }
        }

        res.type('json');
        res.status(200).json(outBody);
    }
    catch(e) {

        res.type('text');
        res.status(500).send('You\'re doing it wrong');
    }
}

router.get('/time', function (req, res) {

    res.type('json');
    res.status(200).json({currentTime: new Date()});
});
module.exports = router;