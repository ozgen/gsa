/* Copyright (C) 2016-2022 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React, {useEffect} from 'react';

import {onLanguageChange, getLocale} from 'gmp/locale/lang';

import {isDefined} from 'gmp/utils/identity';

import useLocale from 'web/hooks/useLocale';

/**
 * A component that observes the locale, puts it into the redux store and
 * re-renders its children whenever the locale changed
 */
const LocaleObserver = ({children}) => {
  const [locale, setLocale] = useLocale();

  useEffect(() => {
    const unsubscribeFromLanguageChange = onLanguageChange(setLocale);
    return unsubscribeFromLanguageChange;
  }, [setLocale]);

  const currentLocale = locale || getLocale();

  if (!isDefined(currentLocale)) {
    // don't render if no locale has been set yet
    return null;
  }

  return <React.Fragment key={currentLocale}>{children}</React.Fragment>;
};

export default LocaleObserver;
