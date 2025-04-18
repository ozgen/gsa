/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import registerCommand from 'gmp/command';
import EntitiesCommand from 'gmp/commands/entities';
import EntityCommand from 'gmp/commands/entity';
import {FeedStatus, feedStatusRejection} from 'gmp/commands/feedstatus';
import logger from 'gmp/log';
import Task, {
  HOSTS_ORDERING_SEQUENTIAL,
  AUTO_DELETE_KEEP_DEFAULT_VALUE,
} from 'gmp/models/task';
import {NO_VALUE} from 'gmp/parser';

const log = logger.getLogger('gmp.commands.tasks');

export class TaskCommand extends EntityCommand {
  constructor(http) {
    super(http, 'task', Task);
  }

  async start({id}) {
    log.debug('Starting task...');

    try {
      const feeds = new FeedStatus(this.http);

      const status = await feeds.checkFeedSync();

      if (status.isSyncing) {
        throw new Error('Feed is currently syncing. Please try again later.');
      }

      await this.httpPost({
        cmd: 'start_task',
        id,
      });

      log.debug('Started task');
    } catch (error) {
      log.error('An error occurred while starting the task', id, error);
      throw error;
    }
  }

  stop({id}) {
    log.debug('Stopping task');

    return this.httpPost({
      cmd: 'stop_task',
      id,
    })
      .then(() => {
        log.debug('Stopped task');
        return this.get({id});
      })
      .catch(err => {
        log.error('An error occurred while stopping the task', id, err);
        throw err;
      });
  }

  resume({id}) {
    return this.httpPost({
      cmd: 'resume_task',
      id,
    })
      .then(() => {
        log.debug('Resumed task');
        return this.get({id});
      })
      .catch(err => {
        log.error('An error occurred while resuming the task', id, err);
        throw err;
      });
  }

  async create(args) {
    const {
      add_tag,
      alert_ids = [],
      alterable,
      apply_overrides,
      auto_delete,
      auto_delete_data,
      comment = '',
      config_id,
      hosts_ordering,
      in_assets,
      max_checks,
      max_hosts,
      min_qod,
      name,
      scanner_type,
      scanner_id,
      schedule_id,
      schedule_periods,
      tag_id,
      target_id,
    } = args;

    const data = {
      cmd: 'create_task',
      add_tag,
      'alert_ids:': alert_ids,
      alterable,
      apply_overrides,
      auto_delete,
      auto_delete_data,
      comment,
      config_id,
      hosts_ordering,
      in_assets,
      max_checks,
      max_hosts,
      min_qod,
      name,
      scanner_id,
      scanner_type,
      schedule_id,
      schedule_periods,
      tag_id,
      target_id,
      usage_type: 'scan',
    };
    log.debug('Creating task', args, data);

    try {
      return await this.action(data);
    } catch (rejection) {
      await feedStatusRejection(this.http, rejection);
    }
  }

  createContainer(args) {
    const {name, comment = ''} = args;
    log.debug('Creating container task', args);
    return this.action({
      cmd: 'create_container_task',
      auto_delete_data: AUTO_DELETE_KEEP_DEFAULT_VALUE,
      name,
      comment,
      usage_type: 'scan',
    });
  }

  async save(args) {
    const {
      alert_ids = [],
      alterable,
      auto_delete,
      auto_delete_data,
      apply_overrides,
      comment = '',
      config_id = NO_VALUE,
      hosts_ordering = HOSTS_ORDERING_SEQUENTIAL,
      id,
      in_assets,
      max_checks,
      max_hosts,
      min_qod,
      name,
      scanner_id = NO_VALUE,
      scanner_type,
      schedule_id = NO_VALUE,
      schedule_periods,
      target_id = NO_VALUE,
    } = args;
    const data = {
      alterable,
      'alert_ids:': alert_ids,
      apply_overrides,
      auto_delete,
      auto_delete_data,
      comment,
      config_id,
      cmd: 'save_task',
      hosts_ordering,
      in_assets,
      max_checks,
      max_hosts,
      min_qod,
      name,
      scanner_id,
      scanner_type,
      schedule_id,
      schedule_periods,
      target_id,
      task_id: id,
      usage_type: 'scan',
    };
    log.debug('Saving task', args, data);
    try {
      return await this.action(data);
    } catch (rejection) {
      await feedStatusRejection(this.http, rejection);
    }
  }

  saveContainer(args) {
    const {name, comment = '', in_assets = '1', id} = args;
    log.debug('Saving container task', args);
    return this.action({
      cmd: 'save_container_task',
      name,
      comment,
      in_assets,
      auto_delete: 'no',
      auto_delete_data: AUTO_DELETE_KEEP_DEFAULT_VALUE,
      task_id: id,
      usage_type: 'scan',
    });
  }

  getElementFromRoot(root) {
    return root.get_task.get_tasks_response.task;
  }
}

class TasksCommand extends EntitiesCommand {
  constructor(http) {
    super(http, 'task', Task);
  }

  getEntitiesResponse(root) {
    return root.get_tasks.get_tasks_response;
  }

  get(params, options) {
    params = {...params, usage_type: 'scan'};
    return this.httpGet(params, options).then(response => {
      const {entities, filter, counts} = this.getCollectionListFromRoot(
        response.data,
      );
      return response.set(entities, {filter, counts});
    });
  }

  getSeverityAggregates({filter} = {}) {
    return this.getAggregates({
      aggregate_type: 'task',
      group_column: 'severity',
      usage_type: 'scan',
      filter,
    });
  }

  getStatusAggregates({filter} = {}) {
    return this.getAggregates({
      aggregate_type: 'task',
      group_column: 'status',
      usage_type: 'scan',
      filter,
    });
  }

  getHighResultsAggregates({filter, max} = {}) {
    return this.getAggregates({
      filter,
      aggregate_type: 'task',
      group_column: 'uuid',
      usage_type: 'scan',
      textColumns: ['name', 'high_per_host', 'severity', 'modified'],
      sort: [
        {
          field: 'high_per_host',
          direction: 'descending',
          stat: 'max',
        },
        {
          field: 'modified',
          direction: 'descending',
        },
      ],
      maxGroups: max,
    });
  }
}

registerCommand('task', TaskCommand);
registerCommand('tasks', TasksCommand);
