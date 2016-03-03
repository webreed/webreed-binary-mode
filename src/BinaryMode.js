// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

/** @module webreed-binary-mode/lib/BinaryMode */


// System
import { Buffer } from "buffer";

// Packages
import fs from "fs-promise";
import yaml from "js-yaml";


/**
 * Mode for reading and writing binary resource files.
 *
 * @implements {module:webreed/lib/interfaces/Mode}
 */
export default class BinaryMode {

  readFile(path, resourceType) {
    return fs.readFile(path + ".meta", "utf8")
      .then(
        data => yaml.safeLoad(data),
        err => new Object()
      )
      .then(data => {
        return fs.readFile(path).then(body => {
          data.body = body;
          return data;
        });
      });
  }

  writeFile(path, resource, resourceType) {
    let body = (resource && resource.body) || new Buffer(0);
    return fs.writeFile(path, body);
  }

}
