/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
  GREENBONE_SENSOR_SCANNER_TYPE,
  scannerTypeName,
} from 'gmp/models/scanner';
import {parseInt} from 'gmp/parser';
import {filter, map} from 'gmp/utils/array';
import {hasValue, isDefined} from 'gmp/utils/identity';
import React, {useCallback} from 'react';
import SaveDialog from 'web/components/dialog/SaveDialog';
import FormGroup from 'web/components/form/FormGroup';
import Select from 'web/components/form/Select';
import TextField from 'web/components/form/TextField';
import { NewIcon } from 'web/components/icon/icons';
import useGmp from 'web/hooks/useGmp';
import useTranslation from 'web/hooks/useTranslation';
import PropTypes from 'web/utils/PropTypes';
import {renderSelectItems} from 'web/utils/Render';
const AVAILABLE_SCANNER_TYPES = [GREENBONE_SENSOR_SCANNER_TYPE];

const ScannerDialog = ({
  ca_pub,
  comment = '',
  scanner,
  credentials,
  credential_id,
  host = 'localhost',
  id,
  name,
  port = '22',
  title,
  type,
  which_cert,
  onClose,
  onCredentialChange,
  onNewCredentialClick,
  onSave,
  onScannerTypeChange,
}) => {
  const [_] = useTranslation();
  const gmp = useGmp();

  name = name || _('Unnamed');
  title = title || _('New Scanner');

  const handleTypeChange = useCallback(
    (value, name) => {
      if (onScannerTypeChange) {
        value = parseInt(value);

        onScannerTypeChange(value, name);
      }
    },
    [onScannerTypeChange],
  );

  const data = {
    ca_pub,
    comment,
    host,
    id,
    name,
    port,
    which_cert,
  };

  let SCANNER_TYPES = [];

  if (gmp.settings.enableGreenboneSensor) {
    type = hasValue(type) ? type : GREENBONE_SENSOR_SCANNER_TYPE;
    SCANNER_TYPES = [GREENBONE_SENSOR_SCANNER_TYPE];
  } else {
    type = hasValue(type) ? type : undefined;
    SCANNER_TYPES = [];
  }

  const scannerTypesOptions = map(SCANNER_TYPES, scannerType => ({
    label: scannerTypeName(scannerType),
    value: scannerType,
  }));

  const scanner_credentials = filter(credentials);
  const isInUse = isDefined(scanner) && scanner.isInUse();

  const isGreenboneSensorType = type === GREENBONE_SENSOR_SCANNER_TYPE;

  if (isGreenboneSensorType) {
    credential_id = '';
  }

  return (
    <SaveDialog // the dialog current changes sizes based on content. For the future we should somehow fix the size to prevent jumping around.
      defaultValues={data}
      title={title}
      values={{
        credential_id,
        type,
      }}
      onClose={onClose}
      onSave={onSave}
    >
      {({values: state, onValueChange}) => {
        return (
          <>
            <FormGroup title={_('Name')}>
              <TextField
                name="name"
                value={state.name}
                onChange={onValueChange}
              />
            </FormGroup>

            <FormGroup title={_('Comment')}>
              <TextField
                name="comment"
                value={state.comment}
                onChange={onValueChange}
              />
            </FormGroup>
            <FormGroup title={_('Type')}>
              <Select
                disabled={isInUse}
                items={scannerTypesOptions}
                name="type"
                value={state.type}
                onChange={handleTypeChange}
              />
            </FormGroup>
            <FormGroup title={_('Host')}>
              <TextField
                disabled={isInUse}
                name="host"
                value={state.host}
                onChange={onValueChange}
              />
            </FormGroup>

            {!isGreenboneSensorType && (
              <FormGroup direction="row" title={_('Credential')}>
                <Select
                  grow="1"
                  items={renderSelectItems(scanner_credentials)}
                  name="credential_id"
                  value={credential_id}
                  onChange={onCredentialChange}
                />
                <NewIcon
                  title={_('Create a new Credential')}
                  value={type}
                  onClick={onNewCredentialClick}
                />
              </FormGroup>
            )}
          </>
        );
      }}
    </SaveDialog>
  );
};

ScannerDialog.propTypes = {
  ca_pub: PropTypes.string,
  comment: PropTypes.string,
  credential_id: PropTypes.id,
  credentials: PropTypes.array,
  host: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  port: PropTypes.string,
  scanner: PropTypes.model,
  title: PropTypes.string,
  type: PropTypes.oneOf(AVAILABLE_SCANNER_TYPES),
  which_cert: PropTypes.oneOf(['default', 'existing', 'new']),
  onClose: PropTypes.func.isRequired,
  onCredentialChange: PropTypes.func.isRequired,
  onNewCredentialClick: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  onScannerTypeChange: PropTypes.func.isRequired,
  onValueChange: PropTypes.func,
};

export default ScannerDialog;
