/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {_, _l} from 'gmp/locale/lang';
import {DFNCERT_FILTER_FILTER} from 'gmp/models/filter';
import createDisplay from 'web/components/dashboard/display/createDisplay';
import SeverityClassDisplay from 'web/components/dashboard/display/severity/SeverityClassDisplay';
import SeverityClassTableDisplay from 'web/components/dashboard/display/severity/SeverityClassTableDisplay';
import {registerDisplay} from 'web/components/dashboard/Registry';
import {DfnCertSeverityLoader} from 'web/pages/dfncert/dashboard/Loaders';

export const DfnCertSeverityClassDisplay = createDisplay({
  loaderComponent: DfnCertSeverityLoader,
  displayComponent: SeverityClassDisplay,
  title: ({data: tdata}) =>
    _('DFN-CERT Advisories by Severity Class (Total: {{count}})', {
      count: tdata.total,
    }),
  displayId: 'dfn_cert_adv-by-severity-class',
  displayName: 'DfnCertSeverityClassDisplay',
  filtersFilter: DFNCERT_FILTER_FILTER,
});

export const DfnCertSeverityClassTableDisplay = createDisplay({
  loaderComponent: DfnCertSeverityLoader,
  displayComponent: SeverityClassTableDisplay,
  title: ({data: tdata}) =>
    _('DFN-CERT Advisories by Severity Class (Total: {{count}})', {
      count: tdata.total,
    }),
  dataTitles: [_l('Severity Class'), _l('# of DFN-CERT Advs')],
  displayId: 'dfn_cert_adv-by-severity-table',
  displayName: 'DfnCertSeverityClassTableDisplay',
  filtersFilter: DFNCERT_FILTER_FILTER,
});

registerDisplay(
  DfnCertSeverityClassDisplay.displayId,
  DfnCertSeverityClassDisplay,
  {
    title: _l('Chart: DFN-CERT Advisories by Severity Class'),
  },
);

registerDisplay(
  DfnCertSeverityClassTableDisplay.displayId,
  DfnCertSeverityClassTableDisplay,
  {
    title: _l('Table: DFN-CERT Advisories by Severity Class'),
  },
);
