/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import React from 'react';

import {ResultsCvssDisplay, ResultsCvssTableDisplay} from './CvssDisplay';
import {
  ResultsDescriptionWordCloudDisplay,
  ResultsDescriptionWordCloudTableDisplay,
} from './DescriptionWordCloudDisplay';
import {
  ResultsSeverityDisplay,
  ResultsSeverityTableDisplay,
} from './SeverityClassDisplay';
import {
  ResultsWordCloudDisplay,
  ResultsWordCloudTableDisplay,
} from './WordCloudDisplay';
import Dashboard from '../../../components/dashboard/Dashboard';

export const RESULTS_DASHBOARD_ID = '0b8ae70d-d8fc-4418-8a72-e65ac8d2828e';

export const RESULTS_DISPLAYS = [
  ResultsCvssDisplay.displayId,
  ResultsDescriptionWordCloudDisplay.displayId,
  ResultsSeverityDisplay.displayId,
  ResultsWordCloudDisplay.displayId,
  ResultsCvssTableDisplay.displayId,
  ResultsDescriptionWordCloudTableDisplay.displayId,
  ResultsSeverityTableDisplay.displayId,
  ResultsWordCloudTableDisplay.displayId,
];

const ResultsDashboard = props => (
  <Dashboard
    {...props}
    defaultDisplays={[
      [ResultsSeverityDisplay.displayId, ResultsCvssDisplay.displayId],
    ]}
    id={RESULTS_DASHBOARD_ID}
    permittedDisplays={RESULTS_DISPLAYS}
  />
);

export default ResultsDashboard;
