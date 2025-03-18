/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {describe, test, expect, testing} from '@gsa/testing';
import CollectionCounts from 'gmp/collection/collectioncounts';
import Cve from 'gmp/models/cve';
import Filter from 'gmp/models/filter';
import {parseDate} from 'gmp/parser';
import {
  clickElement,
  queryCheckBoxes,
  queryPowerFilter,
  getSelectElement,
  getSelectItemElementsForSelect,
  queryTableBody,
  queryTableFooter,
  queryTextInputs,
} from 'web/components/testing';
import {currentSettingsDefaultResponse} from 'web/pages/__mocks__/CurrentSettings';
import CvesPage, {ToolBarIcons} from 'web/pages/cves/ListPage';
import {entitiesLoadingActions} from 'web/store/entities/cves';
import {setTimezone, setUsername} from 'web/store/usersettings/actions';
import {defaultFilterLoadingActions} from 'web/store/usersettings/defaultfilters/actions';
import {loadingActions} from 'web/store/usersettings/defaults/actions';
import {rendererWith, screen, wait} from 'web/utils/Testing';

const cve = Cve.fromElement({
  _id: 'CVE-2020-9992',
  name: 'CVE-2020-9992',
  cvss_vector: 'AV:N/AC:M/Au:N/C:C/I:C/A:C',
  creationTime: parseDate('2020-10-22T19:15:00Z'),
  severity: '9.3',
  description: 'foo bar baz',
  usage_type: 'cve',
  epss: {
    score: 0.5,
    percentile: 0.75,
  },
});

const reloadInterval = -1;
const manualUrl = 'test/';

let getCves;
let getFilters;
let getDashboardSetting;
let getAggregates;
let getSetting;
let currentSettings;
let renewSession;

beforeEach(() => {
  getCves = testing.fn().mockResolvedValue({
    data: [cve],
    meta: {
      filter: Filter.fromString(),
      counts: new CollectionCounts(),
    },
  });

  getFilters = testing.fn().mockReturnValue(
    Promise.resolve({
      data: [],
      meta: {
        filter: Filter.fromString(),
        counts: new CollectionCounts(),
      },
    }),
  );

  getDashboardSetting = testing.fn().mockResolvedValue({
    data: [],
    meta: {
      filter: Filter.fromString(),
      counts: new CollectionCounts(),
    },
  });

  getAggregates = testing.fn().mockResolvedValue({
    data: [],
    meta: {
      filter: Filter.fromString(),
      counts: new CollectionCounts(),
    },
  });

  getSetting = testing.fn().mockResolvedValue({
    filter: null,
  });

  currentSettings = testing
    .fn()
    .mockResolvedValue(currentSettingsDefaultResponse);

  renewSession = testing.fn().mockResolvedValue({
    foo: 'bar',
  });
});

