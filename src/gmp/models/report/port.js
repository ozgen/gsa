/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {setProperties, parseInt, parseSeverity} from 'gmp/parser';
import {isDefined} from 'gmp/utils/identity';

class ReportPort {
  constructor() {
    this.hosts = {
      hostsByIp: {},
      count: 0,
    };
  }

  addHost(host) {
    if (!(host.ip in this.hosts.hostsByIp)) {
      this.hosts.hostsByIp[host.ip] = host;
      this.hosts.count++;
    }
  }

  setSeverity(severity) {
    if (!isDefined(this.severity) || this.severity < severity) {
      this.severity = severity;
    }
  }

  static fromElement(element) {
    const port = new ReportPort();

    /* use writable=true to allow overriding severity */
    setProperties(this.parseElement(element), port, {writable: true});

    return port;
  }

  static parseElement(element = {}) {
    const copy = {};
    const {__text: name} = element;

    copy.id = name;
    copy.threat = element.threat;

    if (isDefined(name) && name.includes('/')) {
      const [number, protocol] = name.split('/');

      copy.number = parseInt(number);

      if (!isDefined(copy.number)) {
        // port number wasn't a number (e.g. general)
        copy.number = 0;
      }

      copy.protocol = protocol;
    }

    copy.severity = parseSeverity(element.severity);

    return copy;
  }
}

export default ReportPort;
