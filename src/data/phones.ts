export interface PhoneSpec {
  network: string;
  platform: string;
  os: string;
  camera: string;
  display: string;
  interface: string;
  memory: string;
  battery: string;
  size: string;
  color: string;
  features: string;
}

export interface PhoneData {
  slug: string;
  name: string;
  category: string;
  images: string[];
  bestFor: string;
  featured: boolean;
  specs: PhoneSpec;
}

export const phonesData: PhoneData[] = [
  {
    slug: 'zte-blade-a36',
    name: 'nubia A36',
    category: 'Entry Level',
    images: ['/a36.PNG', '/a36.PNG', '/a36.PNG', '/a36.PNG', '/a36.PNG'],
    bestFor: 'Students & first-time smartphone users',
    featured: false,
    specs: {
      network: 'FDD: B1/B3/B5/B7/B8/B20/B28\nTDD: B38/B40/B41\nUMTS: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nFDD:B1/B2/B3/B4/B5/B7/B8/B12/B13/B17/B28/B66\nTDD: B38/B40\nUMTS: B1/B2/B4/B5/B8\nGSM: B2/B3/B5/B8',
      platform: 'Unisoc T7200\nOcta-core 1.6GHz',
      os: 'Android V',
      camera: 'Rear: 8M AF+0.08M\nFront: 5M FF',
      display: '6.75 HD+ Waterdrop, 90Hz\n1600*720',
      interface: 'Type-C, 3.5mm Earphone Port\nNano+Nano+TF',
      memory: '(2+4)GB+64GB\n(4+8)GB+64GB',
      battery: '5000mAh\n5W/10W',
      size: '167.3*77.37*8.3mm',
      color: 'Nebula Black\nAqua Green\nTitanium Gold',
      features: 'GPS, WiFi 2.4G/5G, 802.11 a/b/g/n/ac, BT 5.2, Accelerometer, Side Fingerprint (Optional), VOLTE, Live island, 4.5G network(EU), 200% large volume speaker'
    }
  },
  {
    slug: 'zte-blade-a56',
    name: 'ZTE Blade A56',
    category: 'Mid-Range',
    images: ['/a56.PNG', '/a56.PNG', '/a56.PNG', '/a56.PNG', '/a56.PNG'],
    bestFor: 'Professionals & everyday users',
    featured: false,
    specs: {
      network: 'FDD: B1/B3/B5/B7/B8/B20/B28\nTDD: B38/B40/B41\nUMTS: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nFDD:B1/B2/B3/B4/B5/B7/B8/B12/B13/B17/B28/B66\nTDD: B38/B40\nUMTS: B1/B2/B4/B5/B8\nGSM: B2/B3/B5/B8',
      platform: 'Unisoc T7200\nOcta-core 1.6GHz',
      os: 'Android V',
      camera: 'Rear: 13M AF+ Dual 0.08M\nFront: 8M FF',
      display: '6.75 HD+ Waterdrop, 90Hz\n1600*720',
      interface: 'Type-C, 3.5mm Earphone Port\nNano+Nano+TF',
      memory: '(4+8)GB+64GB\n(4+8)GB+128GB',
      battery: '5000mAh\n10W',
      size: '167.3*77.37*8.3mm',
      color: 'Celestial Black\nFloating Gold',
      features: 'GPS, WiFi 2.4G/5G, 802.11 a/b/g/n/ac, BT 5.2, Accelerometer, Side Fingerprint, VOLTE, NFC(Optional), Live island, 4.5G network, 200% large volume speaker'
    }
  },
  {
    slug: 'zte-blade-a76',
    name: 'ZTE Blade A76',
    category: 'Advanced',
    images: ['/a76.PNG', '/a76.PNG', '/a76.PNG', '/a76.PNG', '/a76.PNG'],
    bestFor: 'SME owners & tech-savvy users',
    featured: false,
    specs: {
      network: 'FDD: B1/B3/B5/B7/B8/B20/B28\nTDD: B38/B40/B41\nUMTS: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nFDD:B1/B2/B3/B4/B5/B7/B8/B12/B13/B17/B28/B66\nTDD: B38/B40\nUMTS: B1/B2/B4/B5/B8\nGSM: B2/B3/B5/B8',
      platform: 'Unisoc T7250\nOcta-core 1.8GHz',
      os: 'Android V',
      camera: 'Rear: 50M AF+0.08M+0.08M\nFront: 8M FF',
      display: '6.75 HD+ Waterdrop, 90Hz\n1600*720',
      interface: 'Type-C, 3.5mm Earphone Port\nNano+Nano+TF',
      memory: '(4+8)GB+128GB',
      battery: '5000mAh\n22.5W',
      size: '167.3*77.37*8.3mm',
      color: 'Polar Grey\nSand Gold',
      features: 'GPS, WiFi 2.4G/5G, 802.11 a/b/g/n/ac, BT 5.2, Accelerometer, Side Fingerprint, VOLTE, NFC(Optional), Live island, 4.5G network, 200% large volume speaker'
    }
  },
  {
    slug: 'nubia-v80-pro',
    name: 'nubia V80 Pro',
    category: 'Premium',
    images: ['/v80.PNG', '/v80.PNG', '/v80.PNG', '/v80.PNG', '/v80.PNG'],
    bestFor: 'Power users & business leaders',
    featured: true,
    specs: {
      network: 'GSM: B2/B3/B5/B8\nUMTS: B1/B2/B4/B5/B8\nFDD: B1/B2/B3/B4/B5/B7/B8/B12/B13/B17/B26/B28/B66\nTDD: B38/B40/B41(120M)\n\nGSM: B2/B3/B5/B8\nUMTS: B1/B2/B5/B8\nFDD: B1/B3/B5/B7/B8/B20/B28\nTDD: B38/B40/B41(194M)',
      platform: 'Unisoc T7280\nOcta-Core 2.2GHz',
      os: 'MyOS 16\nBased on Android W',
      camera: 'Rear: 108M AF+2M FF+0.08M\nFront: 16M FF',
      display: '6.75" High-Res, Hole, 120Hz\n1940*900, 1000nits',
      interface: 'Type-C, 3.5mm Earphone Port\nNano+Nano+TF',
      memory: '(8+12)GB+256GB',
      battery: '5000mAh\n22.5W Fast Charging',
      size: '166*79*7.7mm',
      color: 'Feather Black\nPetal Gold\nMist White',
      features: 'WIFI 2.4G/5G, Hotspot, 802.11 a/b/g/n/ac, GPS, Compass, BT5.2, Accelerometer Proximity, Ambient Light, Side fingerprint, VoLTE, NFC(Optional), Dual Mic, 4.5G(EU version), nubia Linkfree, AI Button'
    }
  }
];

export function getPhoneBySlug(slug: string): PhoneData | undefined {
  return phonesData.find(p => p.slug === slug);
}
