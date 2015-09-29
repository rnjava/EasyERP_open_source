/**
 * Created by Roman on 24.08.2015.
 */
require('../config/development');

var request = require('supertest');
var expect = require('chai').expect;

var host = process.env.HOST;
var url;
var aggent;

describe.only("BDD for wTrack", function () {  // Runs once before all tests start.
    before(function (done) {
        aggent = request.agent(host);

        aggent
            .post('login')
            .send({
                login: 'admin',
                pass: '1q2w3eQWE',
                dbId: 'weTrack'
            })
            .expect(200, done);
    });

    after(function () {
        url = null;
        agent = null;
    });

    it("export should return file", function (done) {
        aggent
            .get('wTrack/exportToXlsx')
            .expect(200)
            .end(function (err, res) {
                var body = res.body;

                if (err) {
                    return done(err);
                }

                expect(body).to.be.instanceOf(Array);
                done();
            });

    });
});
