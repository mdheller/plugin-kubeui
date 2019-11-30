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

import { Registrar } from '@kui-shell/core/api/commands'

import flags from './flags'
import { doExecWithStatus } from './exec'
import commandPrefix from '../command-prefix'

import { FinalState } from '../../lib/model/states'

const verbs = ['create', 'apply']

export default (registrar: Registrar) => {
  verbs.forEach(verb => {
    const doCreate = doExecWithStatus(verb, FinalState.OnlineLike)

    registrar.listen(`/${commandPrefix}/kubectl/${verb}`, doCreate, flags)
    registrar.listen(`/${commandPrefix}/k/${verb}`, doCreate, flags)
  })
}
