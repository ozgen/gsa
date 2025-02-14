/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {AppNavigation} from '@greenbone/opensight-ui-components-mantinev7';
import {isDefined} from 'gmp/utils/identity';
import {
  BarChart3,
  Server,
  ShieldCheck,
  View,
  Wrench,
  SlidersHorizontal,
  FileCheck,
  CircleHelp,
} from 'lucide-react';
import React from 'react';
import {useMatch} from "react-router";
import Link from 'web/components/link/link';
import useCapabilities from 'web/hooks/useCapabilities';
import useGmp from 'web/hooks/useGmp';
import useManualURL from 'web/hooks/useManualURL';
import useTranslation from 'web/hooks/useTranslation';

const Menu = () => {
  const [_] = useTranslation();
  const capabilities = useCapabilities();
  const gmp = useGmp();
  const manualURL = useManualURL();

  function checkCapabilities(capabilitiesList) {
    return capabilitiesList.reduce(
      (sum, cur) => sum || capabilities.mayAccess(cur),
      false,
    );
  }

  const mayOpScans = checkCapabilities([
    'tasks',
    'reports',
    'results',
    'vulns',
    'overrides',
    'notes',
  ]);

  const mayOpConfiguration = checkCapabilities([
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
  ]);

  const mayOpResilience = checkCapabilities(['tickets', 'policies', 'audits']);

  const mayOpAssets = checkCapabilities(['assets', 'tls_certificates']);

  const useIsActive = path => Boolean(useMatch(path));

  const isUserActive = useIsActive('/users');
  const isGroupsActive = useIsActive('/groups');
  const isRolesActive = useIsActive('/roles');
  const isPermissionsActive = useIsActive('/permissions');
  const isPerformanceActive = useIsActive('/performance');
  const isTrashcanActive = useIsActive('/trashcan');
  const isFeedStatusActive = useIsActive('/feedstatus');
  const isLdapActive = useIsActive('/ldap');
  const isRadiusActive = useIsActive('/radius');

  const isCvssCalculatorActive = useIsActive('/cvsscalculator');
  const isAboutActive = useIsActive('/about');

  const subNavConfigs = {
    scans: [
      {
        label: _('Tasks'),
        to: '/tasks',
        activeCondition: useIsActive('/tasks'),
      },
      {
        label: _('Reports'),
        to: '/reports',
        activeCondition: useIsActive('/reports'),
      },
      {
        label: _('Results'),
        to: '/results',
        activeCondition: useIsActive('/results'),
      },
      {
        label: _('Vulnerabilities'),
        to: '/vulnerabilities',
        activeCondition: useIsActive('/vulnerabilities'),
      },
      {
        label: _('Notes'),
        to: '/notes',
        activeCondition: useIsActive('/notes'),
      },
      {
        label: _('Overrides'),
        to: '/overrides',
        activeCondition: useIsActive('/overrides'),
      },
    ],
    assets: [
      {
        label: _('Hosts'),
        to: '/hosts',
        activeCondition: useIsActive('/hosts'),
      },
      {
        label: _('Operating Systems'),
        to: '/operatingsystems',
        activeCondition: useIsActive('/operatingsystems'),
      },
      {
        label: _('TLS Certificates'),
        to: '/tlscertificates',
        activeCondition: useIsActive('/tlscertificates'),
      },
    ],
    resilience: [
      {
        label: _('Remediation Tickets'),
        to: '/tickets',
        activeCondition: useIsActive('/tickets'),
      },
      {
        label: _('Compliance Policies'),
        to: '/policies',
        activeCondition: useIsActive('/policies'),
      },
      {
        label: _('Compliance Audits'),
        to: '/audits',
        activeCondition: useIsActive('/audits'),
      },
      {
        label: _('Compliance Audit Reports'),
        to: '/auditreports',
        activeCondition: useIsActive('/auditreports'),
      },
    ],
    secInfo: [
      {
        label: _('NVTs'),
        to: '/nvts',
        activeCondition: useIsActive('/nvts'),
      },
      {
        label: _('CVEs'),
        to: '/cves',
        activeCondition: useIsActive('/cves'),
      },
      {
        label: _('CPEs'),
        to: '/cpes',
        activeCondition: useIsActive('/cpes'),
      },
      {
        label: _('CERT-Bund Advisories'),
        to: '/certbunds',
        activeCondition: useIsActive('/certbunds'),
      },
      {
        label: _('DFN-CERT Advisories'),
        to: '/dfncerts',
        activeCondition: useIsActive('/dfncerts'),
      },
    ],
    configuration: [
      {
        label: _('Targets'),
        to: '/targets',
        activeCondition: useIsActive('/targets'),
      },
      {
        label: _('Port Lists'),
        to: '/portlists',
        activeCondition: useIsActive('/portlists'),
      },
      {
        label: _('Credentials'),
        to: '/credentials',
        activeCondition: useIsActive('/credentials'),
      },
      {
        label: _('Scan Configs'),
        to: '/scanconfigs',
        activeCondition: useIsActive('/scanconfigs'),
      },
      {
        label: _('Alerts'),
        to: '/alerts',
        activeCondition: useIsActive('/alerts'),
      },
      {
        label: _('Schedules'),
        to: '/schedules',
        activeCondition: useIsActive('/schedules'),
      },
      {
        label: _('Report Configs'),
        to: '/reportconfigs',
        activeCondition: useIsActive('/reportconfigs'),
      },
      {
        label: _('Report Formats'),
        to: '/reportformats',
        activeCondition: useIsActive('/reportformats'),
      },
      {
        label: _('Scanners'),
        to: '/scanners',
        activeCondition: useIsActive('/scanners'),
      },
      {
        label: _('Filters'),
        to: '/filters',
        activeCondition: useIsActive('/filters'),
      },
      {
        label: _('Tags'),
        to: '/tags',
        activeCondition: useIsActive('/tags'),
      },
    ],
  };

  const createMenuItemWithSubNav = (label, key, icon, config) => ({
    label: label,
    key: key,
    icon: icon,
    subNav: config
      .map(({label, to, activeCondition, featureEnabled}) => ({
        label: label,
        to: to,
        active: activeCondition,
        visible:
          !isDefined(featureEnabled) ||
          capabilities.featureEnabled(featureEnabled),
      }))
      .filter(({visible}) => visible !== false),
  });

  const menuPoints = [
    [
      {
        label: _('Dashboards'),
        to: '/dashboards',
        icon: BarChart3,
      },
    ],
    [
      mayOpScans &&
        createMenuItemWithSubNav(
          _('Scans'),
          'scans',
          ShieldCheck,
          subNavConfigs.scans,
        ),
      mayOpAssets &&
        createMenuItemWithSubNav(
          _('Assets'),
          'assets',
          Server,
          subNavConfigs.assets,
        ),
      mayOpResilience &&
        createMenuItemWithSubNav(
          _('Resilience'),
          'resilience',
          FileCheck,
          subNavConfigs.resilience,
        ),
      capabilities.mayAccess('info') &&
        createMenuItemWithSubNav(
          _('Security Information'),
          'secInfo',
          View,
          subNavConfigs.secInfo,
        ),
      mayOpConfiguration &&
        createMenuItemWithSubNav(
          _('Configuration'),
          'configuration',
          Wrench,
          subNavConfigs.configuration,
        ),
      {
        label: _('Administration'),
        key: 'administration',
        icon: SlidersHorizontal,
        subNav: [
          capabilities.mayAccess('users') && {
            label: _('Users'),
            to: '/users',
            active: isUserActive,
          },
          capabilities.mayAccess('groups') && {
            label: _('Groups'),
            to: '/groups',
            active: isGroupsActive,
          },
          capabilities.mayAccess('roles') && {
            label: _('Roles'),
            to: '/roles',
            active: isRolesActive,
          },
          capabilities.mayAccess('permissions') && {
            label: _('Permissions'),
            to: '/permissions',
            active: isPermissionsActive,
          },
          capabilities.mayAccess('system_reports') && {
            label: _('Performance'),
            to: '/performance',
            active: isPerformanceActive,
          },
          {
            label: _('Trashcan'),
            to: '/trashcan',
            active: isTrashcanActive,
          },
          capabilities.mayAccess('feeds') && {
            label: _('Feed Status'),
            to: '/feedstatus',
            active: isFeedStatusActive,
          },
          capabilities.mayOp('describe_auth') &&
            capabilities.mayOp('modify_auth') && {
              label: _('LDAP'),
              to: '/ldap',
              active: isLdapActive,
            },
          capabilities.mayOp('describe_auth') &&
            capabilities.mayOp('modify_auth') && {
              label: _('RADIUS'),
              to: '/radius',
              active: isRadiusActive,
            },
        ].filter(Boolean),
      },
      {
        label: _('Help'),
        key: 'help',
        icon: CircleHelp,
        subNav: [
          {
            label: _('User Manual'),
            to: manualURL,
            isExternal: true,
          },
          {
            label: _('CVSS Calculator'),
            to: '/cvsscalculator',
            active: isCvssCalculatorActive,
          },
          {
            label: _('About'),
            to: '/about',
            active: isAboutActive,
          },
        ],
      },
    ].filter(Boolean),
    [
      gmp.settings.enableAssetManagement && {
        label: _('Asset'),
        to: '/asset-management',
        isExternal: true,
      },
    ].filter(Boolean),
  ];
  return <AppNavigation as={Link} menuPoints={menuPoints} />;
};

export default Menu;
