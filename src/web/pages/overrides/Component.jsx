/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import _ from 'gmp/locale';
import {
  ANY,
  MANUAL,
  TASK_ANY,
  TASK_SELECTED,
  RESULT_ANY,
  RESULT_UUID,
  ACTIVE_NO_VALUE,
  ACTIVE_YES_ALWAYS_VALUE,
  ACTIVE_YES_UNTIL_VALUE,
} from 'gmp/models/override';
import {NO_VALUE, YES_VALUE} from 'gmp/parser';
import {hasId} from 'gmp/utils/id';
import {isDefined} from 'gmp/utils/identity';
import {shorten} from 'gmp/utils/string';
import React from 'react';
import EntityComponent from 'web/entity/EntityComponent';
import OverrideDialog from 'web/pages/overrides/Dialog';
import PropTypes from 'web/utils/PropTypes';
import {
  FALSE_POSITIVE_VALUE,
  LOG_VALUE,
  HIGH_VALUE,
  MEDIUM_VALUE,
  LOW_VALUE,
} from 'web/utils/severity';
import withGmp from 'web/utils/withGmp';

const SEVERITIES_LIST = [
  HIGH_VALUE,
  MEDIUM_VALUE,
  LOW_VALUE,
  LOG_VALUE,
  FALSE_POSITIVE_VALUE,
];

class OverrideComponent extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {dialogVisible: false};

    this.handleCloseOverrideDialog = this.handleCloseOverrideDialog.bind(this);
    this.openCreateOverrideDialog = this.openCreateOverrideDialog.bind(this);
    this.openOverrideDialog = this.openOverrideDialog.bind(this);
  }

  openOverrideDialog(override, initial) {
    if (isDefined(override)) {
      let active = ACTIVE_NO_VALUE;
      if (override.isActive()) {
        if (isDefined(override.endTime)) {
          active = ACTIVE_YES_UNTIL_VALUE;
        } else {
          active = ACTIVE_YES_ALWAYS_VALUE;
        }
      }

      let custom_severity = NO_VALUE;
      let new_severity_from_list;
      let newSeverity;

      if (SEVERITIES_LIST.includes(override.newSeverity)) {
        new_severity_from_list = override.newSeverity;
      } else {
        custom_severity = YES_VALUE;
        newSeverity = override.newSeverity;
      }

      const {result, task, nvt, hosts} = override;

      this.setState({
        dialogVisible: true,
        id: override.id,
        active,
        custom_severity,
        hosts: hosts.length > 0 ? MANUAL : ANY,
        hosts_manual: hosts.join(', '),
        newSeverity,
        new_severity_from_list,
        nvt_name: isDefined(nvt) ? nvt.name : undefined,
        oid: isDefined(nvt) ? nvt.oid : undefined,
        override,
        port: isDefined(override.port) ? MANUAL : ANY,
        port_manual: override.port,
        result_id: hasId(result) ? RESULT_UUID : RESULT_ANY,
        result_name: hasId(result) ? result.name : undefined,
        result_uuid: hasId(result) ? result.id : undefined,
        severity: override.severity,
        task_id: hasId(task) ? TASK_SELECTED : TASK_ANY,
        task_uuid: hasId(task) ? task.id : undefined,
        text: override.text,
        title: _('Edit Override {{- name}}', {
          name: shorten(override.text, 20),
        }),
      });
    } else {
      this.setState({
        dialogVisible: true,
        active: undefined,
        custom_severity: undefined,
        hosts: undefined,
        hosts_manual: undefined,
        id: undefined,
        newSeverity: undefined,
        nvt_name: undefined,
        oid: undefined,
        override: undefined,
        port: undefined,
        port_manual: undefined,
        result_id: undefined,
        result_name: undefined,
        result_uuid: undefined,
        severity: undefined,
        task_id: undefined,
        task_uuid: undefined,
        text: undefined,
        title: undefined,
        ...initial,
      });
    }
    this.handleInteraction();

    this.loadTasks();
  }

  closeOverrideDialog() {
    this.setState({dialogVisible: false});
  }

  handleCloseOverrideDialog() {
    this.setState({dialogVisible: false});
    this.handleInteraction();
  }

  openCreateOverrideDialog(initial = {}) {
    this.openOverrideDialog(undefined, initial);
  }

  handleInteraction() {
    const {onInteraction} = this.props;
    if (isDefined(onInteraction)) {
      onInteraction();
    }
  }

  loadTasks() {
    const {gmp} = this.props;

    gmp.tasks.getAll().then(response => this.setState({tasks: response.data}));
  }

  render() {
    const {
      children,
      onCloned,
      onCloneError,
      onCreated,
      onCreateError,
      onDeleted,
      onDeleteError,
      onDownloaded,
      onDownloadError,
      onInteraction,
      onSaved,
      onSaveError,
    } = this.props;

    const {
      dialogVisible,
      active,
      custom_severity,
      hosts,
      hosts_manual,
      id,
      newSeverity,
      new_severity_from_list,
      nvt_name,
      oid,
      override,
      port,
      port_manual,
      result_id,
      result_name,
      result_uuid,
      severity,
      task_id,
      task_uuid,
      tasks,
      text,
      title,
      ...initial
    } = this.state;

    return (
      <EntityComponent
        name="override"
        onCloneError={onCloneError}
        onCloned={onCloned}
        onCreateError={onCreateError}
        onCreated={onCreated}
        onDeleteError={onDeleteError}
        onDeleted={onDeleted}
        onDownloadError={onDownloadError}
        onDownloaded={onDownloaded}
        onInteraction={onInteraction}
        onSaveError={onSaveError}
        onSaved={onSaved}
      >
        {({save, ...other}) => (
          <React.Fragment>
            {children({
              ...other,
              create: this.openCreateOverrideDialog,
              edit: this.openOverrideDialog,
            })}
            {dialogVisible && (
              <OverrideDialog
                active={active}
                custom_severity={custom_severity}
                hosts={hosts}
                hosts_manual={hosts_manual}
                id={id}
                newSeverity={newSeverity}
                new_severity_from_list={new_severity_from_list}
                nvt_name={nvt_name}
                oid={oid}
                override={override}
                port={port}
                port_manual={port_manual}
                result_id={result_id}
                result_name={result_name}
                result_uuid={result_uuid}
                severity={severity}
                task_id={task_id}
                task_uuid={task_uuid}
                tasks={tasks}
                text={text}
                title={title}
                onClose={this.handleCloseOverrideDialog}
                onSave={d => {
                  this.handleInteraction();
                  return save(d).then(() => this.closeOverrideDialog());
                }}
                {...initial}
              />
            )}
          </React.Fragment>
        )}
      </EntityComponent>
    );
  }
}

OverrideComponent.propTypes = {
  children: PropTypes.func.isRequired,
  gmp: PropTypes.gmp.isRequired,
  onCloneError: PropTypes.func,
  onCloned: PropTypes.func,
  onCreateError: PropTypes.func,
  onCreated: PropTypes.func,
  onDeleteError: PropTypes.func,
  onDeleted: PropTypes.func,
  onDownloadError: PropTypes.func,
  onDownloaded: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  onSaveError: PropTypes.func,
  onSaved: PropTypes.func,
};

export default withGmp(OverrideComponent);
