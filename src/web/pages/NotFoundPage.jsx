/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import React from 'react';
import styled from 'styled-components';
import Logo from 'web/components/img/Greenbone';
import PageTitle from 'web/components/layout/PageTitle';
import useTranslation from 'web/hooks/useTranslation';

const StyledLogo = styled(Logo)`
  width: 300px;
  margin-bottom: 20px;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;
  width: 100%;
`;

const PageNotFound = () => {
  const [_] = useTranslation();

  return (
    <CenteredDiv>
      <PageTitle title={_('Page Not Found')} />
      <h1>{_('Page Not Found.')}</h1>
      <StyledLogo />
      <p>
        {_('We are sorry. The page you have requested could not be found.')}
      </p>
    </CenteredDiv>
  );
};

export default PageNotFound;
