/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {describe, test, expect} from '@gsa/testing';
import date from 'gmp/models/date';
import Event, {isEvent} from 'gmp/models/event';

const ICAL_FORMAT = 'YYYYMMDD[T]HHmmss[Z]';
const ICAL_FORMAT_TZ = 'YYYYMMDD[T]HHmmss';

describe('Event model tests', () => {
  test('should parse event start from icalendar without timezone', () => {
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTAMP:20190715T124352Z
DTSTART:20190716T040000
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');

    expect(event.event).toBeDefined();

    const {startDate: eventStartDate} = event.event;

    expect(eventStartDate).toBeDefined();
    expect(eventStartDate.utcOffset()).toEqual(0);

    // no timezone in ical should be considered as datetime in passed timezone (Europe/Berlin)
    const {startDate} = event;
    expect(startDate.hour()).toEqual(4);
    expect(startDate.tz('UTC').hour()).toEqual(2);
  });

  test('should parse event start from icalendar using utc', () => {
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTAMP:20190715T124352Z
DTSTART:20190716T040000Z
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');

    expect(event.event).toBeDefined();

    const {startDate: eventStartDate} = event.event;

    expect(eventStartDate).toBeDefined();
    expect(eventStartDate.utcOffset()).toEqual(0);

    const {startDate} = event;
    expect(startDate.hour()).toEqual(6);
    expect(startDate.tz('UTC').hour()).toEqual(4);
  });

  test('should calculate start date as next date for daily recurrence', () => {
    const now = date().tz('utc').minute(0).second(0).millisecond(0);
    const startDate = now.clone().add(1, 'hour');
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTART:${startDate.format(ICAL_FORMAT)}
DTSTAMP:${now.format(ICAL_FORMAT)}
RRULE:FREQ=DAILY
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');

    expect(event).toBeDefined();

    const {nextDate} = event;

    // next event should be start date
    expect(nextDate.isSame(startDate)).toEqual(true);
  });

  test('should calculate next day as next day for daily recurrence', () => {
    const now = date().tz('utc').minute(0).second(0).millisecond(0);
    const startDate = now.clone().subtract(1, 'hour');
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTART:${startDate.format(ICAL_FORMAT)}
DTSTAMP:${now.format(ICAL_FORMAT)}
RRULE:FREQ=DAILY
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');

    expect(event).toBeDefined();

    const {nextDate} = event;

    // next event should be next day
    expect(nextDate.isSame(startDate)).toEqual(false);
    expect(nextDate.isAfter(startDate)).toEqual(true);

    const rDate = startDate.clone().add(1, 'day');
    expect(nextDate.isSame(rDate)).toEqual(true);
  });

  test('should calculate start date as next date for no recurrence', () => {
    const now = date().tz('utc').minute(0).second(0).millisecond(0);
    const startDate = now.clone().add(1, 'hour');
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTART:${startDate.format(ICAL_FORMAT)}
DTSTAMP:${now.format(ICAL_FORMAT)}
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');

    expect(event).toBeDefined();

    const {nextDate} = event;

    // next event should be start date
    expect(nextDate.isSame(startDate)).toEqual(true);
  });

  test('should calculate no next date for no recurrence if start date is already over', () => {
    const startDate = date().tz('utc').minute(0).second(0).millisecond(0);
    const now = startDate.clone().add(1, 'hour');
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTART:${startDate.format(ICAL_FORMAT)}
DTSTAMP:${now.format(ICAL_FORMAT)}
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');

    expect(event).toBeDefined();

    const {nextDate} = event;

    // there should be no next event
    expect(nextDate).toBeUndefined();
  });

  test('should calculate next date for daily recurrence when a timezone is used', () => {
    const tz = process.env.TZ;
    process.env.TZ = 'America/New_York'; // UTC-4 or UTC-5

    const now = date()
      .tz('America/New_York')
      .minute(0)
      .second(0)
      .millisecond(0);
    // The target date is in 2 hours.  If the recurrence calculation converts the current NY
    // time directly to UTC (for example 16h00 NY becomes 16h00 UTC) then the test will fail
    // because UTC is more than 2 hours ahead of NY.
    const expected = now.clone().add(2, 'hour');
    const start = expected.clone().subtract(24, 'hour');
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTART;TZID=/America/New_York:${start.format(ICAL_FORMAT_TZ)}
RRULE:FREQ=DAILY
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'America/New_York');

    const next = event.nextDate;

    expect(next.isSame(expected)).toEqual(true);

    process.env.TZ = tz;
  });
});

describe('isEvent tests', () => {
  test('should return true for valid event', () => {
    const icalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Greenbone.net//NONSGML Greenbone Security Manager 8.0.0//EN
BEGIN:VEVENT
UID:c35f82f1-7798-4b84-b2c4-761a33068956
DTSTAMP:20190715T124352Z
DTSTART:20190716T040000
END:VEVENT
END:VCALENDAR
`;

    const event = Event.fromIcal(icalendar, 'Europe/Berlin');
    expect(isEvent(event)).toEqual(true);
  });

  test('should return false for invalid event', () => {
    expect(isEvent({})).toEqual(false);
    expect(isEvent(false)).toEqual(false);
    expect(isEvent(null)).toEqual(false);
    expect(isEvent(undefined)).toEqual(false);
  });
});
