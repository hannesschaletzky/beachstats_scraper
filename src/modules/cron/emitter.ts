import { TypedEmitter } from 'tiny-typed-emitter'
import { Jobname } from './cronController'

interface Events {
  Players_nextJob: (currentName: Jobname | null) => void
  Players_EmptyPage: () => void
  Players_MissingIDsDone: () => void
}

export const emitter = new TypedEmitter<Events>()
