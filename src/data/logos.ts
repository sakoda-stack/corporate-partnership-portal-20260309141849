export type LogoItem = {
  id: number;
  name: string;
  file: string;
};

const logoAssetModules = import.meta.glob('../../rogo/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const logoAssetByFile = new Map<string, string>(
  Object.entries(logoAssetModules)
    .map(([modulePath, resolvedUrl]) => {
      const file = modulePath.split('/').pop();
      return file ? [file, resolvedUrl] : null;
    })
    .filter((entry): entry is [string, string] => entry !== null),
);

const LOGO_ITEMS: LogoItem[] = [
  { id: 1, name: '防衛省', file: '防衛省.svg' },
  { id: 2, name: '東急', file: '東急.png' },
  { id: 3, name: 'BELS', file: 'BELS.jpg' },
  { id: 4, name: 'リロクラブ', file: 'リロクラブ.jpg' },
  { id: 5, name: '三井住友', file: 'SMBC.png' },
  { id: 6, name: 'KDDI', file: 'KDDI.png' },
  { id: 7, name: '日立', file: 'HITACHI.jpg' },
  { id: 8, name: 'NEC', file: 'NEC.png' },
  { id: 9, name: 'Honda', file: 'HONDA.png' },
  { id: 10, name: 'Panasonic', file: 'Panasonic.png' },
  { id: 11, name: '東京海上日動', file: '東京海上日動.png' },
  { id: 12, name: 'NTT', file: 'NTT.png' },
  { id: 13, name: 'Accenture', file: 'accenture.jpg' },
];

export const LOGOS = LOGO_ITEMS.map((logo) => {
  const resolvedUrl = logoAssetByFile.get(logo.file);

  if (!resolvedUrl) {
    console.warn(`[logos] Asset not found: ${logo.file}`);
  }

  return {
    id: logo.id,
    name: logo.name,
    file: logo.file,
    url: resolvedUrl ?? `${import.meta.env.BASE_URL}rogo/${encodeURI(logo.file)}`,
  };
});