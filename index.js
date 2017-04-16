// Description:
//   Display meme from "The coding love <http://thecodinglove.com>"
//
// Dependencies:
//   "cheerio": "0.22.0"
//   "he": "1.1.1"
//
// Configuration:
//   HUBOT_CODINGLOVE_SEARCH_TEXT
//   HUBOT_CODINGLOVE_ERROR_TEXT
//   HUBOT_CODINGLOVE_ERROR_IMG
//
// Commands:
//   hubot codinglove - Return a random meme
//
// Author:
//   bmunoz89
//   Based codinglove.coffee by Eunomie
'use strict';

const search_text = process.env.HUBOT_CODINGLOVE_SEARCH_TEXT || 'Searching in thecodinglove...',
    error_text = process.env.HUBOT_CODINGLOVE_ERROR_TEXT || 'thecodinglove.com',
    error_img = process.env.HUBOT_CODINGLOVE_ERROR_IMG || 'http://tclhost.com/cn91mK3.gif';

const cheerio = {
        load: require('cheerio').load,
    },
    he = {
        decode: require('he').decode,
    };

module.exports = (robot) => {
    robot.respond(
        /codinglove/i,
        (msg) => {
            msg.send(search_text);
            robot.emit('codinglove', robot, msg, 'http://thecodinglove.com/random');
        }
    );

    robot.on('codinglove', (robot, message, url) => {
        message.http(url).get()((error, response, body) => {
            let txt = error_text,
                img_src = error_img;

            try {
                if (response.statusCode === 302 || response.statusCode === 301) {
                    const location = response.headers['location'];
                    robot.logger.debug(`hubot-codinglove - redirect: ${url} -> ${location}`);
                    robot.emit('codinglove', robot, message, location);
                    return ;
                }

                if (error) {
                    robot.logger.error(`hubot-codinglove - error: ${error}`);
                    robot.emit('error', error, response);
                } else {
                    const $ = cheerio.load(body);

                    const text = he.decode($('.post h3').first().text());
                    robot.logger.debug(`hubot-codinglove - text: ${txt}`);

                    const image_src = $('.post img').first().attr('src').replace(/\.jpe?g/i, '.gif');
                    robot.logger.debug(`hubot-codinglove - image: ${img_src}`);

                    txt = text;
                    img_src = image_src;
                }
            } catch(err) {
                robot.emit('error', err);
            }
            message.send(`>${txt}\n${img_src}`);
        });
    });
};
