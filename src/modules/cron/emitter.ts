import { TypedEmitter } from 'tiny-typed-emitter'
import { Jobname } from './cronController'

interface Events {
  Players_nextJob: (currentJobName: Jobname | null) => void
  Players_EmptyPage: () => void
  Players_MissingIDsDone: () => void
  Teams_NotFound: () => void
}

export const emitter = new TypedEmitter<Events>()
