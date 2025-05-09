/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {isDefined} from 'gmp/utils/identity';
import React from 'react';
import {connect} from 'react-redux';
import {EditIcon, LdapIcon} from 'web/components/icon';
import ManualIcon from 'web/components/icon/ManualIcon';
import IconDivider from 'web/components/layout/IconDivider';
import Layout from 'web/components/layout/Layout';
import PageTitle from 'web/components/layout/PageTitle';
import Loading from 'web/components/loading/Loading';
import Section from 'web/components/section/Section';
import TableBody from 'web/components/table/Body';
import Col from 'web/components/table/Col';
import TableData from 'web/components/table/Data';
import TableRow from 'web/components/table/Row';
import Table from 'web/components/table/SimpleTable';
import useTranslation from 'web/hooks/useTranslation';
import LdapDialog from 'web/pages/ldap/Dialog';
import {renewSessionTimeout} from 'web/store/usersettings/actions';
import compose from 'web/utils/Compose';
import PropTypes from 'web/utils/PropTypes';
import {renderYesNo} from 'web/utils/Render';
import withGmp from 'web/utils/withGmp';
import withTranslation from 'web/utils/withTranslation';

const ToolBarIcons = ({onOpenDialogClick}) => {
  const [_] = useTranslation();
  return (
    <IconDivider>
      <ManualIcon
        anchor="ldap"
        page="web-interface-access"
        size="small"
        title={_('Help: LDAP per-User Authentication')}
      />
      <EditIcon
        title={_('Edit LDAP per-User Authentication')}
        onClick={onOpenDialogClick}
      />
    </IconDivider>
  );
};

ToolBarIcons.propTypes = {
  onOpenDialogClick: PropTypes.func,
};

class LdapAuthentication extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      hasLdapSupport: true,
      loading: true,
      initial: true,
      dialogVisible: false,
    };

    this.handleSaveSettings = this.handleSaveSettings.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  componentDidMount() {
    this.loadLdapAuthSettings();
  }

  loadLdapAuthSettings() {
    const {gmp} = this.props;

    this.setState({loading: true});

    return gmp.user.currentAuthSettings().then(response => {
      const {data: settings} = response;
      // ldap support is enabled in gvm-libs
      const hasLdapSupport = settings.has('method:ldap_connect');
      const {authdn, certificateInfo, enabled, ldaphost, ldapsOnly} =
        settings.get('method:ldap_connect');
      this.setState({
        hasLdapSupport,
        authdn,
        certificateInfo,
        enabled,
        ldaphost,
        ldapsOnly,
        loading: false,
        initial: false,
      });
    });
  }

  handleInteraction() {
    const {onInteraction} = this.props;
    if (isDefined(onInteraction)) {
      onInteraction();
    }
  }

  handleSaveSettings({authdn, certificate, enable, ldaphost, ldapsOnly}) {
    const {gmp} = this.props;

    this.handleInteraction();

    return gmp.auth
      .saveLdap({
        authdn,
        certificate,
        enable,
        ldaphost,
        ldapsOnly,
      })
      .then(() => {
        this.loadLdapAuthSettings();
        this.setState({dialogVisible: false});
      });
  }

  openDialog() {
    this.setState({dialogVisible: true});
  }

  closeDialog() {
    this.setState({dialogVisible: false});
  }

  render() {
    const {loading, initial} = this.state;
    if (loading && initial) {
      return <Loading />;
    }

    const {_} = this.props;

    const {
      authdn,
      certificateInfo = {},
      dialogVisible,
      enabled,
      hasLdapSupport,
      ldaphost,
      ldapsOnly,
    } = this.state;

    return (
      <React.Fragment>
        <PageTitle title={_('LDAP per-User Authentication')} />
        <Layout flex="column">
          {hasLdapSupport && (
            <ToolBarIcons onOpenDialogClick={this.openDialog} />
          )}
          <Section
            img={<LdapIcon size="large" />}
            title={_('LDAP per-User Authentication')}
          />
          {hasLdapSupport ? (
            <Table>
              <colgroup>
                <Col width="10%" />
                <Col width="90%" />
              </colgroup>
              <TableBody>
                <TableRow>
                  <TableData>{_('Enabled')}</TableData>
                  <TableData>{renderYesNo(enabled)}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('LDAP Host')}</TableData>
                  <TableData>{ldaphost}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('Auth. DN')}</TableData>
                  <TableData>{authdn}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('Activation')}</TableData>
                  <TableData>{certificateInfo.activation_time}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('Expiration')}</TableData>
                  <TableData>{certificateInfo.expiration_time}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('MD5 Fingerprint')}</TableData>
                  <TableData>{certificateInfo.md5_fingerprint}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('Issued by')}</TableData>
                  <TableData>{certificateInfo.issuer}</TableData>
                </TableRow>
                <TableRow>
                  <TableData>{_('Use LDAPS only')}</TableData>
                  <TableData>{renderYesNo(ldapsOnly)}</TableData>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p>{_('Support for LDAP is not available.')}</p>
          )}
        </Layout>

        {dialogVisible && (
          <LdapDialog
            authdn={authdn}
            enable={enabled}
            ldaphost={ldaphost}
            ldapsOnly={ldapsOnly}
            onClose={this.closeDialog}
            onSave={this.handleSaveSettings}
          />
        )}
      </React.Fragment>
    );
  }
}

LdapAuthentication.propTypes = {
  gmp: PropTypes.gmp.isRequired,
  onInteraction: PropTypes.func.isRequired,
  _: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, {gmp}) => ({
  onInteraction: () => dispatch(renewSessionTimeout(gmp)()),
});

export default compose(
  withTranslation,
  withGmp,
  connect(undefined, mapDispatchToProps),
)(LdapAuthentication);
