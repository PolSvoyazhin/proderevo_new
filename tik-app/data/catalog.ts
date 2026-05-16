export type Product = {
  id: string;
  name: string;
  category: 'sofas' | 'chairs' | 'tables' | 'sunbeds' | 'sets';
  categoryLabel: string;
  priceFrom: number;
  priceTo: number;
  material: string;
  dimensions: string;
  warrantyYears: number;
  climateZones: string[];
  tag?: string;
  description: string;
  care: string;
  color: string; // placeholder color for image
};

export type GalleryProject = {
  id: string;
  title: string;
  location: string;
  region: string;
  productIds: string[];
  color: string; // placeholder
  palette: string; // second color for gradient
};

export const PRODUCTS: Product[] = [
  {
    id: 'singapore',
    name: 'Комплект «Сингапур»',
    category: 'sets',
    categoryLabel: 'Комплекты',
    priceFrom: 780000,
    priceTo: 920000,
    material: 'Термоясень, Ироко и тик, скрытый крепёж',
    dimensions: 'Диван 220 см + 2 кресла 75 см + стол 120×70 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал'],
    tag: 'Хит продаж',
    description: 'Флагманский комплект коллекции — диван, два кресла и кофейный стол из единой партии термоясеня. Подушки из влагостойкой ткани Sunbrella. Скрытый крепёж — никаких видимых болтов.',
    care: 'Масло Burma 1 раз в год, 30 минут на весь комплект',
    color: '#8B6F47',
  },
  {
    id: 'jakarta',
    name: 'Диван «Джакарта» 3-местный',
    category: 'sofas',
    categoryLabel: 'Диваны',
    priceFrom: 390000,
    priceTo: 440000,
    material: 'Термоясень, Ироко и тик',
    dimensions: '215 × 90 × 88 см, высота сиденья 44 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал', 'Сибирь'],
    description: 'Монументальный диван с глубоким посадочным местом. Подходит для просторных террас и летних веранд. Разборная конструкция — ножки снимаются для хранения зимой.',
    care: 'Масло Burma 1 раз в год',
    color: '#7A6040',
  },
  {
    id: 'bali',
    name: 'Угловой диван «Бали»',
    category: 'sofas',
    categoryLabel: 'Диваны',
    priceFrom: 520000,
    priceTo: 610000,
    material: 'Термоясень, Ироко и тик, премиальные ткани',
    dimensions: '280 × 200 × 88 см (угловая секция)',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал'],
    tag: 'Новинка',
    description: 'Угловой диван для зонирования открытого пространства. Модульная конструкция — секции переставляются. Белые подушки из ткани, устойчивой к выцветанию и влаге.',
    care: 'Масло Burma 1 раз в год, подушки — ручная стирка',
    color: '#A0845C',
  },
  {
    id: 'madeira',
    name: 'Комплект «Мадейра» с шезлонгом',
    category: 'sets',
    categoryLabel: 'Комплекты',
    priceFrom: 640000,
    priceTo: 740000,
    material: 'Термоясень, Ироко и тик, нержавеющая фурнитура',
    dimensions: 'Диван 200 см + шезлонг 190 см + стол 80×50 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Краснодар'],
    tag: 'Выгода -10%',
    description: 'Комплект для отдыха у бассейна или на открытой террасе. Диван, раскладной шезлонг в 5 положениях и столик. Всё из единой партии — цвет дерева совпадает.',
    care: 'Масло Burma раз в сезон',
    color: '#C4A882',
  },
  {
    id: 'milan',
    name: 'Обеденный стол «Милан» 240 см',
    category: 'tables',
    categoryLabel: 'Столы',
    priceFrom: 220000,
    priceTo: 260000,
    material: 'Ироко и тик, монолитная столешница',
    dimensions: '240 × 100 × 75 см',
    warrantyYears: 20,
    climateZones: ['Центр', 'Юг', 'Урал'],
    description: 'Обеденный стол из цельного массива Ироко на 8–10 персон. Монолитная столешница без стыков. Сечение ножек 10×10 см. На монолитные столешницы — гарантия 20 лет.',
    care: 'Масло Burma раз в сезон, 20 минут',
    color: '#6B4F35',
  },
  {
    id: 'capetown',
    name: 'Кресло «Кейптаун» lounge',
    category: 'chairs',
    categoryLabel: 'Кресла',
    priceFrom: 155000,
    priceTo: 180000,
    material: 'Термоясень, Ироко и тик',
    dimensions: '80 × 85 × 90 см, широкие подлокотники',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал', 'Сибирь'],
    description: 'Широкое лаунж-кресло с высокой спинкой и объёмными подушками. Подходит для одиночного отдыха и в паре к любому дивану коллекции. Разборная конструкция.',
    care: 'Масло Burma 1 раз в год',
    color: '#9B7D5A',
  },
  {
    id: 'sochi',
    name: 'Шезлонг «Сочи» складной',
    category: 'sunbeds',
    categoryLabel: 'Шезлонги',
    priceFrom: 98000,
    priceTo: 118000,
    material: 'Термоясень и тик, нержавеющая фурнитура',
    dimensions: '195 × 68 × 35 см (в сложенном: 195×28×28 см)',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Краснодар'],
    description: 'Складной шезлонг с регулируемой спинкой в 5 положениях. Компактно складывается для хранения. Самоочищающийся термоясень — после дождя не нужно вытирать.',
    care: 'Протереть влажной тряпкой, масло Burma раз в 2 года',
    color: '#B89870',
  },
];

export const GALLERY: GalleryProject[] = [
  {
    id: 'G-001',
    title: 'Терраса Марины',
    location: 'Сочи, Краснодарский край',
    region: 'Юг',
    productIds: ['singapore'],
    color: '#8B6F47',
    palette: '#C4A882',
  },
  {
    id: 'G-002',
    title: 'Сад Алексея',
    location: 'Рублёвка, Подмосковье',
    region: 'Центр',
    productIds: ['jakarta', 'milan'],
    color: '#6B4F35',
    palette: '#A0845C',
  },
  {
    id: 'G-003',
    title: 'Веранда Светланы',
    location: 'Репино, Ленобласть',
    region: 'Северо-Запад',
    productIds: ['capetown', 'milan'],
    color: '#7A6040',
    palette: '#B89870',
  },
  {
    id: 'G-004',
    title: 'Бассейн Дмитрия',
    location: 'Ростов-на-Дону',
    region: 'Юг',
    productIds: ['madeira', 'sochi'],
    color: '#9B7D5A',
    palette: '#D4B890',
  },
  {
    id: 'G-005',
    title: 'Патио Елены',
    location: 'Екатеринбург, Урал',
    region: 'Урал',
    productIds: ['bali'],
    color: '#5A4530',
    palette: '#8B6F47',
  },
  {
    id: 'G-006',
    title: 'Летняя гостиная Ивана',
    location: 'Краснодар',
    region: 'Юг',
    productIds: ['singapore', 'capetown'],
    color: '#C4A882',
    palette: '#E8D4B8',
  },
];

export const CATEGORIES = [
  { value: 'all', label: 'Все' },
  { value: 'sets', label: 'Комплекты' },
  { value: 'sofas', label: 'Диваны' },
  { value: 'chairs', label: 'Кресла' },
  { value: 'tables', label: 'Столы' },
  { value: 'sunbeds', label: 'Шезлонги' },
];

export const REGIONS = ['Все регионы', 'Центр', 'Юг', 'Урал', 'Северо-Запад'];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}
