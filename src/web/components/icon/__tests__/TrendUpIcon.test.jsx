/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {describe} from '@gsa/testing';
import {testIcon} from 'web/components/icon/Testing';
import TrendUpIcon from 'web/components/icon/TrendUpIcon';

describe('TrendUpIcon component tests', () => {
  testIcon(TrendUpIcon, {
    dataTestId: 'trend-up-icon',
    customDataTestId: 'custom-trend-up-icon',
  });
});
