'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRODUCTS, CATEGORIES, formatPrice, type Product } from '@/data/catalog';

function ProductCard({ product }: { product: Product }) {
  const icon =
    product.category === 'sofas' ? '🛋️'
    : product.category === 'tables' ? '🪵'
    : product.category === 'sunbeds' ? '🌅'
    : product.category === 'sets' ? '✦'
    : '🪑';

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 240,
          background: `linear-gradient(135deg, ${product.color}18 0%, ${product.color}45 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 64 }}>{icon}</span>

        {product.tag && (
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              backgroundColor: 'var(--accent)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 12,
              letterSpacing: '0.04em',
            }}
          >
            {product.tag}
          </div>
        )}

        {/* Warranty badge */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            backgroundColor: 'rgba(255,255,255,0.9)',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--muted)',
            padding: '4px 10px',
            borderRadius: 12,
          }}
        >
          {product.warrantyYears} лет гарантии
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          {product.categoryLabel}
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 10 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
          {product.description}
        </p>

        {/* Dims + care */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
            <span style={{ color: 'var(--muted)', flexShrink: 0 }}>Размер:</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{product.dimensions}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
            <span style={{ color: 'var(--muted)', flexShrink: 0 }}>Уход:</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{product.care}</span>
          </div>
        </div>

        {/* Climate zones */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {product.climateZones.map((zone) => (
            <span
              key={zone}
              style={{
                fontSize: 11,
                color: 'var(--accent)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '3px 10px',
                borderRadius: 12,
                fontWeight: 500,
              }}
            >
              {zone}
            </span>
          ))}
        </div>

        {/* Price + actions */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>
              {formatPrice(product.priceFrom)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              до {formatPrice(product.priceTo)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href="/chat"
              style={{
                padding: '9px 16px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                color: 'var(--accent)',
                border: '1.5px solid var(--accent)',
              }}
            >
              Спросить
            </Link>
            <Link
              href="/tryout"
              style={{
                padding: '9px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                color: '#fff',
              }}
            >
              Примерить
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 80px' }}>

          {/* Page header */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 600, marginBottom: 12 }}>
              Каталог мебели Т▪И▪К
            </h1>
            <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 580 }}>
              Термоясень, Ироко и тик · Скрытый крепёж · Гарантия 15–20 лет. Нажмите «Примерить» — и увидите мебель в вашем пространстве.
            </p>
          </div>

          {/* Filter bar */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 40,
              flexWrap: 'wrap',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 500,
                  border: '1.5px solid',
                  borderColor: activeCategory === cat.value ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: activeCategory === cat.value ? 'var(--accent)' : 'transparent',
                  color: activeCategory === cat.value ? '#fff' : 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {cat.label}
                {cat.value !== 'all' && (
                  <span style={{ marginLeft: 6, opacity: 0.7, fontSize: 12 }}>
                    ({PRODUCTS.filter((p) => p.category === cat.value).length})
                  </span>
                )}
              </button>
            ))}

            <div style={{ marginLeft: 'auto', fontSize: 14, color: 'var(--muted)', alignSelf: 'center' }}>
              {filtered.length} {filtered.length === 1 ? 'модель' : filtered.length < 5 ? 'модели' : 'моделей'}
            </div>
          </div>

          {/* Products grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: 72,
              backgroundColor: 'var(--surface)',
              borderRadius: 24,
              padding: '48px 56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
                Не нашли нужную модель?
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted)' }}>
                Спросите консультанта — подберём комплект под ваш участок и климат.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <Link
                href="/chat"
                style={{
                  padding: '12px 24px',
                  borderRadius: 24,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                }}
              >
                Спросить консультанта
              </Link>
              <Link
                href="/tryout"
                style={{
                  padding: '12px 24px',
                  borderRadius: 24,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'var(--accent)',
                  border: '1.5px solid var(--accent)',
                }}
              >
                Попробовать Примерку
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
