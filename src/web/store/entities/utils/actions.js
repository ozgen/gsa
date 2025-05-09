/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Filter, {ALL_FILTER} from 'gmp/models/filter';
import {pluralizeType} from 'gmp/utils/entitytype';
import {isDefined} from 'gmp/utils/identity';

export const types = {
  ENTITIES_LOADING_REQUEST: 'ENTITIES_LOADING_REQUEST',
  ENTITIES_LOADING_SUCCESS: 'ENTITIES_LOADING_SUCCESS',
  ENTITIES_LOADING_ERROR: 'ENTITIES_LOADING_ERROR',
  ENTITY_LOADING_REQUEST: 'ENTITY_LOADING_REQUEST',
  ENTITY_LOADING_SUCCESS: 'ENTITY_LOADING_SUCCESS',
  ENTITY_LOADING_ERROR: 'ENTITY_LOADING_ERROR',
  ENTITY_DELETE_SUCCESS: 'ENTITY_DELETE_SUCCESS',
};

export const createEntitiesLoadingActions = entityType => ({
  request: filter => ({
    type: types.ENTITIES_LOADING_REQUEST,
    entityType,
    filter,
  }),
  success: (data, filter, loadedFilter, counts) => ({
    type: types.ENTITIES_LOADING_SUCCESS,
    entityType,
    filter,
    data,
    loadedFilter,
    counts,
  }),
  error: (error, filter) => ({
    type: types.ENTITIES_LOADING_ERROR,
    entityType,
    filter,
    error,
  }),
});

export const createEntityLoadingActions = entityType => ({
  request: id => ({
    type: types.ENTITY_LOADING_REQUEST,
    entityType,
    id,
  }),
  success: (id, data) => ({
    type: types.ENTITY_LOADING_SUCCESS,
    entityType,
    data,
    id,
  }),
  error: (id, error) => ({
    type: types.ENTITY_LOADING_ERROR,
    entityType,
    error,
    id,
  }),
});

export const entityDeleteActions = {
  success: (entityType, id) => ({
    type: types.ENTITY_DELETE_SUCCESS,
    entityType,
    id,
  }),
};

export const createLoadEntities =
  ({selector, actions, entityType}) =>
  gmp =>
  filter =>
  (dispatch, getState) => {
    const rootState = getState();
    const state = selector(rootState);

    if (state.isLoadingEntities(filter)) {
      // we are already loading data
      return Promise.resolve();
    }

    dispatch(actions.request(filter));

    return gmp[pluralizeType(entityType)].get({filter}).then(
      response => {
        const {data, meta} = response;
        const {filter: loadedFilter, counts} = meta;
        return dispatch(actions.success(data, filter, loadedFilter, counts));
      },
      error => dispatch(actions.error(error, filter)),
    );
  };

export const createLoadAllEntities =
  ({selector, actions, entityType}) =>
  gmp =>
  filter =>
  (dispatch, getState) => {
    const rootState = getState();
    const state = selector(rootState);

    if (isDefined(filter)) {
      filter = isDefined(filter.toFilterString)
        ? filter.all()
        : Filter.fromString(filter).all();
    } else {
      filter = ALL_FILTER;
    }

    if (state.isLoadingEntities(filter)) {
      // we are already loading data
      return Promise.resolve();
    }
    dispatch(actions.request(filter));

    return gmp[pluralizeType(entityType)].get({filter}).then(
      response => {
        const {data, meta} = response;
        const {filter: loadedFilter, counts} = meta;
        return dispatch(actions.success(data, filter, loadedFilter, counts));
      },
      error => dispatch(actions.error(error, filter)),
    );
  };

export const createLoadEntity =
  ({selector, actions, entityType}) =>
  gmp =>
  id =>
  (dispatch, getState) => {
    const rootState = getState();
    const state = selector(rootState);

    if (state.isLoadingEntity(id)) {
      // we are already loading data
      return Promise.resolve();
    }

    dispatch(actions.request(id));

    return gmp[entityType].get({id}).then(
      response => dispatch(actions.success(id, response.data)),
      error => dispatch(actions.error(id, error)),
    );
  };

export const createDeleteEntity =
  ({entityType}) =>
  gmp =>
  id =>
  dispatch =>
    gmp[entityType]
      .delete({id})
      .then(() => dispatch(entityDeleteActions.success(entityType, id)));
