/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import React from 'react';
import useLanguage from 'web/hooks/useLanguage';

type LanguageProps = {
  language: string;
  setLanguage: (newLang: string) => void;
};

/**
 * Higher-Order Component that provides language functionality to wrapped components
 *
 * @param WrappedComponent Component to be wrapped with language props
 * @returns Wrapped component with language props
 */
const withLanguage = <P extends {}>(
  WrappedComponent: React.ComponentType<P & LanguageProps>,
) => {
  const WithLanguage = (props: P) => {
    const [language, setLanguage] = useLanguage();

    return (
      <WrappedComponent
        {...props}
        language={language}
        setLanguage={setLanguage}
      />
    );
  };

  WithLanguage.displayName = `withLanguage(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;

  return WithLanguage;
};

export default withLanguage;
