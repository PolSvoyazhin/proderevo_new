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
    id: 'TIK-001',
    name: 'Диван «Форест» 3-местный',
    category: 'sofas',
    categoryLabel: 'Диваны',
    priceFrom: 380000,
    priceTo: 420000,
    material: 'Тик Grade A, влажность 12%, Burma Forest, сертификат FSC',
    dimensions: '210 × 85 × 90 см, высота сиденья 45 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал'],
    tag: 'Хит продаж',
    description: 'Монументальный диван из массива тика Grade A. Подушки из влагостойкой ткани Sunbrella. Подходит для любого климата России.',
    care: 'Тиковое масло 1 раз в год, 30 минут',
    color: '#8B6F47',
  },
  {
    id: 'TIK-002',
    name: 'Кресло «Форест» с подлокотниками',
    category: 'chairs',
    categoryLabel: 'Кресла',
    priceFrom: 145000,
    priceTo: 165000,
    material: 'Тик Grade A, сертификат FSC',
    dimensions: '75 × 80 × 88 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал', 'Сибирь'],
    description: 'Кресло к дивану «Форест». Идеально подходит для создания полного комплекта. Разборная конструкция для хранения зимой.',
    care: 'Тиковое масло 1 раз в год',
    color: '#A0845C',
  },
  {
    id: 'TIK-003',
    name: 'Обеденный стол «Лонг» 240 см',
    category: 'tables',
    categoryLabel: 'Столы',
    priceFrom: 210000,
    priceTo: 240000,
    material: 'Тик Grade A, монолитная столешница',
    dimensions: '240 × 100 × 75 см',
    warrantyYears: 20,
    climateZones: ['Центр', 'Юг', 'Урал'],
    tag: 'Новинка',
    description: 'Обеденный стол из цельного массива тика на 8-10 персон. Монолитная столешница без стыков. Сечение ножек 10×10 см.',
    care: 'Масло раз в сезон, 20 минут',
    color: '#6B4F35',
  },
  {
    id: 'TIK-004',
    name: 'Шезлонг «Санрайз» складной',
    category: 'sunbeds',
    categoryLabel: 'Шезлонги',
    priceFrom: 95000,
    priceTo: 115000,
    material: 'Тик Grade A + нержавеющая фурнитура',
    dimensions: '190 × 65 × 35 см (в сложенном виде 190×25×25 см)',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Краснодар'],
    description: 'Складной шезлонг с регулируемой спинкой в 5 положениях. Компактно складывается для хранения. Самоочищающийся тик.',
    care: 'Протереть влажной тряпкой, масло раз в 2 года',
    color: '#C4A882',
  },
  {
    id: 'TIK-005',
    name: 'Комплект «Терраса» (диван + 2 кресла + стол)',
    category: 'sets',
    categoryLabel: 'Комплекты',
    priceFrom: 720000,
    priceTo: 820000,
    material: 'Тик Grade A — весь комплект, единая партия',
    dimensions: 'Диван 210 см + кресла 75 см + стол 120×70 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал'],
    tag: 'Выгода -12%',
    description: 'Полный комплект для террасы из единой партии тика — весь цвет будет одинаковым. Экономия 12% относительно раздельной покупки.',
    care: 'Единый уход за всем комплектом — тиковое масло 1 раз в год',
    color: '#7A6040',
  },
  {
    id: 'TIK-006',
    name: 'Кофейный столик «Куб» 60×60',
    category: 'tables',
    categoryLabel: 'Столы',
    priceFrom: 58000,
    priceTo: 72000,
    material: 'Тик Grade A',
    dimensions: '60 × 60 × 45 см',
    warrantyYears: 15,
    climateZones: ['Центр', 'Юг', 'Урал', 'Сибирь'],
    description: 'Компактный кофейный столик с массивной столешницей. Идеален к дивану «Форест» и отдельно стоящим креслам.',
    care: 'Масло раз в год',
    color: '#9B7D5A',
  },
];

export const GALLERY: GalleryProject[] = [
  {
    id: 'G-001',
    title: 'Терраса Марины',
    location: 'Сочи, Краснодарский край',
    region: 'Юг',
    productIds: ['TIK-005'],
    color: '#8B6F47',
    palette: '#C4A882',
  },
  {
    id: 'G-002',
    title: 'Сад Алексея',
    location: 'Рублёвка, Подмосковье',
    region: 'Центр',
    productIds: ['TIK-001', 'TIK-003'],
    color: '#6B4F35',
    palette: '#A0845C',
  },
  {
    id: 'G-003',
    title: 'Веранда Светланы',
    location: 'Репино, Ленобласть',
    region: 'Северо-Запад',
    productIds: ['TIK-002', 'TIK-006'],
    color: '#7A6040',
    palette: '#B89870',
  },
  {
    id: 'G-004',
    title: 'Бассейн Дмитрия',
    location: 'Ростов-на-Дону',
    region: 'Юг',
    productIds: ['TIK-004'],
    color: '#9B7D5A',
    palette: '#D4B890',
  },
  {
    id: 'G-005',
    title: 'Патио Елены',
    location: 'Екатеринбург, Урал',
    region: 'Урал',
    productIds: ['TIK-005'],
    color: '#5A4530',
    palette: '#8B6F47',
  },
  {
    id: 'G-006',
    title: 'Летняя кухня Ивана',
    location: 'Краснодар',
    region: 'Юг',
    productIds: ['TIK-003', 'TIK-002'],
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
