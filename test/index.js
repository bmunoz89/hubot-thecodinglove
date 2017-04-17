require('coffee-script/register');

const Helper = require('hubot-test-helper'),
    chai = require('chai'),
    expect = chai.expect,
    nock = require('nock'),
    helper = new Helper('../index.js');

describe('hubot-thecodinglove', () => {
    var room;

    beforeEach(() => {
        process.env.HUBOT_CODINGLOVE_SEARCH_TEXT = 'Searching text';
        process.env.HUBOT_CODINGLOVE_ERROR_TEXT = 'Error text';
        process.env.HUBOT_CODINGLOVE_ERROR_IMG = 'Error img';
        room = helper.createRoom();
        nock.disableNetConnect();
    });

    afterEach(() => {
        room.destroy();
        nock.cleanAll();
    });

    describe('Status 200', () => {
        beforeEach(() => {
            nock('http://thecodinglove.com')
                .get('/random')
                .reply(200, `
                    <div class="post">
                        <h3>Title</h3>
                        <img src="http://prefix.domain/image.gif" />
                    </div>
                `);
        });

        it('Call codinglove script', () => {
            room.user.say('user', 'hubot codinglove').then(() => {
                expect(room.messages).to.have.length(3);
                expect(room.messages).to.eql([
                    ['user', 'hubot codinglove'],
                    ['hubot', 'Searching text'],
                    ['hubot', '>Title\nhttp://prefix.domain/image.gif'],
                ]);
            });
        });
    });

    describe('Status 301', () => {
        beforeEach(() => {
            nock('http://thecodinglove.com')
                .get('/random')
                .reply(301, undefined, {
                    Location: 'http://thecodinglove.com/redirect',
                })
                .get('/redirect')
                .reply(200, `
                    <div class="post">
                        <h3>Title</h3>
                        <img src="http://prefix.domain/image.gif" />
                    </div>
                `);
        });

        it('Call codinglove script', (done) => {
            room.user.say('user', 'hubot codinglove').then(() => {
                setTimeout(() => {
                    expect(room.messages).to.have.length(3);
                    expect(room.messages).to.eql([
                        ['user', 'hubot codinglove'],
                        ['hubot', 'Searching text'],
                        ['hubot', '>Title\nhttp://prefix.domain/image.gif'],
                    ]);
                    done();
                }, 10);
            });
        });
    });

    describe('Status 503', () => {
        beforeEach(() => {
            nock('http://thecodinglove.com')
                .get('/random')
                .reply(503, undefined);
        });

        it('Call codinglove script', () => {
            room.user.say('user', 'hubot codinglove').then(() => {
                expect(room.messages).to.have.length(3);
                expect(room.messages).to.eql([
                    ['user', 'hubot codinglove'],
                    ['hubot', 'Searching text'],
                    ['hubot', '>Error text\nError img'],
                ]);
            });
        });
    });
});
