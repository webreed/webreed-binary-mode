// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

/** @module webreed-binary-mode */


// Project
import BinaryMode from "./BinaryMode";


/**
 * Setup a new instance of the plugin.
 *
 * @param {module:webreed/lib/Environment} env
 *   An environment that represents a webreed project.
 * @param {object} [options = null]
 *   Additional options for configuring the plugin instnace.
 *
 * @returns {module:webreed/lib/interfaces/Mode}
 *   A mode for reading and writing resource files.
 */
export default function setup(env, options) {
  let instance = new BinaryMode();

  env.modes.set("binary", instance);
}