/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {YES_VALUE} from 'gmp/parser';
import {first} from 'gmp/utils/array';
import {getEntityType, pluralizeType, typeName} from 'gmp/utils/entitytype';
import {isDefined} from 'gmp/utils/identity';
import {shorten} from 'gmp/utils/string';
import React from 'react';
import EntityComponent from 'web/entity/EntityComponent';
import TagDialog from 'web/pages/tags/Dialog';
import compose from 'web/utils/Compose';
import PropTypes from 'web/utils/PropTypes';
import withCapabilities from 'web/utils/withCapabilities';
import withGmp from 'web/utils/withGmp';
import withTranslation from 'web/utils/withTranslation';

export const SELECT_MAX_RESOURCES = 200; // concerns items in TagDialog's Select
export const MAX_RESOURCES = 40; // concerns listing in "Assigned Resources" tab

const TYPES = [
  'alert',
  'audit',
  'auditreport',
  'host',
  'operatingsystem',
  'cpe',
  'credential',
  'cve',
  'certbund',
  'dfncert',
  'filter',
  'group',
  'note',
  'nvt',
  'override',
  'permission',
  'policy',
  'portlist',
  'report',
  'reportconfig',
  'reportformat',
  'result',
  'role',
  'scanconfig',
  'scanner',
  'schedule',
  'target',
  'task',
  'tlscertificate',
  'user',
];

class TagComponent extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {dialogVisible: false};

    this.handleCloseTagDialog = this.handleCloseTagDialog.bind(this);
    this.handleEnableTag = this.handleEnableTag.bind(this);
    this.handleDisableTag = this.handleDisableTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.openTagDialog = this.openTagDialog.bind(this);
    this.openCreateTagDialog = this.openCreateTagDialog.bind(this);
  }

  handleEnableTag(tag) {
    const {gmp, onEnabled, onEnableError} = this.props;

    this.handleInteraction();

    gmp.tag.enable(tag).then(onEnabled, onEnableError);
  }

  handleDisableTag(tag) {
    const {gmp, onDisabled, onDisableError} = this.props;

    this.handleInteraction();

    gmp.tag.disable(tag).then(onDisabled, onDisableError);
  }

  handleAddTag({name, value, entity}) {
    const {gmp, onAdded, onAddError} = this.props;

    this.handleInteraction();

    return gmp.tag
      .create({
        name,
        value,
        active: YES_VALUE,
        resource_ids: [entity.id],
        resource_type: getEntityType(entity),
      })
      .then(onAdded, onAddError);
  }

  getResourceTypes() {
    const {capabilities} = this.props;
    return TYPES.map(type =>
      capabilities.mayAccess(type) ? [type, typeName(type)] : undefined,
    ).filter(isDefined);
  }

  openTagDialog(tag, options = {}) {
    const {_} = this.props;

    const {gmp} = this.props;
    const resource_types = this.getResourceTypes();

    if (isDefined(tag)) {
      gmp.tag.get({id: tag.id}).then(response => {
        const {active, comment, id, name, resourceCount, resourceType, value} =
          response.data;
        const filter = 'rows=' + SELECT_MAX_RESOURCES + ' tag_id="' + id;
        gmp[pluralizeType(resourceType)].get({filter}).then(resp => {
          const resources = resp.data;
          this.setState({
            active,
            comment,
            dialogVisible: true,
            id,
            name,
            resourceCount,
            resource_ids: resources.map(res => res.id),
            resource_type: isDefined(resourceType)
              ? resourceType
              : first(resource_types, [])[0],
            resource_types,
            resources_action:
              resourceCount <= SELECT_MAX_RESOURCES ? undefined : 'add',
            title: _('Edit Tag {{name}}', {name: shorten(name)}),
            value,
            ...options,
          });
        });
      });
    } else {
      this.setState({
        active: undefined,
        comment: undefined,
        id: undefined,
        name: undefined,
        resourceCount: 0,
        resource_ids: [],
        resource_type: undefined,
        resource_types,
        dialogVisible: true,
        title: undefined,
        value: undefined,
        ...options,
      });
    }

    this.handleInteraction();
  }

  closeTagDialog() {
    this.setState({dialogVisible: false});
  }

  handleCloseTagDialog() {
    this.closeTagDialog();
    this.handleInteraction();
  }

  openCreateTagDialog(options = {}) {
    this.openTagDialog(undefined, options);
  }

  handleRemove(tag_id, entity) {
    const {gmp, onRemoved, onRemoveError} = this.props;

    this.handleInteraction();

    return gmp.tag
      .get({id: tag_id})
      .then(response => response.data)
      .then(tag =>
        gmp.tag.save({
          ...tag,
          resource_id: entity.id,
          resource_type: tag.resourceType,
          resources_action: 'remove',
        }),
      )
      .then(onRemoved, onRemoveError);
  }

  handleInteraction() {
    const {onInteraction} = this.props;

    if (isDefined(onInteraction)) {
      onInteraction();
    }
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
      active,
      comment,
      id,
      name,
      resource_ids,
      resource_type,
      resource_types = [],
      resourceCount,
      dialogVisible,
      title,
      value,
      ...options
    } = this.state;

    return (
      <EntityComponent
        name="tag"
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
              add: this.handleAddTag,
              create: this.openCreateTagDialog,
              edit: this.openTagDialog,
              enable: this.handleEnableTag,
              disable: this.handleDisableTag,
              remove: this.handleRemove,
            })}
            {dialogVisible && (
              <TagDialog
                active={active}
                comment={comment}
                id={id}
                name={name}
                resourceCount={resourceCount}
                resource_ids={resource_ids}
                resource_type={resource_type}
                resource_types={resource_types}
                title={title}
                value={value}
                onClose={this.handleCloseTagDialog}
                onSave={d => {
                  this.handleInteraction();
                  return save(d).then(() => this.closeTagDialog());
                }}
                {...options}
              />
            )}
          </React.Fragment>
        )}
      </EntityComponent>
    );
  }
}

TagComponent.propTypes = {
  capabilities: PropTypes.capabilities.isRequired,
  children: PropTypes.func.isRequired,
  gmp: PropTypes.gmp.isRequired,
  onAddError: PropTypes.func,
  onAdded: PropTypes.func,
  onCloneError: PropTypes.func,
  onCloned: PropTypes.func,
  onCreateError: PropTypes.func,
  onCreated: PropTypes.func,
  onDeleteError: PropTypes.func,
  onDeleted: PropTypes.func,
  onDisableError: PropTypes.func,
  onDisabled: PropTypes.func,
  onDownloadError: PropTypes.func,
  onDownloaded: PropTypes.func,
  onEnableError: PropTypes.func,
  onEnabled: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  onRemoveError: PropTypes.func,
  onRemoved: PropTypes.func,
  onSaveError: PropTypes.func,
  onSaved: PropTypes.func,
  _: PropTypes.func.isRequired,
};

export default compose(
  withTranslation,
  withGmp,
  withCapabilities,
)(TagComponent);
