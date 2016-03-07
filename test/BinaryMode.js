// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


// System
import { Buffer } from "buffer";
import fs from "fs-promise";
import path from "path";

// Packages
import given from "mocha-testdata";
import should from "should";

// Project
import BinaryMode from "../lib/BinaryMode";


function getFixturePath(relativePath) {
  return path.resolve(__dirname, "./fixtures/", relativePath);
}


describe("BinaryMode", function () {

  beforeEach(function () {
    this.binaryMode = new BinaryMode();
  });


  it("is named 'BinaryMode'", function () {
    BinaryMode.name
      .should.be.eql("BinaryMode");
  });


  describe("#constructor()", function () {

    it("is a function", function () {
      BinaryMode.prototype.constructor
        .should.be.a.Function();
    });

  });


  describe("#readFile(path, resourceType)", function () {

    it("is a function", function () {
      this.binaryMode.readFile
        .should.be.a.Function();
    });

    it("reads the associated meta data", function () {
      let path = getFixturePath("image.png");

      return this.binaryMode.readFile(path)
        .should.eventually.have.properties({
          title: "Cool Image!",
          description: "This is an image file... honestly!"
        });
    });

    it("reads the binary data", function () {
      let path = getFixturePath("image.png");

      return this.binaryMode.readFile(path)
        .then(data => {
          Buffer.isBuffer(data.body)
            .should.be.true();
          data.body.toString()
            .should.be.eql("This is an image file... honestly!");
        });
    });

  });

  describe("#writeFile(path, resource, resourceType)", function () {

    it("is a function", function () {
      this.binaryMode.writeFile
        .should.be.a.Function();
    });

    it("writes binary data to file", function () {
      let path = getFixturePath("output.png");
      let resource = { body: new Buffer("Abc", "utf8") };

      return this.binaryMode.writeFile(path, resource)
        .then(() => fs.readFile(path, "utf8"))
        .then(data => data.should.be.eql("Abc"))
        .then(() => fs.unlink(path));
    });

    it("writes an empty file when resource does not have a 'body' property", function () {
      let path = getFixturePath("output.png");
      let resource = { };

      return this.binaryMode.writeFile(path, resource)
        .then(() => fs.readFile(path, "utf8"))
        .then(data => data.should.be.eql(""))
        .then(() => fs.unlink(path));
    });

    given( undefined, null ).
    it("writes an empty file when argument 'resource' is not specified", function (resource) {
      let path = getFixturePath("output.png");

      return this.binaryMode.writeFile(path, resource)
        .then(() => fs.readFile(path, "utf8"))
        .then(data => data.should.be.eql(""))
        .then(() => fs.unlink(path));
    });

  });

});
