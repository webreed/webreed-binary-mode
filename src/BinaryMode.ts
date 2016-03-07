// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


// System
import { Buffer } from "buffer";

// Packages
const fs = require("fs-promise");
import * as yaml from "js-yaml";

// Webreed Core
import Mode from "webreed-core/lib/interfaces/Mode";
import Resource from "webreed-core/lib/Resource";
import ResourceType from "webreed-core/lib/ResourceType";


/**
 * Mode for reading and writing binary resource files.
 */
export default class BinaryMode implements Mode {

  async readFile(path: string, resourceType: ResourceType): Promise<Object> {
    let data: Object = { };
    try {
      let str: string = await fs.readFile(path + ".meta", "utf8");
      data = yaml.safeLoad(str);
    }
    catch (err) {
      // There isn't a meta file...
    }

    data["body"] = await fs.readFile(path);

    return data;
  }

  writeFile(path: string, resource: Resource, resourceType: ResourceType): Promise<void> {
    let body = (resource && resource.body) || new Buffer(0);
    return fs.writeFile(path, body);
  }

}
