import { Building2, Search, FileText, Globe, Info, Mail, Home, CreditCard, FileCheck } from 'lucide-react';

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const NAV_LINKS = {
  home: '#',
  overview: 'https://sites.google.com/leben-hb.co.jp/teikei/%E3%83%9B%E3%83%BC%E3%83%A0#h.3f4tphhd9pn8',
  corporate: 'https://www.leben-establish.jp/teikei/',
  search: withBase('KigyouSearch/index.html'),
  card: 'https://mirarth-grp.box.com/s/jyt1o366iw1ttgefq3ifqddly8telfgu',
  form: 'https://docs.google.com/spreadsheets/d/19kNuG7M-KBLphEOOrto42tm2CmRPCQDQyWbvfNZnDcc/edit?gid=0#gid=0',
  topics: '#',
  contact: 'mailto:sakoda.kouhei@leben-hb.co.jp',
  contract: 'https://mirarth-grp.box.com/s/d25p0d4262mhit9ekpooxxggx1yl03d3',
} as const;

export const MENU_ITEMS = [
  { id: 'home', label: 'ホーム', icon: Home, path: NAV_LINKS.home },
  { id: 'overview', label: '制度概要', icon: Info, path: NAV_LINKS.overview },
  { id: 'corporate', label: '法人サイト', icon: Globe, path: NAV_LINKS.corporate },
  { id: 'search', label: '企業検索', icon: Search, path: NAV_LINKS.search },
  { id: 'card', label: '紹介カード', icon: CreditCard, path: NAV_LINKS.card },
  { id: 'form', label: '成約フォーム', icon: FileText, path: NAV_LINKS.form },
  { id: 'topics', label: 'トピックス', icon: Building2, path: NAV_LINKS.topics },
  { id: 'contact', label: 'お問い合わせ', icon: Mail, path: NAV_LINKS.contact },
  { id: 'contract', label: '業務提携契約書', icon: FileCheck, path: NAV_LINKS.contract },
];

export const LOGOS = [
  { id: 1, name: 'コーサイ・サービス', url: withBase('rogo/防衛省.svg') },
  { id: 2, name: '東急ライフィア', url: withBase('rogo/東急.png') },
  { id: 3, name: 'ベルス', url: withBase('rogo/BELS.jpg') },
  { id: 4, name: 'リロクラブ', url: withBase('rogo/リロクラブ.jpg') },
  { id: 5, name: 'ライジングサポート', url: withBase('rogo/SMBC.png') },
  { id: 6, name: 'KDDI共済会', url: withBase('rogo/KDDI.png') },
  { id: 7, name: '日立リアルエステートパートナーズ', url: withBase('rogo/HITACHI.jpg') },
  { id: 8, name: 'NECインテリジェンス', url: withBase('rogo/NEC.png') },
  { id: 9, name: 'ホンダ開発', url: withBase('rogo/HONDA.png') },
  { id: 10, name: 'パナソニック共済会', url: withBase('rogo/Panasonic.png') },
  { id: 11, name: '東京海上日動ファシリティーズ', url: withBase('rogo/東京海上日動.png') },
  { id: 12, name: 'NTTExcパートナーズ', url: withBase('rogo/NTT.png') },
  { id: 13, name: 'アクセンチュア', url: withBase('rogo/accenture.jpg') },

];

export type Topic = {
  id: number;
  date: string;
  category: string;
  tag?: string;
  title: string;
  isNew: boolean;
};

export const TOPICS: Topic[] = [
  { id: 1, date: '2024.03.05', category: '提携開始', title: '新規提携企業：株式会社〇〇不動産との提携を開始しました。', isNew: true },
  { id: 2, date: '2024.03.01', category: '営業向け案内', title: '【重要】紹介手数料の改定に関するお知らせ（4月1日より適用）', isNew: true },
  { id: 3, date: '2024.02.25', category: '制度変更', title: '提携企業従業員向け特別優待キャンペーンの期間延長が決定しました。', isNew: false },
  { id: 4, date: '2024.02.20', category: '提携開始', title: '新規提携企業：〇〇ライフスタイル株式会社との提携を開始しました。', isNew: false },
  { id: 5, date: '2024.02.15', category: '営業向け案内', title: '成約報告フォームの入力項目が一部変更になりました。', isNew: false },
  { id: 6, date: '2024.02.10', category: 'トピックス', title: '第3四半期 法人紹介成約件数ランキングを発表しました。', isNew: false },
  { id: 7, date: '2024.02.01', category: '提携開始', title: '新規提携企業：株式会社△△銀行との提携を開始しました。', isNew: false },
];

export const ACTION_CARDS = [
  { id: 'search', title: '企業検索', description: '提携企業の検索・詳細確認', icon: Search, color: 'bg-stone-800', textColor: 'text-white', priority: true, path: NAV_LINKS.search },
  { id: 'corporate', title: '法人サイト', description: '外部向け法人提携サイトへ', icon: Globe, color: 'bg-stone-50', textColor: 'text-stone-800', priority: false, path: NAV_LINKS.corporate },
  { id: 'topics', title: 'トピックス', description: '最新の提携情報・お知らせ', icon: Building2, color: 'bg-stone-50', textColor: 'text-stone-800', priority: false, path: NAV_LINKS.topics },
  { id: 'form', title: '成約フォーム', description: '紹介案件の成約報告はこちら', icon: FileText, color: 'bg-stone-50', textColor: 'text-stone-800', priority: true, path: NAV_LINKS.form },
  { id: 'overview', title: '制度概要', description: '提携制度の仕組み・特典について', icon: Info, color: 'bg-stone-50', textColor: 'text-stone-800', priority: false, path: NAV_LINKS.overview },
  { id: 'card', title: '紹介カード', description: '紹介時に使用するカードのDL', icon: CreditCard, color: 'bg-stone-50', textColor: 'text-stone-800', priority: false, path: NAV_LINKS.card },
  { id: 'contract', title: '業務提携契約書', description: '契約書の雛形・確認はこちら', icon: FileCheck, color: 'bg-stone-50', textColor: 'text-stone-800', priority: false, path: NAV_LINKS.contract },
  { id: 'contact', title: 'お問い合わせ', description: '制度に関するご質問・ご相談', icon: Mail, color: 'bg-stone-50', textColor: 'text-stone-800', priority: false, path: NAV_LINKS.contact },
];
