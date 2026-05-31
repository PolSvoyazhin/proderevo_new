import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRODUCTS, formatPrice } from '@/data/catalog';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

const ICON_MAP: Record<string, string> = {
  sofas: '🛋️',
  tables: '🪵',
  sunbeds: '🌅',
  sets: '✦',
  chairs: '🪑',
};

const REVIEWS = [
  {
    name: 'Марина К.',
    location: 'Подмосковье, Жуковка',
    date: 'Март 2026',
    rating: 5,
    text: 'Полгода смотрели, выбирали. В итоге поехали в шоурум — и сразу поняли, что это именно то. Мебель стоит на открытой террасе с октября, пережила снег и слякоть без единой царапины. Дерево как новое.',
  },
  {
    name: 'Алексей Р.',
    location: 'Краснодар',
    date: 'Февраль 2026',
    rating: 5,
    text: 'Брали комплект под летнюю кухню. Качество сборки — на уровне европейских брендов, которые видел в Италии. При этом цена значительно ниже. Масло Burma нанесли сразу — процедура на 20 минут, и всё.',
  },
  {
    name: 'Елена и Дмитрий С.',
    location: 'Екатеринбург',
    date: 'Январь 2026',
    rating: 5,
    text: 'Скептически относились к уличной мебели на Урале — думали, не выживет. Уже вторая зима, всё идеально. Скрытый крепёж — это отдельный восторг, нигде не торчат болты.',
  },
];

