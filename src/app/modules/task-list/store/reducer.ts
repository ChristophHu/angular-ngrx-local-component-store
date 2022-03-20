import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"
import * as actions from "./actions"
import { Task } from '../models/task.model'

export const featureKey = "taskListState"

export interface AllTaskListsState {
  lists: Record<string, TaskListState>
}

export const allTaskListInitialState: AllTaskListsState = {
  lists: {}
}

export interface TaskListState extends EntityState<Task> {
  loading: boolean
}

export const allTaskListReducer = createReducer(allTaskListInitialState)

export const entityAdapter: EntityAdapter<Task> = createEntityAdapter<Task>(
  {
    selectId: entity => entity.id
  }
)

export const initialState: TaskListState = entityAdapter.getInitialState({
  loading: false
})

export const reducer = createReducer(
    allTaskListInitialState,
    on(actions.initialize, (state, action) => ({
        ...state,
        lists: {
            ...state.lists,
            [action.identifier]: {
                ...initialState
            }
        }
    })),
    on(actions.addTask, actions.removeTask, (state, action) => ({
        ...state,
        lists: {
            ...state.lists,
            [action.identifier]: {
                ...stateSlice(action, state),
                loading: true
            }
        }
    })),
  
    on(actions.addTaskSuccess, (state, action) => ({
        ...state,
        lists: {
            ...state.lists,
            [action.identifier]: {
                ...entityAdapter.addOne(action.response, stateSlice(action, state)),
                loading: false
            }
        }
    })),
    on(actions.addTaskFail, actions.removeTaskFail, (state, action) => ({
        ...state,
        lists: {
            ...state.lists,
            [action.identifier]: {
                ...stateSlice(action, state),
                loading: false
            }
        }
    })),
    on(actions.removeTaskSuccess, (state, action) => ({
        ...state,
        lists: {
            ...state.lists,
            [action.identifier]: {
                ...entityAdapter.removeOne(
                    action.removedTaskId,
                    stateSlice(action, state)
                ),
                loading: false
            }
        }
    })),
    on(actions.removeTaskFail, actions.removeTaskFail, (state, action) => ({
        ...state,
        lists: {
            ...state.lists,
            [action.identifier]: {
                ...stateSlice(action, state),
                loading: false
            }
        }
    })),
    // on(actions.destroy, (state, action) => ({
    //     ...state,
    //     lists: {
    //         ...state.lists,
    //         [action.identifier]: undefined
    //     }
    // }))
)

const stateSlice = (action: any, state: AllTaskListsState ): TaskListState => {
    console.log(action)
    if (!Boolean(action.identifier)) throw Error("Error Identifier")
    return state.lists[action.identifier]!
}
  
export const loading = (state: AllTaskListsState, props: { identifier: string }) => state.lists[props.identifier]!.loading
  
export const selectAll = (state: AllTaskListsState, props: { identifier: string }) => {
    if (Boolean(state.lists[props.identifier]))
    return entityAdapter
        .getSelectors()
        .selectAll(state.lists[props.identifier]!)
    return []
}