/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {_, _l} from 'gmp/locale/lang';
import {CVES_FILTER_FILTER} from 'gmp/models/filter';
import CreatedDisplay from 'web/components/dashboard/display/created/CreatedDisplay';
import transformCreated from 'web/components/dashboard/display/created/CreatedTransform';
import createDisplay from 'web/components/dashboard/display/createDisplay';
import DataTableDisplay from 'web/components/dashboard/display/DataTableDisplay';
import {registerDisplay} from 'web/components/dashboard/Registry';
import {CvesCreatedLoader} from 'web/pages/cves/dashboard/Loaders';
import Theme from 'web/utils/Theme';

export const CvesCreatedDisplay = createDisplay({
  loaderComponent: CvesCreatedLoader,
  displayComponent: CreatedDisplay,
  title: () => _('CVEs by Creation Time'),
  yAxisLabel: _l('# of created CVEs'),
  y2AxisLabel: _l('Total CVEs'),
  xAxisLabel: _l('Time'),
  yLine: {
    color: Theme.darkGreenTransparent,
    label: _l('Created CVEs'),
  },
  y2Line: {
    color: Theme.darkGreenTransparent,
    dashArray: '3, 2',
    label: _l('Total CVEs'),
  },
  displayId: 'cve-by-created',
  displayName: 'CveCreatedDisplay',
  filtersFilter: CVES_FILTER_FILTER,
});

export const CvesCreatedTableDisplay = createDisplay({
  loaderComponent: CvesCreatedLoader,
  displayComponent: DataTableDisplay,
  title: () => _('CVEs by Creation Time'),
  dataTitles: [_l('Creation Time'), _l('# of CVEs'), _l('Total CVEs')],
  dataRow: row => [row.label, row.y, row.y2],
  dataTransform: transformCreated,
  displayId: 'cve-by-created-table',
  displayName: 'CveCreatedTableDisplay',
  filtersFilter: CVES_FILTER_FILTER,
});

registerDisplay(CvesCreatedTableDisplay.displayId, CvesCreatedTableDisplay, {
  title: _l('Table: CVEs by Creation Time'),
});

registerDisplay(CvesCreatedDisplay.displayId, CvesCreatedDisplay, {
  title: _l('Chart: CVEs by Creation Time'),
});
