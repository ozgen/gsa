/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {describe, test, expect, testing} from '@gsa/testing';

import Credential, {
  USERNAME_PASSWORD_CREDENTIAL_TYPE,
  CLIENT_CERTIFICATE_CREDENTIAL_TYPE,
  USERNAME_SSH_KEY_CREDENTIAL_TYPE,
} from 'gmp/models/credential';

import {rendererWith, fireEvent, screen} from 'web/utils/testing';

import TargetDialog from 'web/pages/targets/dialog';
import {
  changeInputValue,
  getDialogCloseButton,
  getDialogSaveButton,
  getFileInputs,
  getRadioInputs,
  getSelectElements,
  getSelectItemElementsForSelect,
  getTextInputs,
} from 'web/components/testing';

const cred1 = Credential.fromElement({
  _id: '5678',
  name: 'client certificate',
  type: CLIENT_CERTIFICATE_CREDENTIAL_TYPE,
});

const cred2 = Credential.fromElement({
  _id: '2345',
  name: 'username+password',
  type: USERNAME_PASSWORD_CREDENTIAL_TYPE,
});

const cred3 = Credential.fromElement({
  _id: '5463',
  name: 'up2',
  type: USERNAME_PASSWORD_CREDENTIAL_TYPE,
});

const cred4 = Credential.fromElement({
  id: '6536',
  name: 'ssh_key',
  type: USERNAME_SSH_KEY_CREDENTIAL_TYPE,
});

const credentials = [cred1, cred2, cred3, cred4];

const gmp = {settings: {enableGreenboneSensor: true}};

