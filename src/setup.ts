// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import {Environment} from "webreed-core/lib/Environment";

import {BinaryMode} from "./BinaryMode";


/**
 * Plugin options.
 */
export type PluginOptions = { };


/**
 * Setup a new instance of the plugin.
 *
 * @param env
 *   An environment that represents a webreed project.
 * @param options
 *   Additional options for configuring the plugin instance.
 */
export default function (env: Environment, options: PluginOptions): void {
  let instance = new BinaryMode();

  env.modes.set("binary", instance);
}
