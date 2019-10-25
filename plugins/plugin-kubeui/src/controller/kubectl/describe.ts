/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Commands from '@kui-shell/core/api/commands'

import flags from './flags'
import { exec } from './exec'
import commandPrefix from '../command-prefix'

import { doGetEntity } from './get'

import { KubeResource } from '../../lib/model/resource'
import { KubeOptions } from './options'

/**
 * describe -> get
 *
 */
function prepareArgsForDescribe(args: Commands.Arguments<KubeOptions>) {
  return `${args.command.replace(/(k|kubectl)(\s+)describe(\s+)/, '$1$2get$3')} -o yaml`
}

async function doDescribe(args: Commands.Arguments<KubeOptions>): Promise<KubeResource> {
  // first, we do the raw exec of the given command
  const response = await exec(args, prepareArgsForDescribe)

  return doGetEntity(args, response)
}

export default (commandTree: Commands.Registrar) => {
  commandTree.listen(`/${commandPrefix}/kubectl/describe`, doDescribe, flags)
  commandTree.listen(`/${commandPrefix}/k/describe`, doDescribe, flags)
}
