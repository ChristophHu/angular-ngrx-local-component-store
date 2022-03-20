import { Injectable } from '@angular/core'
import { Actions, createEffect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators'
import * as actions from './actions'
import { TaskListService } from './service'

@Injectable()
export class TaskListEffects implements OnRunEffects {

    constructor(
        private _actions$: Actions,
        private _taskListService: TaskListService
    ) {}

    $addTask = createEffect(() => {
        return this._actions$.pipe(
            ofType(actions.addTask),
            tap(action => console.log(action)),
            switchMap((action) => this._taskListService.addTask(action.task)
                .pipe(
                    
                    map((response) => actions.addTaskSuccess({ identifier: action.identifier, response })),
                    catchError((error: Error) => of(actions.addTaskFail({ identifier: action.identifier, error })))
                )
            )
        )
    })
    $addTaskSuccess = createEffect(() => {
        return this._actions$.pipe(
            ofType(actions.addTaskSuccess),
        )
    }, { dispatch: false })

    $removeTask = createEffect(() => {
        return this._actions$.pipe(
            ofType(actions.removeTask),
            switchMap((action) => this._taskListService.removeTask(action.task)
                .pipe(
                    map((removedTaskId) => actions.removeTaskSuccess({ identifier: action.identifier, removedTaskId })),
                    catchError((error: Error) => of(actions.removeTaskFail({ identifier: action.identifier, error })))
                )
            )
        )
    })
    
    $removeTaskSuccess = createEffect(() => {
        return this._actions$.pipe(
            ofType(actions.removeTaskSuccess),
        )
    }, { dispatch: false })

    ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>):
        Observable<EffectNotification> {
        return resolvedEffects$.pipe(
            takeUntil(this._actions$.pipe(ofType(actions.destroy)))
        )
    }
}