describe('CvesPage tests', () => {
  test('should render full CvesPage', async () => {
    const gmp = {
      dashboard: {
        getSetting: getDashboardSetting,
      },
      cves: {
        get: getCves,
        getSeverityAggregates: getAggregates,
        getCreatedAggregates: getAggregates,
      },
      filters: {
        get: getFilters,
      },
      settings: {manualUrl, reloadInterval, enableEPSS: true},
      user: {currentSettings, getSetting},
    };

    const {render, store} = rendererWith({
      gmp,
      capabilities: true,
      store: true,
      router: true,
    });

    store.dispatch(setTimezone('CET'));
    store.dispatch(setUsername('admin'));

    const defaultSettingFilter = Filter.fromString('foo=bar');
    store.dispatch(loadingActions.success({rowsperpage: {value: '2'}}));
    store.dispatch(
      defaultFilterLoadingActions.success('cve', defaultSettingFilter),
    );

    const counts = new CollectionCounts({
      first: 1,
      all: 1,
      filtered: 1,
      length: 1,
      rows: 10,
    });
    const filter = Filter.fromString('first=1 rows=10');
    const loadedFilter = Filter.fromString('first=1 rows=10');
    store.dispatch(
      entitiesLoadingActions.success([cve], filter, loadedFilter, counts),
    );

    const {baseElement} = render(<CvesPage />);

    await wait();

    const display = screen.getAllByTestId('grid-item');
    const powerFilter = queryPowerFilter();
    const inputs = queryTextInputs(powerFilter);
    const select = getSelectElement(powerFilter);

    // Toolbar Icons
    expect(screen.getAllByTitle('Help: CVEs')[0]).toBeInTheDocument();

    // Powerfilter
    expect(inputs[0]).toHaveAttribute('name', 'userFilterString');
    expect(screen.getAllByTitle('Update Filter')[0]).toBeInTheDocument();
    expect(screen.getAllByTitle('Remove Filter')[0]).toBeInTheDocument();
    expect(
      screen.getAllByTitle('Reset to Default Filter')[0],
    ).toBeInTheDocument();
    expect(screen.getAllByTitle('Help: Powerfilter')[0]).toBeInTheDocument();
    expect(screen.getAllByTitle('Edit Filter')[0]).toBeInTheDocument();
    expect(select).toHaveAttribute('title', 'Loaded filter');
    expect(select).toHaveValue('--');

    // Dashboard
    expect(
      screen.getAllByTitle('Add new Dashboard Display')[0],
    ).toBeInTheDocument();
    expect(screen.getAllByTitle('Reset to Defaults')[0]).toBeInTheDocument();
    expect(display[0]).toHaveTextContent('CVEs by Severity Class (Total: 0)');
    expect(display[1]).toHaveTextContent('CVEs by Creation Time');
    expect(display[2]).toHaveTextContent('CVEs by CVSS (Total: 0)');

    // Table
    const header = baseElement.querySelectorAll('th');
    expect(header[0]).toHaveTextContent('Name');
    expect(header[1]).toHaveTextContent('Description');
    expect(header[2]).toHaveTextContent('Published');
    expect(header[3]).toHaveTextContent('CVSS Base Vector');
    expect(header[4]).toHaveTextContent('Severity');

    const row = baseElement.querySelectorAll('tr');

    expect(row[2]).toHaveTextContent('CVE-2020-9992');
    expect(row[2]).toHaveTextContent('foo bar baz');
    expect(row[2]).toHaveTextContent(
      'Thu, Oct 22, 2020 9:15 PM Central European Summer TimeA',
    );
    expect(row[2]).toHaveTextContent('AV:N/AC:M/Au:N/C:C/I:C/A:C');
    expect(row[2]).toHaveTextContent('9.3 (Critical)');
    expect(row[2]).toHaveTextContent('0.50000');
    expect(row[2]).toHaveTextContent('75.000%');
  });

  test('should allow to bulk action on page contents', async () => {
    const deleteByFilter = testing.fn().mockResolvedValue({
      foo: 'bar',
    });

    const exportByFilter = testing.fn().mockResolvedValue({
      foo: 'bar',
    });

    const gmp = {
      dashboard: {
        getSetting: getDashboardSetting,
      },
      cves: {
        get: getCves,
        deleteByFilter,
        exportByFilter,
        getSeverityAggregates: getAggregates,
        getActiveDaysAggregates: getAggregates,
        getCreatedAggregates: getAggregates,
      },
      filters: {
        get: getFilters,
      },
      settings: {manualUrl, reloadInterval},
      user: {renewSession, currentSettings, getSetting: getSetting},
    };

    const {render, store} = rendererWith({
      gmp,
      capabilities: true,
      store: true,
      router: true,
    });

    store.dispatch(setTimezone('CET'));
    store.dispatch(setUsername('admin'));

    const defaultSettingFilter = Filter.fromString('foo=bar');
    store.dispatch(loadingActions.success({rowsperpage: {value: '2'}}));
    store.dispatch(
      defaultFilterLoadingActions.success('cve', defaultSettingFilter),
    );

    const counts = new CollectionCounts({
      first: 1,
      all: 1,
      filtered: 1,
      length: 1,
      rows: 10,
    });
    const filter = Filter.fromString('first=1 rows=10');
    const loadedFilter = Filter.fromString('first=1 rows=10');
    store.dispatch(
      entitiesLoadingActions.success([cve], filter, loadedFilter, counts),
    );

    render(<CvesPage />);

    await wait();

    // export page contents
    const exportIcon = screen.getAllByTitle('Export page contents')[0];
    await clickElement(exportIcon);
    expect(exportByFilter).toHaveBeenCalled();
  });

  test('should allow to bulk action on selected cves', async () => {
    const deleteByIds = testing.fn().mockResolvedValue({
      foo: 'bar',
    });

    const exportByIds = testing.fn().mockResolvedValue({
      foo: 'bar',
    });

    const gmp = {
      dashboard: {
        getSetting: getDashboardSetting,
      },
      cves: {
        get: getCves,
        delete: deleteByIds,
        export: exportByIds,
        getSeverityAggregates: getAggregates,
        getActiveDaysAggregates: getAggregates,
        getCreatedAggregates: getAggregates,
      },
      filters: {
        get: getFilters,
      },
      settings: {manualUrl, reloadInterval},
      user: {renewSession, currentSettings, getSetting: getSetting},
    };

    const {render, store} = rendererWith({
      gmp,
      capabilities: true,
      store: true,
      router: true,
    });

    store.dispatch(setTimezone('CET'));
    store.dispatch(setUsername('admin'));

    const defaultSettingFilter = Filter.fromString('foo=bar');
    store.dispatch(loadingActions.success({rowsperpage: {value: '2'}}));
    store.dispatch(
      defaultFilterLoadingActions.success('cve', defaultSettingFilter),
    );

    const counts = new CollectionCounts({
      first: 1,
      all: 1,
      filtered: 1,
      length: 1,
      rows: 10,
    });
    const filter = Filter.fromString('first=1 rows=10');
    const loadedFilter = Filter.fromString('first=1 rows=10');
    store.dispatch(
      entitiesLoadingActions.success([cve], filter, loadedFilter, counts),
    );

    render(<CvesPage />);

    await wait();

    // change to apply to selection
    const tableFooter = queryTableFooter();
    const select = getSelectElement(tableFooter);
    const selectItems = await getSelectItemElementsForSelect(select);
    await clickElement(selectItems[1]);
    expect(select).toHaveValue('Apply to selection');

    // select a cve
    const tableBody = queryTableBody();
    const inputs = queryCheckBoxes(tableBody);
    await clickElement(inputs[1]);

    // export selected cve
    const exportIcon = screen.getAllByTitle('Export selection')[0];
    await clickElement(exportIcon);
    expect(exportByIds).toHaveBeenCalled();
  });

  test('should allow to bulk action on filtered cves', async () => {
    const deleteByFilter = testing.fn().mockResolvedValue({
      foo: 'bar',
    });

    const exportByFilter = testing.fn().mockResolvedValue({
      foo: 'bar',
    });

    const gmp = {
      dashboard: {
        getSetting: getDashboardSetting,
      },
      cves: {
        get: getCves,
        deleteByFilter,
        exportByFilter,
        getSeverityAggregates: getAggregates,
        getActiveDaysAggregates: getAggregates,
        getCreatedAggregates: getAggregates,
      },
      filters: {
        get: getFilters,
      },
      settings: {manualUrl, reloadInterval},
      user: {renewSession, currentSettings, getSetting: getSetting},
    };

    const {render, store} = rendererWith({
      gmp,
      capabilities: true,
      store: true,
      router: true,
    });

    store.dispatch(setTimezone('CET'));
    store.dispatch(setUsername('admin'));

    const defaultSettingFilter = Filter.fromString('foo=bar');
    store.dispatch(loadingActions.success({rowsperpage: {value: '2'}}));
    store.dispatch(
      defaultFilterLoadingActions.success('cve', defaultSettingFilter),
    );

    const counts = new CollectionCounts({
      first: 1,
      all: 1,
      filtered: 1,
      length: 1,
      rows: 10,
    });
    const filter = Filter.fromString('first=1 rows=10');
    const loadedFilter = Filter.fromString('first=1 rows=10');
    store.dispatch(
      entitiesLoadingActions.success([cve], filter, loadedFilter, counts),
    );

    render(<CvesPage />);

    await wait();

    const tableFooter = queryTableFooter();
    const select = getSelectElement(tableFooter);
    const selectItems = await getSelectItemElementsForSelect(select);
    await clickElement(selectItems[2]);
    expect(select).toHaveValue('Apply to all filtered');

    // export all filtered cves
    const exportIcon = screen.getAllByTitle('Export all filtered')[0];
    await clickElement(exportIcon);
    expect(exportByFilter).toHaveBeenCalled();
  });
});

describe('CvesPage ToolBarIcons test', () => {
  test('should render', () => {
    const gmp = {
      settings: {manualUrl},
    };

    const {render} = rendererWith({
      gmp,
      router: true,
    });

    const {baseElement} = render(<ToolBarIcons />);

    const links = baseElement.querySelectorAll('a');
    expect(screen.getByTestId('help-icon')).toHaveAttribute(
      'title',
      'Help: CVEs',
    );
    expect(links[0]).toHaveAttribute(
      'href',
      'test/en/managing-secinfo.html#cve',
    );
  });
});
