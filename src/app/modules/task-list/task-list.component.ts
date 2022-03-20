import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';
import * as actions from "./store/actions";
import * as fromStore from "./store";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {

  @Input() id!: string;

  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;

  constructor(private _store$: Store) {}

  ngOnInit(): void {
    this._store$.dispatch(actions.initialize({ identifier: this.id }));
    this.tasks$ = this._store$.select(fromStore.selectAll, {
      identifier: this.id
    });
    this.loading$ = this._store$.select(fromStore.selectLoading, {
      identifier: this.id
    });
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy({ identifier: this.id }));
  }

  save(description: string, completed: boolean): void {
    const task = {
      description,
      completed
    } as Task;
    this._store$.dispatch(
      actions.addTask({ identifier: this.id, task: task })
    );
  }

  remove(task: Task): void {
    this._store$.dispatch(
      actions.removeTask({ identifier: this.id, task })
    );
  }

}
