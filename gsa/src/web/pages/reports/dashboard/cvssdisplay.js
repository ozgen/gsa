/* Copyright (C) 2018-2019 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import {_, _l} from 'gmp/locale/lang';

import {REPORTS_FILTER_FILTER} from 'gmp/models/filter';

import CvssDisplay from 'web/components/dashboard/display/cvss/cvssdisplay';
import CvssTableDisplay from 'web/components/dashboard/display/cvss/cvsstabledisplay'; // eslint-disable-line max-len
import createDisplay from 'web/components/dashboard/display/createDisplay';
import {registerDisplay} from 'web/components/dashboard/registry';

import {ReportsSeverityLoader} from './loaders';

export const ReportsCvssDisplay = createDisplay({
  loaderComponent: ReportsSeverityLoader,
  displayComponent: CvssDisplay,
  yLabel: _l('# of Reports'),
  title: ({data: tdata}) => _('Reports by CVSS (Total: {{count}})',
    {count: tdata.total}),
  displayId: 'report-by-cvss',
  displayName: 'ReportsCvssDisplay',
  filtersFilter: REPORTS_FILTER_FILTER,
});

export const ReportsCvssTableDisplay = createDisplay({
  loaderComponent: ReportsSeverityLoader,
  displayComponent: CvssTableDisplay,
  yLabel: _l('# of Reports'),
  title: ({data: tdata}) => _('Reports by CVSS (Total: {{count}})',
    {count: tdata.total}),
  dataTitles: [
    _l('Severity'),
    _l('# of Reports'),
  ],
  displayId: 'report-by-cvss-table',
  displayName: 'ReportsCvssTableDisplay',
  filtersFilter: REPORTS_FILTER_FILTER,
});

registerDisplay(ReportsCvssDisplay.displayId, ReportsCvssDisplay, {
  title: _l('Chart: Reports by CVSS'),
});

registerDisplay(ReportsCvssTableDisplay.displayId, ReportsCvssTableDisplay, {
  title: _l('Table: Reports by CVSS'),
});

// vim: set ts=2 sw=2 tw=80:
