const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route POST /api/url/shorten
// @desc Create short URL
router.post('/shorten', async (req, res) => {
    const longUrl = req.body.longurl;
    const baseUrl = config.get('baseUrl');
    const urlCode = req.body.urlcode;

    console.log(req.body.longurl);
    console.log(req.body.urlcode);
    console.log(req.body);
    console.log(longUrl);
    console.log(baseUrl);

    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    // Check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne( { longUrl });
            if(url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl: req.body.longurl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                //res.redirect('/created', url);
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});


module.exports = router;