import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const getFetureState = createFeatureSelector<fromReducer.TaskListState>(fromReducer.featureKey);

export const selectLoading = createSelector(getFetureState, (state: any, props: any) => fromReducer.loading(state, props));
export const selectAll = createSelector(getFetureState, (state: any, props: any) => fromReducer.selectAll(state, props));