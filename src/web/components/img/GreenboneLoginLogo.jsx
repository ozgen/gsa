/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import _ from 'gmp/locale';
import React from 'react';
import styled from 'styled-components';
import Img from 'web/components/img/Img';

const Image = styled(Img)`
  display: flex;
  width: 300px;
`;

const LoginLogo = () => {
  return (
    <Image
      alt={_('Greenbone AG')}
      data-testid="greenbone-login-logo"
      src="greenbonehorizontal.png"
    />
  );
};

export default LoginLogo;
