import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task.model'

@Injectable()
export class TaskListService {

  addTask(task: Task): Observable<Task> {
    return of({ ...task, id: '1' })
      .pipe(
        delay(2000)
      );
  }

  removeTask(task: Task): Observable<string> {
    return of(task.id)
      .pipe(
        delay(2000)
      );
  }

}