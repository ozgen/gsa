/* SPDX-FileCopyrightText: 2025 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {describe, expect, test} from '@gsa/testing';
import React from 'react';
import {rendererWith, screen} from 'web/utils/Testing';
import Menu from 'web/components/menu/Menu';

const renderMenuWith = ({capabilities, gmpSettings}) => {
  const gmp = {
    settings: gmpSettings,
  };

  const {render} = rendererWith({
    capabilities,
    gmp,
    router: true,
  });
  return render(<Menu />);
};

describe('Menu rendering', () => {
  test.each([
    'Dashboards',
    'Scans',
    'Assets',
    'Resilience',
    'Security Information',
    'Configuration',
    'Administration',
    'Help',
  ])('should render top-level menu: %s', async label => {
    renderMenuWith({
      capabilities: {
        mayAccess: () => true,
        mayOp: () => true,
        featureEnabled: () => true,
      },
      gmpSettings: {
        enableAssetManagement: false,
        reloadInterval: 5000,
        reloadIntervalActive: 5000,
        reloadIntervalInactive: 5000,
      },
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test.each([
    'Tasks',
    'Reports',
    'Results',
    'Vulnerabilities',
    'Notes',
    'Overrides',
    'Remediation Tickets',
    'Compliance Policies',
    'Compliance Audits',
    'Compliance Audit Reports',
    'NVTs',
    'CVEs',
    'CPEs',
    'CERT-Bund Advisories',
    'DFN-CERT Advisories',
    'Targets',
    'Port Lists',
    'Credentials',
    'Scan Configs',
    'Alerts',
    'Schedules',
    'Report Configs',
    'Report Formats',
    'Scanners',
    'Filters',
    'Tags',
    'Users',
    'Groups',
    'Roles',
    'Permissions',
    'Performance',
    'Trashcan',
    'Feed Status',
    'LDAP',
    'RADIUS',
    'CVSS Calculator',
    'About',
  ])('should render sub-menu: %s', async label => {
    renderMenuWith({
      capabilities: {
        mayAccess: () => true,
        mayOp: () => true,
        featureEnabled: () => true,
      },
      gmpSettings: {
        enableAssetManagement: false,
        reloadInterval: 5000,
        reloadIntervalActive: 5000,
        reloadIntervalInactive: 5000,
      },
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test('should not render Remediation Tickets when mayAccess returns false', async () => {
    renderMenuWith({
      capabilities: {
        mayAccess: feature => feature !== 'tickets',
        mayOp: () => true,
        featureEnabled: () => true,
      },
      gmpSettings: {
        enableAssetManagement: false,
        reloadInterval: 5000,
        reloadIntervalActive: 5000,
        reloadIntervalInactive: 5000,
      },
    });

    expect(screen.queryByText('Remediation Tickets')).not.toBeInTheDocument();
  });

  test('should not render Configuration menu when none of its mayAccess permissions are true', async () => {
    const configFeatures = [
      'targets',
      'port_lists',
      'credentials',
      'scan_configs',
      'alerts',
      'schedules',
      'report_configs',
      'report_formats',
      'scanners',
      'filters',
      'tags',
    ];

    renderMenuWith({
      capabilities: {
        mayAccess: feature => !configFeatures.includes(feature),
        mayOp: () => true,
        featureEnabled: () => true,
      },
      gmpSettings: {
        enableAssetManagement: false,
        reloadInterval: 5000,
        reloadIntervalActive: 5000,
        reloadIntervalInactive: 5000,
      },
    });

    expect(screen.queryByText('Configuration')).not.toBeInTheDocument();
  });

  test('should not render Asset menu when enableAssetManagement is false', async () => {
    renderMenuWith({
      capabilities: {
        mayAccess: () => false,
        mayOp: () => false,
        featureEnabled: () => false,
      },
      gmpSettings: {
        enableAssetManagement: false,
        reloadInterval: 5000,
        reloadIntervalActive: 5000,
        reloadIntervalInactive: 5000,
      },
    });

    expect(screen.queryByText('Asset')).not.toBeInTheDocument();
  });
});
