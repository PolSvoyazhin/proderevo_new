import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { GALLERY, PRODUCTS, formatPrice } from '@/data/catalog';

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>

        {/* ── HERO ── */}
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '80px 24px 64px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            {/* Live counter badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 12,
                color: 'var(--accent)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  display: 'inline-block',
                }}
              />
              327 террас уже оформлено с Т▪И▪К
            </div>

            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 52,
                fontWeight: 600,
                color: 'var(--text)',
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              Посмотрите как<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>тиковая мебель</span><br />
              выглядит у вас
            </h1>

            <p
              style={{
                fontSize: 18,
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 40,
              }}
            >
              Загрузите фото своей террасы — AI расставит мебель ТИК в вашем пространстве. Бесплатно. Без регистрации. За 3–8 минут.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href="/tryout"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 32,
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                ✦ Бесплатная Примерка
              </Link>
              <Link
                href="/chat"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'transparent',
                  color: 'var(--text)',
                  padding: '14px 28px',
                  borderRadius: 32,
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                  border: '1.5px solid var(--border)',
                }}
              >
                Спросить консультанта
              </Link>
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: 'flex',
                gap: 32,
                marginTop: 40,
                paddingTop: 32,
                borderTop: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: 'Grade A', label: 'Тик Burma Forest' },
                { value: '15 лет', label: 'Гарантия' },
                { value: 'FSC', label: 'Сертификат' },
                { value: '20+', label: 'Лет на рынке' },
              ].map((badge) => (
                <div key={badge.label}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Playfair Display, serif' }}>
                    {badge.value}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero mosaic */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, height: 480 }}>
            {GALLERY.slice(0, 4).map((project, i) => (
              <div
                key={project.id}
                style={{
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${project.color}, ${project.palette})`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 16,
                  gridColumn: i === 0 ? 'span 1' : undefined,
                  gridRow: i === 0 ? 'span 2' : undefined,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45))',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{project.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{project.location}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ backgroundColor: 'var(--surface)', padding: '72px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, marginBottom: 12 }}>
                Как работает Примерка
              </h2>
              <p style={{ fontSize: 16, color: 'var(--muted)' }}>Три шага — и вы видите мебель у себя</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                {
                  step: '01',
                  icon: '◻',
                  title: 'Выберите мебель',
                  desc: 'Листайте каталог и нажмите «Примерить» на понравившемся товаре или комплекте.',
                },
                {
                  step: '02',
                  icon: '◈',
                  title: 'Загрузите фото',
                  desc: 'Сфотографируйте террасу или сад при дневном свете. Подходят фото с телефона.',
                },
                {
                  step: '03',
                  icon: '✦',
                  title: 'Получите результат',
                  desc: 'AI расставит мебель за 3–8 минут. Поделитесь с партнёром или задайте вопрос.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    padding: 32,
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: 'var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      color: 'var(--accent)',
                      marginBottom: 20,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 10 }}>
                    ШАГ {item.step}
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link
                href="/tryout"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  padding: '14px 32px',
                  borderRadius: 32,
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Попробовать — это бесплатно
              </Link>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 40,
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, marginBottom: 8 }}>
                Проекты клиентов
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)' }}>Реальные террасы и сады — не студийные рендеры</p>
            </div>
            <Link
              href="/catalog"
              style={{
                fontSize: 14,
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 500,
                borderBottom: '1px solid var(--accent-light)',
                paddingBottom: 2,
              }}
            >
              Смотреть каталог →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
          >
            {GALLERY.map((project, i) => (
              <div
                key={project.id}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${project.color} 0%, ${project.palette} 100%)`,
                  height: i % 3 === 0 ? 340 : 280,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 12,
                    letterSpacing: '0.06em',
                  }}
                >
                  {project.region}
                </div>
                <Link
                  href="/tryout"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: '#fff',
                    color: 'var(--accent)',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 16,
                    textDecoration: 'none',
                  }}
                >
                  Примерить
                </Link>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 20px 20px',
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{project.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{project.location}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {project.productIds.map((pid) => {
                      const p = PRODUCTS.find((pr) => pr.id === pid);
                      if (!p) return null;
                      return (
                        <span
                          key={pid}
                          style={{
                            fontSize: 11,
                            color: 'rgba(255,255,255,0.9)',
                            backgroundColor: 'rgba(0,0,0,0.28)',
                            padding: '3px 8px',
                            borderRadius: 8,
                          }}
                        >
                          {p.name.split(' ').slice(0, 3).join(' ')}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TOP PRODUCTS ── */}
        <section style={{ backgroundColor: 'var(--surface)', padding: '72px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, marginBottom: 8 }}>
                  Популярные модели
                </h2>
                <p style={{ fontSize: 15, color: 'var(--muted)' }}>Тик Grade A · Гарантия 15 лет · Сертификат FSC</p>
              </div>
              <Link
                href="/catalog"
                style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--accent-light)', paddingBottom: 2 }}
              >
                Весь каталог →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {PRODUCTS.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      height: 220,
                      background: `linear-gradient(135deg, ${product.color}20 0%, ${product.color}50 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <span style={{ fontSize: 56 }}>
                      {product.category === 'sofas' ? '🛋️' : product.category === 'tables' ? '🪵' : '🪑'}
                    </span>
                    {product.tag && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          backgroundColor: 'var(--accent)',
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: 12,
                        }}
                      >
                        {product.tag}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '20px 20px 24px' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{product.categoryLabel}</div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
                      {product.material.split(',').slice(0, 2).join(', ')}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                          {formatPrice(product.priceFrom)}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          до {formatPrice(product.priceTo)}
                        </div>
                      </div>
                      <Link
                        href="/tryout"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: '#fff',
                          padding: '8px 18px',
                          borderRadius: 20,
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        Примерить
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ maxWidth: 1280, margin: '80px auto', padding: '0 24px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #5A3E28 100%)',
              borderRadius: 28,
              padding: '64px 72px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 38,
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                Не уверены? Спросите консультанта
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 480, lineHeight: 1.65 }}>
                AI знает весь каталог. Спросите про климат, уход, гарантию или подбор комплекта — ответит честно и конкретно. Если AI не знает — передаст вопрос живому специалисту.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <Link
                href="/chat"
                style={{
                  backgroundColor: '#fff',
                  color: 'var(--accent)',
                  padding: '14px 28px',
                  borderRadius: 28,
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Спросить консультанта
              </Link>
              <Link
                href="/tryout"
                style={{
                  backgroundColor: 'transparent',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 28,
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  textAlign: 'center',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                Попробовать Примерку
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
