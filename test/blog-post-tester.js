
const chai = require("chai");
const chaiHTTP = require("chai-http");

const {app, runServer, closeServer} = require("../server");


const expect = chai.expect;

chai.use(chaiHTTP);


describe("Blog-post-tester", function() {
    console.log("begin");

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it("on GET, should retrieve pre-made blog posts", function() {
        return chai.request(app)
        .get(`/blog-posts`)
        .then(function(response) {
            expect(response).to.have.status(200);
            expect(response).to.be.json;
            expect(response.body).to.be.an(`array`);
            expect(response.body.length).to.be.at.least(1);
            const items = response.body;
            items.forEach(function(item) {
                expect(item).to.have.all.keys("id", "title", "content", "author", "publishDate");
            });
        });        
    });

    it("on POST, should put in a new entry", function() {
        const newEntry = {
            title: "newest stuff",
            content: "A quote from that famous thing you love.",
            author: "Good Will Hunting",
        }
        return chai.request(app)
        .post(`/blog-posts`)
        .send(newEntry)
        .then(function(response) {
            expect(response).to.have.status(201);
            expect(response).to.be.json;
            expect(response.body).to.be.an(`object`);
            expect(response.body).to.have.all.keys("id", "title", "content", "author", "publishDate");
            expect(response.body.id).not.to.equal(null);
        });
    });

    it("on DELETE, should remove an item from data", function() {
        return chai.request(app)
        .get(`/blog-posts`)
        .then(function(response) {
            return chai.request(app)
            .delete(`/blog-posts/${response.body[0].id}`)
            .then(function(responseTwo) {
                expect(responseTwo).to.have.status(204);
            });
        });
    });

    it("on PUT, should update an item from the data", function() {
        const updatedEntry = {
            title: "newest stuff",
            content: "A quote from that famous thing you love.",
            author: "Good Will Hunting",
        }

        return chai.request(app)
        .get(`/blog-posts`)
        .then(function(response) {
            updatedEntry.id = response.body[0].id
            return chai.request(app)
            .put(`/blog-posts/${updatedEntry.id}`)
            .send(updatedEntry)
        })
        .then(function(response) {
            expect(response).to.have.status(204);
        });
    });
});