describe('TargetDialog component tests', () => {
  test.only('should render with default values', () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {baseElement} = render(
      <TargetDialog
        credentials={credentials}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    const inputs = getTextInputs();
    const fileInputs = getFileInputs();
    const radioInputs = getRadioInputs();

    expect(inputs[0]).toHaveAttribute('name', 'name');
    expect(inputs[0]).toHaveValue('Unnamed'); // name field

    expect(inputs[1]).toHaveAttribute('name', 'comment');
    expect(inputs[1]).toHaveValue(''); // comment field

    expect(radioInputs[0]).toHaveAttribute('name', 'target_source');
    expect(radioInputs[0]).toHaveAttribute('value', 'manual');
    expect(radioInputs[0]).toBeChecked();

    expect(inputs[2]).toHaveAttribute('name', 'hosts');
    expect(inputs[2]).toHaveValue('');

    expect(radioInputs[1]).toHaveAttribute('name', 'target_source');
    expect(radioInputs[1]).toHaveAttribute('value', 'file');
    expect(radioInputs[1]).not.toBeChecked();

    expect(fileInputs[0]).toBeDisabled();

    expect(radioInputs[2]).toHaveAttribute('name', 'target_exclude_source');
    expect(radioInputs[2]).toHaveAttribute('value', 'manual');
    expect(radioInputs[2]).toBeChecked();

    expect(inputs[3]).toHaveAttribute('name', 'exclude_hosts');
    expect(inputs[3]).toHaveValue('');

    expect(radioInputs[3]).toHaveAttribute('name', 'target_exclude_source');
    expect(radioInputs[3]).toHaveAttribute('value', 'file');
    expect(radioInputs[3]).not.toBeChecked();

    expect(fileInputs[1]).toBeDisabled();

    expect(radioInputs[4]).toHaveAttribute('value', '1');
    expect(radioInputs[4]).toBeChecked();

    expect(radioInputs[5]).toHaveAttribute('name', 'allowSimultaneousIPs');
    expect(radioInputs[5]).toHaveAttribute('value', '0');
    expect(radioInputs[5]).not.toBeChecked();

    const selects = getSelectElements();

    expect(baseElement).not.toHaveTextContent('Elevate privileges'); // elevate privileges should not be rendered without valid ssh_credential_id

    expect(selects[0]).toHaveValue('OpenVAS Default');
    expect(
      screen.getAllByTitle('Create a new port list')[0],
    ).toBeInTheDocument();

    expect(selects[1]).toHaveValue('Scan Config Default');

    const createCredentialIcons = screen.getAllByTitle(
      'Create a new credential',
    );
    expect(createCredentialIcons.length).toEqual(8); // Each icon has both a span and an svg icon. There should be 4 total

    expect(selects[2]).toHaveValue('--');
    expect(baseElement).toHaveTextContent('on port');
    expect(selects[3]).toHaveValue('--');
    expect(selects[4]).toHaveValue('--');
    expect(selects[5]).toHaveValue('--');

    expect(radioInputs[6]).toHaveAttribute('value', '1');
    expect(radioInputs[6]).not.toBeChecked();

    expect(radioInputs[7]).toHaveAttribute('name', 'reverse_lookup_only');
    expect(radioInputs[7]).toHaveAttribute('value', '0');
    expect(radioInputs[7]).toBeChecked();

    expect(radioInputs[8]).toHaveAttribute('value', '1');
    expect(radioInputs[8]).not.toBeChecked();

    expect(radioInputs[9]).toHaveAttribute('name', 'reverse_lookup_unify');
    expect(radioInputs[9]).toHaveAttribute('value', '0');
    expect(radioInputs[9]).toBeChecked();
  });

  test('should display value from props', () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {baseElement} = render(
      <TargetDialog
        credentials={credentials}
        id={'foo'}
        alive_tests={'Scan Config Default'}
        allowSimultaneousIPs={0}
        comment={'hello world'}
        exclude_hosts={''}
        hosts={'123.455.67.434'}
        in_use={false}
        name={'target'}
        reverse_lookup_only={0}
        reverse_lookup_unify={0}
        smb_credential_id={'2345'}
        target_title={'Edit Target target'}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    const inputs = getTextInputs();
    const radioInputs = getRadioInputs();
    const fileInputs = getFileInputs();
    const selects = getSelectElements();

    expect(inputs[0]).toHaveAttribute('name', 'name');
    expect(inputs[0]).toHaveValue('target'); // name field

    expect(inputs[1]).toHaveAttribute('name', 'comment');
    expect(inputs[1]).toHaveValue('hello world'); // comment field

    expect(radioInputs[0]).toHaveAttribute('name', 'target_source');
    expect(radioInputs[0]).toHaveAttribute('value', 'manual');
    expect(radioInputs[0]).toBeChecked();

    expect(inputs[2]).toHaveAttribute('name', 'hosts');
    expect(inputs[2]).toHaveAttribute('value', '123.455.67.434');

    expect(radioInputs[1]).toHaveAttribute('name', 'target_source');
    expect(radioInputs[1]).toHaveAttribute('value', 'file');
    expect(radioInputs[1]).not.toBeChecked();

    expect(fileInputs[0]).toHaveAttribute('disabled');

    expect(radioInputs[2]).toHaveAttribute('name', 'target_exclude_source');
    expect(radioInputs[2]).toHaveAttribute('value', 'manual');
    expect(radioInputs[2]).toBeChecked();

    expect(inputs[3]).toHaveAttribute('name', 'exclude_hosts');
    expect(inputs[3]).toHaveValue('');

    expect(radioInputs[3]).toHaveAttribute('name', 'target_exclude_source');
    expect(radioInputs[3]).toHaveAttribute('value', 'file');
    expect(radioInputs[3]).not.toBeChecked();

    expect(fileInputs[1]).toBeDisabled();

    expect(radioInputs[4]).toHaveAttribute('value', '1');
    expect(radioInputs[4]).not.toBeChecked();

    expect(radioInputs[5]).toHaveAttribute('name', 'allowSimultaneousIPs');
    expect(radioInputs[5]).toHaveAttribute('value', '0');
    expect(radioInputs[5]).toBeChecked();

    expect(selects[0]).toHaveValue('OpenVAS Default');
    expect(
      screen.getAllByTitle('Create a new port list')[0],
    ).toBeInTheDocument();

    expect(selects[1]).toHaveValue('Scan Config Default');

    const createCredentialIcons = screen.getAllByTitle(
      'Create a new credential',
    );
    expect(createCredentialIcons.length).toEqual(8); // Each icon has both a span and an svg icon. There should be 4 total

    expect(baseElement).toHaveTextContent('on port');

    expect(selects[2]).toHaveValue('--');
    expect(selects[3]).toHaveValue('username+password');
    expect(selects[4]).toHaveValue('--');
    expect(selects[5]).toHaveValue('--');

    expect(radioInputs[6]).toHaveAttribute('value', '1');
    expect(radioInputs[6]).not.toBeChecked();

    expect(radioInputs[7]).toHaveAttribute('name', 'reverse_lookup_only');
    expect(radioInputs[7]).toHaveAttribute('value', '0');
    expect(radioInputs[7]).toBeChecked();

    expect(radioInputs[8]).toHaveAttribute('value', '1');
    expect(radioInputs[8]).not.toBeChecked();

    expect(radioInputs[9]).toHaveAttribute('name', 'reverse_lookup_unify');
    expect(radioInputs[9]).toHaveAttribute('value', '0');
    expect(radioInputs[9]).toBeChecked();
  });

  test('should allow to change values and save the dialog', () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {getByName, getAllByName} = render(
      <TargetDialog
        credentials={credentials}
        id={'foo'}
        alive_tests={'Scan Config Default'}
        allowSimultaneousIPs={0}
        comment={'hello world'}
        exclude_hosts={''}
        hosts={'123.455.67.434'}
        in_use={false}
        name={'target'}
        reverse_lookup_only={0}
        reverse_lookup_unify={0}
        smb_credential_id={'2345'}
        target_title={'Edit Target target'}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    // text input
    const nameInput = getByName('name');
    changeInputValue(nameInput, 'ross');

    // radio input
    const simultaneousIPInput = getAllByName('allowSimultaneousIPs');
    expect(simultaneousIPInput.length).toBe(2);

    expect(simultaneousIPInput[0]).not.toBeChecked();
    expect(simultaneousIPInput[0]).toHaveAttribute('value', '1');

    expect(simultaneousIPInput[1]).toBeChecked();
    expect(simultaneousIPInput[1]).toHaveAttribute('value', '0');

    fireEvent.click(simultaneousIPInput[0]); // radio button check yes

    const saveButton = getDialogSaveButton();
    fireEvent.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      alive_tests: 'Scan Config Default',
      allowSimultaneousIPs: 1,
      comment: 'hello world',
      esxi_credential_id: '0',
      exclude_hosts: '',
      hosts: '123.455.67.434',
      hosts_count: undefined,
      id: 'foo',
      in_use: false,
      name: 'ross',
      port: 22,
      port_list_id: 'c7e03b6c-3bbe-11e1-a057-406186ea4fc5',
      reverse_lookup_only: 0,
      reverse_lookup_unify: 0,
      smb_credential_id: '2345',
      snmp_credential_id: '0',
      ssh_credential_id: '0',
      ssh_elevate_credential_id: '0',
      target_exclude_source: 'manual',
      target_source: 'manual',
      target_title: 'Edit Target target',
    });
  });

  test('should render elevate privilege option if ssh credential is defined', () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {baseElement} = render(
      <TargetDialog
        credentials={credentials}
        id={'foo'}
        alive_tests={'Scan Config Default'}
        allowSimultaneousIPs={0}
        comment={'hello world'}
        exclude_hosts={''}
        hosts={'123.455.67.434'}
        in_use={false}
        name={'target'}
        reverse_lookup_only={0}
        reverse_lookup_unify={0}
        smb_credential_id={'2345'}
        ssh_credential_id={'2345'}
        target_title={'Edit Target target'}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    expect(baseElement).toHaveTextContent('Elevate privileges');

    const selects = getSelectElements();
    expect(selects.length).toEqual(7); // Should have 7 selects

    const createCredentialIcons = screen.getAllByTitle(
      'Create a new credential',
    );
    expect(createCredentialIcons.length).toEqual(10); // Each icon has both a span and an svg icon. There should be 5 total, including elevate privileges
  });

  test('ssh elevate credential dropdown should only allow username + password options and remove ssh credential from list', async () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {baseElement} = render(
      <TargetDialog
        credentials={credentials}
        id={'foo'}
        alive_tests={'Scan Config Default'}
        allowSimultaneousIPs={0}
        comment={'hello world'}
        exclude_hosts={''}
        hosts={'123.455.67.434'}
        in_use={false}
        name={'target'}
        reverse_lookup_only={0}
        reverse_lookup_unify={0}
        smb_credential_id={'5463'}
        ssh_credential_id={'2345'}
        target_title={'Edit Target target'}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    expect(baseElement).toHaveTextContent('Elevate privileges');

    const selects = getSelectElements();
    expect(selects.length).toEqual(7); // Should have 7 selects

    const selectItems = await getSelectItemElementsForSelect(selects[3]);
    expect(selectItems.length).toBe(2); // "original" ssh option removed

    expect(selectItems[0]).toHaveTextContent('--'); // null option
    expect(selectItems[1]).toHaveTextContent('up2');
  });

  test('ssh credential dropdown should remove ssh elevate credential from list', async () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {baseElement} = render(
      <TargetDialog
        credentials={credentials}
        id={'foo'}
        alive_tests={'Scan Config Default'}
        allowSimultaneousIPs={0}
        comment={'hello world'}
        exclude_hosts={''}
        hosts={'123.455.67.434'}
        in_use={false}
        name={'target'}
        reverse_lookup_only={0}
        reverse_lookup_unify={0}
        ssh_elevate_credential_id={'5463'}
        ssh_credential_id={'2345'}
        target_title={'Edit Target target'}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    expect(baseElement).toHaveTextContent('Elevate privileges');

    const selects = getSelectElements();
    expect(selects.length).toEqual(7); // Should have 7 selects

    const selectItems = await getSelectItemElementsForSelect(selects[2]);
    expect(selectItems.length).toBe(3); // ssh elevate option removed

    expect(selectItems[0]).toHaveTextContent('--'); // null option
    expect(selectItems[1]).toHaveTextContent('username+password');
    expect(selectItems[2]).toHaveTextContent('ssh_key');
  });

  test('should disable editing certain fields if target is in use', () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    const {baseElement, queryAllByTitle} = render(
      <TargetDialog
        credentials={credentials}
        id={'foo'}
        alive_tests={'Scan Config Default'}
        allowSimultaneousIPs={0}
        comment={'hello world'}
        exclude_hosts={''}
        hosts={'123.455.67.434'}
        in_use={true}
        name={'target'}
        reverse_lookup_only={0}
        reverse_lookup_unify={0}
        ssh_credential_id={'2345'}
        ssh_elevate_credential_id={'5463'}
        target_title={'Edit Target target'}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    expect(baseElement).toHaveTextContent('Elevate privileges');

    const newIcons = queryAllByTitle('Create a new credential');
    expect(newIcons.length).toBe(0); // no new credential can be created

    const selects = getSelectElements();
    expect(selects.length).toEqual(7); // Should have 7 selects

    expect(selects[0]).toHaveValue('OpenVAS Default');
    expect(selects[0]).toBeDisabled();

    expect(selects[1]).toHaveValue('Scan Config Default');
    expect(selects[2]).toHaveValue('username+password');
    expect(selects[2]).toBeDisabled();

    expect(selects[3]).toHaveValue('up2');
    expect(selects[3]).toBeDisabled();
    expect(selects[4]).toHaveValue('--');
    expect(selects[4]).toBeDisabled();

    expect(selects[5]).toHaveValue('--');
    expect(selects[5]).toBeDisabled();

    expect(selects[6]).toHaveValue('--');
    expect(selects[6]).toBeDisabled();
  });

  test('should allow to close the dialog', () => {
    const handleClose = testing.fn();
    const handleChange = testing.fn();
    const handleSave = testing.fn();
    const handleCreate = testing.fn();

    const {render} = rendererWith({gmp, capabilities: true});

    render(
      <TargetDialog
        credentials={credentials}
        onClose={handleClose}
        onNewCredentialsClick={handleCreate}
        onNewPortListClick={handleCreate}
        onPortListChange={handleChange}
        onSnmpCredentialChange={handleChange}
        onSshCredentialChange={handleChange}
        onEsxiCredentialChange={handleChange}
        onSmbCredentialChange={handleChange}
        onSshElevateCredentialChange={handleChange}
        onSave={handleSave}
      />,
    );

    const closeButton = getDialogCloseButton();
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
    expect(handleSave).not.toHaveBeenCalled();
  });
});