const MATERIAL_STORY = {
  title: 'История материала',
  sections: [
    {
      name: 'Термоясень',
      body: 'Ясень, прошедший термическую обработку при температуре 185–215°C без химии. Процесс меняет структуру клеток: дерево перестаёт впитывать влагу, не разбухает и не трескается при морозе. Цвет — тёплый шоколадно-коричневый, не требует тонировки.',
    },
    {
      name: 'Ироко',
      body: 'Африканский тик из Западной Африки. Один из самых маслянистых и плотных видов древесины в мире: 660 кг/м³. Высокое содержание натуральных масел делает его устойчивым к влаге, грибку и насекомым без дополнительной обработки.',
    },
    {
      name: 'Тик',
      body: 'Классика premium outdoor — использовался в судостроении сотни лет. Содержит натуральный каучук и кремниевые соединения, которые защищают волокно от деформации. Со временем приобретает благородный серебристо-серый оттенок патины.',
    },
  ],
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.id !== id).slice(0, 3);
  const icon = ICON_MAP[product.category] ?? '🪑';

  // Slightly lighter/darker thumbnail shades
  const thumbShades = ['30', '40', '55', '20'];

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <nav style={{ padding: '24px 0 8px', display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Главная</Link>
            <span>/</span>
            <Link href="/catalog" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Каталог</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>{product.name}</span>
          </nav>

          {/* Hero */}
          <div className="m-col-1 m-gap-md" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, paddingTop: 24, paddingBottom: 64 }}>

            {/* Left — photo placeholders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Main image */}
              <div
                style={{
                  height: 460,
                  borderRadius: 24,
                  background: `linear-gradient(145deg, ${product.color}22 0%, ${product.color}55 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: 120 }}>{icon}</span>
                {product.tag && (
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    backgroundColor: 'var(--accent)', color: '#fff',
                    fontSize: 12, fontWeight: 700, padding: '5px 14px',
                    borderRadius: 14, letterSpacing: '0.04em',
                  }}>
                    {product.tag}
                  </div>
                )}
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
                  borderRadius: 10, padding: '6px 12px',
                  fontSize: 11, color: 'var(--muted)', fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  ФОТО СКОРО
                </div>
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {thumbShades.map((shade, i) => (
                  <div
                    key={i}
                    style={{
                      height: 88,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${product.color}${shade} 0%, ${product.color}${thumbShades[(i + 2) % 4]} 100%)`,
                      border: i === 0 ? `2px solid ${product.color}` : '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: 24,
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — product info */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Category badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                backgroundColor: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '4px 12px', fontSize: 12, fontWeight: 600,
                color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase',
                alignSelf: 'flex-start', marginBottom: 16,
              }}>
                {product.categoryLabel}
              </div>

              {/* Name */}
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 38, fontWeight: 600, lineHeight: 1.2,
                marginBottom: 8,
              }}>
                {product.name}
              </h1>

              {/* Description */}
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
                {product.description}
              </p>

              {/* Price */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Цена
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Playfair Display, serif' }}>
                    {formatPrice(product.priceFrom)}
                  </span>
                  <span style={{ fontSize: 16, color: 'var(--muted)' }}>
                    — {formatPrice(product.priceTo)}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  Доставка включена · Сборка включена
                </div>
              </div>

              {/* Key specs chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {[
                  { icon: '📐', label: product.dimensions },
                  { icon: '🛡️', label: `Гарантия ${product.warrantyYears} лет` },
                  { icon: '🌍', label: product.climateZones.join(', ') },
                ].map((chip) => (
                  <div key={chip.label} style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 10, padding: '7px 14px',
                    fontSize: 13, color: 'var(--text)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span>{chip.icon}</span>
                    <span>{chip.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link
                  href="/tryout"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '16px 32px', borderRadius: 28,
                    backgroundColor: 'var(--accent)', color: '#fff',
                    fontSize: 16, fontWeight: 700, textDecoration: 'none',
                    letterSpacing: '0.02em',
                  }}
                >
                  ✦ Примерить на своей террасе
                </Link>
                <Link
                  href="/chat"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '16px 32px', borderRadius: 28,
                    backgroundColor: '#fff', color: 'var(--accent)',
                    fontSize: 15, fontWeight: 600, textDecoration: 'none',
                    border: '1.5px solid var(--accent)',
                  }}
                >
                  Задать вопрос консультанту
                </Link>
              </div>

              {/* Trust line */}
              <div style={{
                marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)',
                display: 'flex', gap: 20, flexWrap: 'wrap',
              }}>
                {['Производство Новороссийск', 'Гарантия без условий', 'Доставка по России'].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <section style={{ paddingBottom: 72 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, marginBottom: 32 }}>
              Характеристики
            </h2>
            <div style={{
              backgroundColor: '#fff', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden',
            }}>
              {[
                { label: 'Материал', value: product.material },
                { label: 'Размеры', value: product.dimensions },
                { label: 'Гарантия', value: `${product.warrantyYears} лет — без условий, включая смену владельца` },
                { label: 'Климатические зоны', value: product.climateZones.join(', ') + ' — весь диапазон России' },
                { label: 'Уход', value: product.care },
                { label: 'Крепёж', value: 'Скрытый, нержавеющая сталь' },
                { label: 'Производство', value: 'Новороссийск, ул. Мира 3к1 — можно приехать посмотреть' },
                { label: 'Доставка', value: 'По всей России, включена в цену. Срок — 4–6 недель' },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="m-specs-row"
                  style={{
                    display: 'grid', gridTemplateColumns: '220px 1fr',
                    padding: '18px 28px',
                    borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
                    backgroundColor: i % 2 === 0 ? '#fff' : 'var(--surface)',
                  }}
                >
                  <div className="m-specs-label" style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>{row.label}</div>
                  <div style={{ fontSize: 15, color: 'var(--text)' }}>{row.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* История материала */}
          <section style={{ paddingBottom: 72 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, marginBottom: 12 }}>
              {MATERIAL_STORY.title}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 36, maxWidth: 640 }}>
              Коллекция Т▪И▪К сделана из трёх пород дерева, отобранных за десятилетия работы с outdoor-мебелью.
            </p>
            <div className="m-col-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {MATERIAL_STORY.sections.map((s) => (
                <div
                  key={s.name}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20, padding: '28px 28px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    backgroundColor: `${product.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, marginBottom: 16,
                  }}>
                    🪵
                  </div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
                    {s.name}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Уход */}
          <section style={{ paddingBottom: 72 }}>
            <div
              className="m-col-1 m-py-sm m-px"
              style={{
                backgroundColor: `${product.color}10`,
                border: `1px solid ${product.color}30`,
                borderRadius: 24, padding: '40px 48px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
              }}
            >
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, marginBottom: 12 }}>
                  Уход — раз в год
                </h2>
                <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
                  {product.care}. Масло Burma наносится мягкой тряпкой движениями по волокну. После высыхания (30–60 минут) мебель готова к сезону. Зимой можно оставить под открытым небом — заносить в дом не нужно.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  ['1', 'Нанесите масло Burma тряпкой по волокну'],
                  ['2', 'Подождите 30–60 минут до впитывания'],
                  ['3', 'Снимите остаток сухой тряпкой'],
                  ['4', 'Готово — мебель защищена на сезон'],
                ].map(([num, text]) => (
                  <div key={num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      backgroundColor: 'var(--accent)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, flexShrink: 0,
                    }}>
                      {num}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text)', paddingTop: 5 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section style={{ paddingBottom: 72 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600 }}>
                Отзывы покупателей
              </h2>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                {'★★★★★'} · 5.0 из 5 (47 отзывов)
              </div>
            </div>
            <div className="m-col-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {REVIEWS.map((review) => (
                <div
                  key={review.name}
                  style={{
                    backgroundColor: '#fff', borderRadius: 20, padding: '24px 24px',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Stars */}
                  <div style={{ fontSize: 14, color: '#F59E0B', marginBottom: 12, letterSpacing: 2 }}>
                    {'★'.repeat(review.rating)}
                  </div>
                  {/* Text */}
                  <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 20 }}>
                    «{review.text}»
                  </p>
                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      backgroundColor: `${product.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 700, color: 'var(--accent)',
                    }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{review.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{review.location} · {review.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related products */}
          <section style={{ paddingBottom: 72 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, marginBottom: 32 }}>
              Другие модели коллекции
            </h2>
            <div className="m-col-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/catalog/${p.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    backgroundColor: '#fff', borderRadius: 20,
                    border: '1px solid var(--border)', overflow: 'hidden',
                    transition: 'box-shadow 0.2s',
                  }}>
                    <div style={{
                      height: 180,
                      background: `linear-gradient(135deg, ${p.color}18 0%, ${p.color}45 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 56,
                    }}>
                      {ICON_MAP[p.category] ?? '🪑'}
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {p.categoryLabel}
                      </div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600 }}>
                        от {formatPrice(p.priceFrom)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link
                href="/catalog"
                style={{
                  display: 'inline-flex', padding: '13px 32px', borderRadius: 24,
                  border: '1.5px solid var(--accent)', color: 'var(--accent)',
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                }}
              >
                Весь каталог →
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
