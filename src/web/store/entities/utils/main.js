/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
  createEntitiesLoadingActions,
  createEntityLoadingActions,
  createLoadAllEntities,
  createLoadEntities,
  createLoadEntity,
} from 'web/store/entities/utils/actions';
import {createReducer} from 'web/store/entities/utils/reducers';
import {createSelector} from 'web/store/entities/utils/selectors';

export const createAll = entityType => {
  const selector = createSelector(entityType);
  const entitiesLoadingActions = createEntitiesLoadingActions(entityType);
  const entityLoadingActions = createEntityLoadingActions(entityType);
  const reducer = createReducer(entityType);
  const loadAllEntities = createLoadAllEntities({
    selector,
    actions: entitiesLoadingActions,
    entityType,
  });
  const loadEntities = createLoadEntities({
    selector,
    actions: entitiesLoadingActions,
    entityType,
  });
  const loadEntity = createLoadEntity({
    selector,
    actions: entityLoadingActions,
    entityType,
  });

  return {
    entitiesLoadingActions,
    entityLoadingActions,
    loadAllEntities,
    loadEntities,
    loadEntity,
    reducer,
    selector,
  };
};
