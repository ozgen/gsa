/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {setLocale} from 'web/store/usersettings/actions';

import {rendererWith, screen, fireEvent} from 'web/utils/testing';

import useLocale from '../useLocale';

const TestComponent = () => {
  const [locale, setLocale] = useLocale(); // eslint-disable-line no-shadow
  return (
    <div>
      <div data-testid="locale">{locale}</div>
      <button data-testid="changeLocale" onClick={() => setLocale('en')} />
    </div>
  );
};

describe('useLocale Tests', () => {
  test('should render the locale from the store', async () => {
    const {store, render} = rendererWith({store: true});

    store.dispatch(setLocale('de'));

    render(<TestComponent />);

    const element = await screen.getByTestId('locale');
    expect(element).toHaveTextContent('de');
  });

  test('should allow to change the locale in the store', async () => {
    const {store, render} = rendererWith({store: true});

    store.dispatch(setLocale('de'));

    render(<TestComponent />);

    const element = await screen.getByTestId('locale');
    expect(element).toHaveTextContent('de');

    const button = await screen.getByTestId('changeLocale');
    await fireEvent.click(button);

    expect(element).toHaveTextContent('en');
  });
});
