import { JobRunsAction } from './jobRuns'

export interface State {
  items?: string[]
  count?: number
}

const INITIAL_STATE = { items: undefined }

export default (state: State = INITIAL_STATE, action: JobRunsAction): State => {
  switch (action.type) {
    case '@@redux/INIT':
    case '@@INIT':
      return INITIAL_STATE
    case 'UPSERT_JOB_RUNS':
      return {
        items: action.data.meta.jobRuns.data.map(r => r.id),
        count: action.data.meta.jobRuns.meta.count,
      }
    case 'UPSERT_JOB_RUN':
      return INITIAL_STATE
    default:
      return state
  }
}
