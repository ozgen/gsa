/* SPDX-FileCopyrightText: 2024 Greenbone AG
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Import LucideIcon type once
import {
  LucideIcon,
  Megaphone,
  FilePenLine,
  ClipboardCheck,
  ArrowDown,
  ArrowUpDown,
  ArrowUp,
  Calendar,
  KeyRound,
  BarChart3,
  ZoomIn,
  PowerOff,
  Download,
  Pencil,
  Power,
  Rss,
  Filter,
  ChevronFirst,
  Folder,
  Users,
  HelpCircle,
  Import,
  Info,
  Key,
  ChevronLast,
  List,
  LogOut,
  Settings,
  ChevronRight,
  Gauge,
  UserCheck,
  FileCog,
  ChevronLeft,
  RefreshCcw,
  RotateCcw,
  StepForward,
  Clock3,
  Search,
  Settings2,
  Puzzle,
  Play,
  Square,
  Tag,
  Tags,
  Trash2,
  FolderOpen,
  Upload,
  User,
  ShieldCheck,
  ShieldX,
  Glasses,
  X,
} from 'lucide-react';
import React from 'react';
import DynamicIcon, {DynamicIconProps} from 'web/components/icon/DynamicIcon';
import AddToAssets from 'web/components/icon/svg/add_to_assets.svg?react';
import CertBundAdv from 'web/components/icon/svg/cert_bund_adv.svg?react';
import Clone from 'web/components/icon/svg/clone.svg?react';
import Config from 'web/components/icon/svg/config.svg?react';
import Cpe from 'web/components/icon/svg/cpe.svg?react';
import Cve from 'web/components/icon/svg/cve.svg?react';
import CvssCalculator from 'web/components/icon/svg/cvss_calculator.svg?react';
import Delta from 'web/components/icon/svg/delta.svg?react';
import DeltaSecond from 'web/components/icon/svg/delta_second.svg?react';
import DfnCertAdv from 'web/components/icon/svg/dfn_cert_adv.svg?react';
import DlCsv from 'web/components/icon/svg/dl_csv.svg?react';
import DlDeb from 'web/components/icon/svg/dl_deb.svg?react';
import DlExe from 'web/components/icon/svg/dl_exe.svg?react';
import DlKey from 'web/components/icon/svg/dl_key.svg?react';
import DlRpm from 'web/components/icon/svg/dl_rpm.svg?react';
import DlSvg from 'web/components/icon/svg/dl_svg.svg?react';
import Host from 'web/components/icon/svg/host.svg?react';
import Ldap from 'web/components/icon/svg/ldap.svg?react';
import Legend from 'web/components/icon/svg/legend.svg?react';
import New from 'web/components/icon/svg/new.svg?react';
import NewNote from 'web/components/icon/svg/new_note.svg?react';
import NewOverride from 'web/components/icon/svg/new_override.svg?react';
import NewTicket from 'web/components/icon/svg/new_ticket.svg?react';
import Note from 'web/components/icon/svg/note.svg?react';
import Nvt from 'web/components/icon/svg/nvt.svg?react';
import Os from 'web/components/icon/svg/os.svg?react';
import Override from 'web/components/icon/svg/override.svg?react';
import PortList from 'web/components/icon/svg/port_list.svg?react';
import ProvideView from 'web/components/icon/svg/provide_view.svg?react';
import Radius from 'web/components/icon/svg/radius.svg?react';
import RemoveFromAssets from 'web/components/icon/svg/remove_from_assets.svg?react';
import Report from 'web/components/icon/svg/report.svg?react';
import ReportFormat from 'web/components/icon/svg/report_format.svg?react';
import Restore from 'web/components/icon/svg/restore.svg?react';
import Result from 'web/components/icon/svg/result.svg?react';
import Role from 'web/components/icon/svg/role.svg?react';
import Scanner from 'web/components/icon/svg/scanner.svg?react';
import Sensor from 'web/components/icon/svg/sensor.svg?react';
import StMitigate from 'web/components/icon/svg/st_mitigate.svg?react';
import StNonavailable from 'web/components/icon/svg/st_nonavailable.svg?react';
import StUnknown from 'web/components/icon/svg/st_unknown.svg?react';
import StVendorfix from 'web/components/icon/svg/st_vendorfix.svg?react';
import StWillnotfix from 'web/components/icon/svg/st_willnotfix.svg?react';
import StWorkaround from 'web/components/icon/svg/st_workaround.svg?react';
import Target from 'web/components/icon/svg/target.svg?react';
import Task from 'web/components/icon/svg/task.svg?react';
import Ticket from 'web/components/icon/svg/ticket.svg?react';
import Tlscertificate from 'web/components/icon/svg/tlscertificate.svg?react';
import Toggle3d from 'web/components/icon/svg/toggle3d.svg?react';
import TrendDown from 'web/components/icon/svg/trend_down.svg?react';
import TrendLess from 'web/components/icon/svg/trend_less.svg?react';
import TrendMore from 'web/components/icon/svg/trend_more.svg?react';
import TrendNochange from 'web/components/icon/svg/trend_nochange.svg?react';
import TrendUp from 'web/components/icon/svg/trend_up.svg?react';
import Vulnerability from 'web/components/icon/svg/vulnerability.svg?react';
import Wizard from 'web/components/icon/svg/wizard.svg?react';

interface ExtendedDynamicIconProps extends Omit<DynamicIconProps, 'icon'> {
  'data-testid'?: string;
}

interface IconComponentsType {
  [key: string]: React.FC<ExtendedDynamicIconProps> & {
    displayName?: string;
  };
}
interface IconDefinition {
  name: string;
  component: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  dataTestId: string;
  ariaLabel: string;
  isLucide: boolean;
}

export const icons: IconDefinition[] = [
  // Lucide icons
  {
    name: 'RefreshCcw',
    component: RefreshCcw,
    dataTestId: 'refresh-ccw-icon',
    ariaLabel: 'Refresh CCW Icon',
    isLucide: true,
  },
  {
    name: 'Megaphone',
    component: Megaphone,
    dataTestId: 'alert-icon',
    ariaLabel: 'Alert Icon',
    isLucide: true,
  },
  {
    name: 'Audit',
    component: ClipboardCheck,
    dataTestId: 'audit-icon',
    ariaLabel: 'Audit Icon',
    isLucide: true,
  },
  {
    name: 'ArrowDown',
    component: ArrowDown,
    dataTestId: 'arrow-down-icon',
    ariaLabel: 'Arrow Down Icon',
    isLucide: true,
  },
  {
    name: 'ArrowUpDown',
    component: ArrowUpDown,
    dataTestId: 'arrowUpDown-icon',
    ariaLabel: 'Arrow Up Down Icon',
    isLucide: true,
  },
  {
    name: 'ArrowUp',
    component: ArrowUp,
    dataTestId: 'arrowUp-icon',
    ariaLabel: 'Arrow Up Icon',
    isLucide: true,
  },
  {
    name: 'Calendar',
    component: Calendar,
    dataTestId: 'calendar-icon',
    ariaLabel: 'Calendar Icon',
    isLucide: true,
  },
  {
    name: 'KeyRound',
    component: KeyRound,
    dataTestId: 'credential-icon',
    ariaLabel: 'Credential Icon',
    isLucide: true,
  },
  {
    name: 'BarChart3',
    component: BarChart3,
    dataTestId: 'dashboard-icon',
    ariaLabel: 'Dashboard Icon',
    isLucide: true,
  },
  {
    name: 'Trash2',
    component: Trash2,
    dataTestId: 'trashcan-icon',
    ariaLabel: 'Delete Icon',
    isLucide: true,
  },
  {
    name: 'Disabled',
    component: PowerOff,
    dataTestId: 'disable-icon',
    ariaLabel: 'Disable Icon',
    isLucide: true,
  },
  {
    name: 'ZoomIn',
    component: ZoomIn,
    dataTestId: 'details-icon',
    ariaLabel: 'Details Icon',
    isLucide: true,
  },
  {
    name: 'Download',
    component: Download,
    dataTestId: 'download-icon',
    ariaLabel: 'Download Icon',
    isLucide: true,
  },
  {
    name: 'Pencil',
    component: Pencil,
    dataTestId: 'edit-icon',
    ariaLabel: 'Edit Icon',
    isLucide: true,
  },
  {
    name: 'Power',
    component: Power,
    dataTestId: 'enable-icon',
    ariaLabel: 'Enable Icon',
    isLucide: true,
  },
  {
    name: 'Rss',
    component: Rss,
    dataTestId: 'feed-icon',
    ariaLabel: 'Feed Icon',
    isLucide: true,
  },
  {
    name: 'Filter',
    component: Filter,
    dataTestId: 'filter-icon',
    ariaLabel: 'Filter Icon',
    isLucide: true,
  },
  {
    name: 'ChevronFirst',
    component: ChevronFirst,
    dataTestId: 'first-icon',
    ariaLabel: 'First Icon',
    isLucide: true,
  },
  {
    name: 'Folder',
    component: Folder,
    dataTestId: 'fold-icon',
    ariaLabel: 'Fold Icon',
    isLucide: true,
  },
  {
    name: 'Users',
    component: Users,
    dataTestId: 'group-icon',
    ariaLabel: 'Group Icon',
    isLucide: true,
  },
  {
    name: 'HelpCircle',
    component: HelpCircle,
    dataTestId: 'help-icon',
    ariaLabel: 'Help Icon',
    isLucide: true,
  },
  {
    name: 'Import',
    component: Import,
    dataTestId: 'import-icon',
    ariaLabel: 'Import Icon',
    isLucide: true,
  },
  {
    name: 'Info',
    component: Info,
    dataTestId: 'info-icon',
    ariaLabel: 'Info Icon',
    isLucide: true,
  },
  {
    name: 'Key',
    component: Key,
    dataTestId: 'key-icon',
    ariaLabel: 'Key Icon',
    isLucide: true,
  },
  {
    name: 'ChevronLast',
    component: ChevronLast,
    dataTestId: 'last-icon',
    ariaLabel: 'Last Icon',
    isLucide: true,
  },
  {
    name: 'List',
    component: List,
    dataTestId: 'list-icon',
    ariaLabel: 'List Icon',
    isLucide: true,
  },
  {
    name: 'LogOut',
    component: LogOut,
    dataTestId: 'logout-icon',
    ariaLabel: 'Logout Icon',
    isLucide: true,
  },
  {
    name: 'Settings',
    component: Settings,
    dataTestId: 'my-settings-icon',
    ariaLabel: 'My Settings Icon',
    isLucide: true,
  },
  {
    name: 'ChevronRight',
    component: ChevronRight,
    dataTestId: 'next-icon',
    ariaLabel: 'Next Icon',
    isLucide: true,
  },
  {
    name: 'Gauge',
    component: Gauge,
    dataTestId: 'performance-icon',
    ariaLabel: 'Performance Icon',
    isLucide: true,
  },
  {
    name: 'UserCheck',
    component: UserCheck,
    dataTestId: 'permission-icon',
    ariaLabel: 'Permission Icon',
    isLucide: true,
  },
  {
    name: 'FileCog',
    component: FileCog,
    dataTestId: 'policy-icon',
    ariaLabel: 'Policy Icon',
    isLucide: true,
  },
  {
    name: 'ChevronLeft',
    component: ChevronLeft,
    dataTestId: 'previous-icon',
    ariaLabel: 'Previous Icon',
    isLucide: true,
  },
  {
    name: 'RefreshCcw',
    component: RefreshCcw,
    dataTestId: 'refresh-icon',
    ariaLabel: 'Refresh Icon',
    isLucide: true,
  },
  {
    name: 'RotateCcw',
    component: RotateCcw,
    dataTestId: 'reset-icon',
    ariaLabel: 'Reset Icon',
    isLucide: true,
  },
  {
    name: 'StepForward',
    component: StepForward,
    dataTestId: 'resume-icon',
    ariaLabel: 'Resume Icon',
    isLucide: true,
  },
  {
    name: 'Alterable',
    component: FilePenLine,
    dataTestId: 'alterable-icon',
    ariaLabel: 'Alterable Icon',
    isLucide: true,
  },
  {
    name: 'Clock3',
    component: Clock3,
    dataTestId: 'schedule-icon',
    ariaLabel: 'Schedule Icon',
    isLucide: true,
  },
  {
    name: 'Search',
    component: Search,
    dataTestId: 'search-icon',
    ariaLabel: 'Search Icon',
    isLucide: true,
  },
  {
    name: 'Settings2',
    component: Settings2,
    dataTestId: 'settings-2-icon',
    ariaLabel: 'Settings Icon',
    isLucide: true,
  },
  {
    name: 'Puzzle',
    component: Puzzle,
    dataTestId: 'solution-type-icon',
    ariaLabel: 'Solution Type Icon',
    isLucide: true,
  },
  {
    name: 'Play',
    component: Play,
    dataTestId: 'start-icon',
    ariaLabel: 'Start Icon',
    isLucide: true,
  },
  {
    name: 'Square',
    component: Square,
    dataTestId: 'stop-icon',
    ariaLabel: 'Stop Icon',
    isLucide: true,
  },
  {
    name: 'Tag',
    component: Tag,
    dataTestId: 'tag-icon',
    ariaLabel: 'Tag Icon',
    isLucide: true,
  },
  {
    name: 'Tags',
    component: Tags,
    dataTestId: 'tags-icon',
    ariaLabel: 'Tags Icon',
    isLucide: true,
  },
  {
    name: 'FolderOpen',
    component: FolderOpen,
    dataTestId: 'unfold-icon',
    ariaLabel: 'Unfold Icon',
    isLucide: true,
  },
  {
    name: 'Upload',
    component: Upload,
    dataTestId: 'upload-icon',
    ariaLabel: 'Upload Icon',
    isLucide: true,
  },
  {
    name: 'User',
    component: User,
    dataTestId: 'user-icon',
    ariaLabel: 'User Icon',
    isLucide: true,
  },
  {
    name: 'ShieldCheck',
    component: ShieldCheck,
    dataTestId: 'verify-icon',
    ariaLabel: 'Verify Icon',
    isLucide: true,
  },
  {
    name: 'ShieldX',
    component: ShieldX,
    dataTestId: 'verify-no-icon',
    ariaLabel: 'Verify No Icon',
    isLucide: true,
  },
  {
    name: 'Glasses',
    component: Glasses,
    dataTestId: 'view-other-icon',
    ariaLabel: 'View Other Icon',
    isLucide: true,
  },
  {
    name: 'X',
    component: X,
    dataTestId: 'X-icon',
    ariaLabel: 'Close Icon',
    isLucide: true,
  },

  // SVG icons

  {
    name: 'AddToAssets',
    component: AddToAssets,
    dataTestId: 'add-to-assets-icon',
    ariaLabel: 'Add To Assets Icon',
    isLucide: false,
  },
  {
    name: 'CertBundAdv',
    component: CertBundAdv,
    dataTestId: 'cert-bund-adv-icon',
    ariaLabel: 'Cert Bund Adv Icon',
    isLucide: false,
  },
  {
    name: 'Clone',
    component: Clone,
    dataTestId: 'clone-icon',
    ariaLabel: 'Clone Icon',
    isLucide: false,
  },
  {
    name: 'ReportConfig',
    component: ReportFormat,
    dataTestId: 'report-config-icon',
    ariaLabel: 'Report Config Icon',
    isLucide: false,
  },
  {
    name: 'CpeLogo',
    component: Cpe,
    dataTestId: 'cpe-logo-icon',
    ariaLabel: 'CPE Logo Icon',
    isLucide: false,
  },
  {
    name: 'Cve',
    component: Cve,
    dataTestId: 'cve-icon',
    ariaLabel: 'CVE Icon',
    isLucide: false,
  },
  {
    name: 'CvssCalculator',
    component: CvssCalculator,
    dataTestId: 'cvss-icon',
    ariaLabel: 'CVSS Icon',
    isLucide: false,
  },
  {
    name: 'Delta',
    component: Delta,
    dataTestId: 'delta-icon',
    ariaLabel: 'Delta Icon',
    isLucide: false,
  },
  {
    name: 'DeltaSecond',
    component: DeltaSecond,
    dataTestId: 'delta-second-icon',
    ariaLabel: 'Delta Second Icon',
    isLucide: false,
  },
  {
    name: 'DeltaDifference',
    component: DeltaSecond,
    dataTestId: 'delta-difference-icon',
    ariaLabel: 'Delta Difference Icon',
    isLucide: false,
  },
  {
    name: 'DfnCertAdv',
    component: DfnCertAdv,
    dataTestId: 'dfn-cert-adv-icon',
    ariaLabel: 'DFN-CERT Adv Icon',
    isLucide: false,
  },
  {
    name: 'DlCsv',
    component: DlCsv,
    dataTestId: 'download-csv-icon',
    ariaLabel: 'Download CSV Icon',
    isLucide: false,
  },
  {
    name: 'DlDeb',
    component: DlDeb,
    dataTestId: 'download-deb-icon',
    ariaLabel: 'Download DEB Icon',
    isLucide: false,
  },
  {
    name: 'DlExe',
    component: DlExe,
    dataTestId: 'download-exe-icon',
    ariaLabel: 'Download EXE Icon',
    isLucide: false,
  },
  {
    name: 'DlKey',
    component: DlKey,
    dataTestId: 'download-key-icon',
    ariaLabel: 'Download Key Icon',
    isLucide: false,
  },
  {
    name: 'DlRpm',
    component: DlRpm,
    dataTestId: 'download-rpm-icon',
    ariaLabel: 'Download RPM Icon',
    isLucide: false,
  },
  {
    name: 'DlSvg',
    component: DlSvg,
    dataTestId: 'download-svg-icon',
    ariaLabel: 'Download SVG Icon',
    isLucide: false,
  },
  {
    name: 'Host',
    component: Host,
    dataTestId: 'host-icon',
    ariaLabel: 'Host Icon',
    isLucide: false,
  },
  {
    name: 'Ldap',
    component: Ldap,
    dataTestId: 'ldap-icon',
    ariaLabel: 'LDAP Icon',
    isLucide: false,
  },
  {
    name: 'Legend',
    component: Legend,
    dataTestId: 'legend-icon',
    ariaLabel: 'Legend Icon',
    isLucide: false,
  },
  {
    name: 'New',
    component: New,
    dataTestId: 'new-icon',
    ariaLabel: 'New Icon',
    isLucide: false,
  },
  {
    name: 'NewNote',
    component: NewNote,
    dataTestId: 'new-note-icon',
    ariaLabel: 'New Note Icon',
    isLucide: false,
  },
  {
    name: 'NewTicket',
    component: NewTicket,
    dataTestId: 'new-ticket-icon',
    ariaLabel: 'New Ticket Icon',
    isLucide: false,
  },
  {
    name: 'NewOverride',
    component: NewOverride,
    dataTestId: 'new-override-icon',
    ariaLabel: 'New Override Icon',
    isLucide: false,
  },
  {
    name: 'Note',
    component: Note,
    dataTestId: 'note-icon',
    ariaLabel: 'Note Icon',
    isLucide: false,
  },
  {
    name: 'Nvt',
    component: Nvt,
    dataTestId: 'nvt-icon',
    ariaLabel: 'NVT Icon',
    isLucide: false,
  },
  {
    name: 'Os',
    component: Os,
    dataTestId: 'os-svg-icon',
    ariaLabel: 'OS Icon',
    isLucide: false,
  },
  {
    name: 'Override',
    component: Override,
    dataTestId: 'override-icon',
    ariaLabel: 'Override Icon',
    isLucide: false,
  },
  {
    name: 'PortList',
    component: PortList,
    dataTestId: 'port-list-icon',
    ariaLabel: 'Port List Icon',
    isLucide: false,
  },
  {
    name: 'ProvideView',
    component: ProvideView,
    dataTestId: 'provide-view-icon',
    ariaLabel: 'Provide View Icon',
    isLucide: false,
  },
  {
    name: 'Radius',
    component: Radius,
    dataTestId: 'radius-icon',
    ariaLabel: 'Radius Icon',
    isLucide: false,
  },
  {
    name: 'RemoveFromAssets',
    component: RemoveFromAssets,
    dataTestId: 'remove-from-assets-icon',
    ariaLabel: 'Remove From Assets Icon',
    isLucide: false,
  },
  {
    name: 'Report',
    component: Report,
    dataTestId: 'report-icon',
    ariaLabel: 'Report Icon',
    isLucide: false,
  },
  {
    name: 'ReportFormat',
    component: ReportFormat,
    dataTestId: 'report-format-icon',
    ariaLabel: 'Report Format Icon',
    isLucide: false,
  },
  {
    name: 'Restore',
    component: Restore,
    dataTestId: 'restore-icon',
    ariaLabel: 'Restore Icon',
    isLucide: false,
  },
  {
    name: 'Result',
    component: Result,
    dataTestId: 'result-icon',
    ariaLabel: 'Result Icon',
    isLucide: false,
  },
  {
    name: 'Role',
    component: Role,
    dataTestId: 'role-icon',
    ariaLabel: 'Role Icon',
    isLucide: false,
  },
  {
    name: 'Scanner',
    component: Scanner,
    dataTestId: 'scanner-icon',
    ariaLabel: 'Scanner Icon',
    isLucide: false,
  },
  {
    name: 'ScanConfig',
    component: Config,
    dataTestId: 'scan-config-icon',
    ariaLabel: 'Scan Config Icon',
    isLucide: false,
  },
  {
    name: 'Sensor',
    component: Sensor,
    dataTestId: 'sensor-icon',
    ariaLabel: 'Sensor Icon',
    isLucide: false,
  },
  {
    name: 'StMitigate',
    component: StMitigate,
    dataTestId: 'st-mitigate-icon',
    ariaLabel: 'ST Mitigate Icon',
    isLucide: false,
  },
  {
    name: 'StNonavailable',
    component: StNonavailable,
    dataTestId: 'st-nonavailable-icon',
    ariaLabel: 'ST Nonavailable Icon',
    isLucide: false,
  },
  {
    name: 'StUnknown',
    component: StUnknown,
    dataTestId: 'st-unknown-icon',
    ariaLabel: 'ST Unknown Icon',
    isLucide: false,
  },
  {
    name: 'StVendorfix',
    component: StVendorfix,
    dataTestId: 'st-vendorfix-icon',
    ariaLabel: 'ST Vendorfix Icon',
    isLucide: false,
  },
  {
    name: 'StWillnotfix',
    component: StWillnotfix,
    dataTestId: 'st-willnotfix-icon',
    ariaLabel: 'ST Willnotfix Icon',
    isLucide: false,
  },
  {
    name: 'StWorkaround',
    component: StWorkaround,
    dataTestId: 'st-workaround-icon',
    ariaLabel: 'ST Workaround Icon',
    isLucide: false,
  },
  {
    name: 'Target',
    component: Target,
    dataTestId: 'target-icon',
    ariaLabel: 'Target Icon',
    isLucide: false,
  },
  {
    name: 'Task',
    component: Task,
    dataTestId: 'task-icon',
    ariaLabel: 'Task Icon',
    isLucide: false,
  },
  {
    name: 'Ticket',
    component: Ticket,
    dataTestId: 'ticket-icon',
    ariaLabel: 'Ticket Icon',
    isLucide: false,
  },
  {
    name: 'Tlscertificate',
    component: Tlscertificate,
    dataTestId: 'tls-certificate-icon',
    ariaLabel: 'TLS Certificate Icon',
    isLucide: false,
  },
  {
    name: 'Toggle3d',
    component: Toggle3d,
    dataTestId: 'toggle-3d-icon',
    ariaLabel: 'Toggle 3D Icon',
    isLucide: false,
  },
  {
    name: 'TrendDown',
    component: TrendDown,
    dataTestId: 'trend-down-icon',
    ariaLabel: 'Trend Down Icon',
    isLucide: false,
  },
  {
    name: 'TrendLess',
    component: TrendLess,
    dataTestId: 'trend-less-icon',
    ariaLabel: 'Trend Less Icon',
    isLucide: false,
  },
  {
    name: 'TrendMore',
    component: TrendMore,
    dataTestId: 'trend-more-icon',
    ariaLabel: 'Trend More Icon',
    isLucide: false,
  },
  {
    name: 'TrendNochange',
    component: TrendNochange,
    dataTestId: 'trend-nochange-icon',
    ariaLabel: 'Trend Nochange Icon',
    isLucide: false,
  },
  {
    name: 'TrendUp',
    component: TrendUp,
    dataTestId: 'trend-up-icon',
    ariaLabel: 'Trend Up Icon',
    isLucide: false,
  },
  {
    name: 'Vulnerability',
    component: Vulnerability,
    dataTestId: 'vulnerability-icon',
    ariaLabel: 'Vulnerability Icon',
    isLucide: false,
  },
  {
    name: 'Wizard',
    component: Wizard,
    dataTestId: 'wizard-icon',
    ariaLabel: 'Wizard Icon',
    isLucide: false,
  },
];

const IconComponents: IconComponentsType = icons.reduce(
  (acc, {name, component, dataTestId, ariaLabel, isLucide}) => {
    acc[name] = (props: ExtendedDynamicIconProps) => {
      const {'data-testid': dataTestIdFromProps, ...otherProps} = props;
      const finalDataTestId = dataTestIdFromProps ?? dataTestId;

      return (
        <DynamicIcon
          ariaLabel={ariaLabel}
          dataTestId={finalDataTestId}
          icon={component}
          strokeWidth={isLucide ? 1.5 : undefined}
          {...otherProps}
        />
      );
    };

    acc[name].displayName = `${name}Icon`;

    return acc;
  },
  {} as IconComponentsType,
);

export const {
  AddToAssets: AddToAssetsIcon,
  Audit: AuditIcon,
  Megaphone: AlertIcon,
  Alterable: AlterableIcon,
  ArrowDown: ArrowDownIcon,
  ArrowUpDown: ArrowUpDownIcon,
  ArrowUp: ArrowUpIcon,
  Calendar: CalendarIcon,
  CertBundAdv: CertBundAdvIcon,
  Clone: CloneIcon,
  CpeLogo: CpeLogoIcon,
  KeyRound: CredentialIcon,
  Cve: CveIcon,
  CvssCalculator: CvssIcon,
  BarChart3: DashboardIcon,
  Trash2: DeleteIcon,
  DeltaDifference: DeltaDifferenceIcon,
  Delta: DeltaIcon,
  ZoomIn: DetailsIcon,
  DfnCertAdv: DfnCertAdvIcon,
  Disabled: DisableIcon,
  DlCsv: DownloadCsvIcon,
  DlDeb: DownloadDebIcon,
  DlExe: DownloadExeIcon,
  Download: DownloadIcon,
  DlKey: DownloadKeyIcon,
  DlRpm: DownloadRpmIcon,
  DlSvg: DownloadSvgIcon,
  Pencil: EditIcon,
  Power: EnableIcon,
  Rss: FeedIcon,
  Filter: FilterIcon,
  ChevronFirst: FirstIcon,
  Folder: FoldIcon,
  Users: GroupIcon,
  HelpCircle: HelpIcon,
  Host: HostIcon,
  Import: ImportIcon,
  Info: InfoIcon,
  Key: KeyIcon,
  ChevronLast: LastIcon,
  Ldap: LdapIcon,
  Legend: LegendIcon,
  List: ListSvgIcon,
  LogOut: LogoutIcon,
  Settings: MySettingsIcon,
  New: NewIcon,
  NewNote: NewNoteIcon,
  NewOverride: NewOverrideIcon,
  NewTicket: NewTicketIcon,
  ChevronRight: NextIcon,
  Note: NoteIcon,
  Nvt: NvtIcon,
  Os: OsSvgIcon,
  Override: OverrideIcon,
  Gauge: PerformanceIcon,
  UserCheck: PermissionIcon,
  FileCog: PolicyIcon,
  PortList: PortListIcon,
  ChevronLeft: PreviousIcon,
  ProvideView: ProvideViewIcon,
  Radius: RadiusIcon,
  RefreshCcw: RefreshIcon,
  RemoveFromAssets: RemoveFromAssetsIcon,
  ReportConfig: ReportConfigIcon,
  ReportFormat: ReportFormatIcon,
  Report: ReportIcon,
  RotateCcw: ResetIcon,
  Restore: RestoreIcon,
  Result: ResultIcon,
  StepForward: ResumeIcon,
  Role: RoleIcon,
  Scanner: ScannerIcon,
  Clock3: ScheduleIcon,
  Search: SearchIcon,
  Sensor: SensorIcon,
  Settings2: Settings2Icon,
  Puzzle: SolutionTypeSvgIcon,
  Play: StartIcon,
  StMitigate: StMitigateIcon,
  StNonavailable: StNonAvailableIcon,
  Square: StopIcon,
  StUnknown: StUnknownIcon,
  StVendorfix: StVendorFixIcon,
  StWillnotfix: StWillNotFixIcon,
  StWorkaround: StWorkaroundIcon,
  Tag: TagIcon,
  Tags: TagsIcon,
  Target: TargetIcon,
  Task: TaskIcon,
  Ticket: TicketIcon,
  Tlscertificate: TlsCertificateIcon,
  Toggle3d: Toggle3dIcon,
  TrendDown: TrendDownIcon,
  TrendLess: TrendLessIcon,
  TrendMore: TrendMoreIcon,
  TrendNochange: TrendNoChangeIcon,
  TrendUp: TrendUpIcon,
  FolderOpen: UnfoldIcon,
  Upload: UploadIcon,
  User: UserIcon,
  ShieldCheck: VerifyIcon,
  ShieldX: VerifyNoIcon,
  Glasses: ViewOtherIcon,
  Vulnerability: VulnerabilityIcon,
  Wizard: WizardIcon,
  X: XIcon,
  ScanConfig: ScanConfigIcon,
  DeltaSecond: DeltaSecondIcon,
  Trash2: TrashcanIcon,
} = IconComponents;
