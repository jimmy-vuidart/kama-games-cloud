import { Hardware } from '@kama-games-cloud/shared';

export enum HardwareId {
  KILSICA = 'kilsi',
}

export const HARDWARE: Hardware[] = [
  {
    id: HardwareId.KILSICA,
    label: 'PC serveur de Kilsi',
    macAddress: '18-C0-4D-2D-6D-F2',
    ipAddress: 'kilsica.duckdns.org',
    controlTowerAddress: 'kilsica.duckdns.org:5000',
  },
];
