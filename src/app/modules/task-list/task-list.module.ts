import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TaskListComponent } from './task-list.component';
import { TaskListService } from './store/service';
import * as fromReducer from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskListEffects } from './store/effects';

@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromReducer.featureKey, fromReducer.reducer),
    EffectsModule.forFeature([TaskListEffects])
  ],
  exports: [TaskListComponent],
  providers: [TaskListService]
})
export class TaskListModule { }
