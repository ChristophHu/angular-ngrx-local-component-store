import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const addTask = createAction(
    '[TASK LIST][API] Add', 
    props<{ identifier: string, task: Task }>()
)
export const addTaskSuccess = createAction(
    '[TASK LIST][API] Add success',
    props<{ identifier: string, response: Task }>()
)
export const addTaskFail = createAction(
    '[TASK LIST][API] Add fail',
    props<{ identifier: string, error: Error }>()
)

export const removeTask = createAction(
    '[TASK LIST][API] Remove', 
    props<{ identifier: string, task: Task }>()
)
export const removeTaskSuccess = createAction(
    '[TASK LIST][API] Remove success',
    props<{ identifier: string, removedTaskId: string }>()
)
export const removeTaskFail = createAction(
    '[TASK LIST][API] Remove fail',
    props<{ identifier: string, error: Error }>()
)

export const initialize = createAction(
    '[TASK LIST][STATE] Initialize',
    props<{ identifier: string }>()
)
export const destroy = createAction(
    '[TASK LIST][STATE] Destroy',
    props<{ identifier: string }>()
)

