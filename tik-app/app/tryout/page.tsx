'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRODUCTS, formatPrice, type Product } from '@/data/catalog';

type Step = 'demo' | 'select' | 'upload' | 'processing' | 'result';

const PROGRESS_STEPS = [
  { label: 'Анализируем пространство вашего участка...', tip: 'Три дерева коллекции Т▪И▪К', tipBody: 'Термоясень — термически обработанная древесина: не гниёт, не трескается при морозе. Ироко — африканский тик, один из самых плотных и маслянистых видов. Тик — классика premium outdoor. Обработка маслом Burma раз в год — и служит 25–40 лет.' },
  { label: 'Подбираем масштаб и перспективу...', tip: 'Как ухаживать — 5 минут в год', tipBody: 'Раз в год нанесите масло Burma мягкой тряпкой. Цвет постепенно станет серебристо-серым — это нормально и красиво.' },
  { label: 'Расставляем мебель, согласуем тени...', tip: 'Гарантия 15 лет — как это работает?', tipBody: 'Мы заменим или отремонтируем любую деталь бесплатно в течение 15 лет с даты покупки. Без условий.' },
  { label: 'Финальная обработка, почти готово!', tip: 'Тик в российском климате', tipBody: 'Подходит для всех регионов России: Подмосковья, Урала, Краснодара. Выдерживает от −40 до +50°C.' },
];

export default function TryoutPage() {
  const [step, setStep] = useState<Step>('demo');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [progressPct, setProgressPct] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedPhoto(ev.target?.result as string);
      setStep('processing');
      simulateProcessing();
    };
    reader.readAsDataURL(file);
  }

  function simulateProcessing() {
    let pStep = 0;
    let pct = 0;
    const interval = setInterval(() => {
      pct += 1.2;
      if (pct >= (pStep + 1) * 25 && pStep < 3) {
        pStep++;
        setProgressStep(pStep);
      }
      setProgressPct(Math.min(pct, 99));
      if (pct >= 99) {
        clearInterval(interval);
        setTimeout(() => setStep('result'), 800);
      }
    }, 120);
  }

  function reset() {
    setStep('demo');
    setSelectedProduct(null);
    setUploadedPhoto(null);
    setProgressStep(0);
    setProgressPct(0);
  }

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <div className="m-pt-sm m-pb-sm m-px" style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 80px' }}>

          {/* Page title */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '6px 16px',
                fontSize: 12,
                color: 'var(--accent)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              ✦ Бесплатно · Без регистрации
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 42, fontWeight: 600, marginBottom: 12 }}>
              Примерка мебели Т▪И▪К
            </h1>
            <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 520, margin: '0 auto' }}>
              AI расставит выбранную мебель в вашем пространстве за 3–8 минут.
            </p>
          </div>

          {/* Progress indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 56 }}>
            {(['demo', 'select', 'upload', 'processing', 'result'] as Step[]).map((s, i) => {
              const labels: Record<Step, string> = {
                demo: 'Демо',
                select: 'Выбор',
                upload: 'Фото',
                processing: 'AI',
                result: 'Результат',
              };
              const currentIdx = ['demo', 'select', 'upload', 'processing', 'result'].indexOf(step);
              const isActive = s === step;
              const isDone = i < currentIdx;
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: isDone ? 'var(--accent)' : isActive ? 'var(--accent)' : 'var(--surface)',
                        border: `2px solid ${isDone || isActive ? 'var(--accent)' : 'var(--border)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                        color: isDone || isActive ? '#fff' : 'var(--muted)',
                        transition: 'all 0.3s',
                      }}
                    >
                      {isDone ? '✓' : i + 1}
                    </div>
                    <div style={{ fontSize: 11, color: isActive ? 'var(--accent)' : 'var(--muted)', fontWeight: isActive ? 600 : 400 }}>
                      {labels[s]}
                    </div>
                  </div>
                  {i < 4 && (
                    <div
                      style={{
                        width: 48,
                        height: 2,
                        backgroundColor: i < currentIdx ? 'var(--accent)' : 'var(--border)',
                        margin: '0 4px',
                        marginBottom: 18,
                        transition: 'background-color 0.3s',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── STEP: DEMO ── */}
          {step === 'demo' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  Демо-режим
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
                  Вот как это выглядит
                </h2>
                <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 32 }}>
                  Слева — терраса клиента в Подмосковье. AI расставил комплект «Сингапур» и кресла «Кейптаун», подобрав масштаб и освещение. Результат за 4 минуты.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button
                    onClick={() => setStep('select')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      backgroundColor: 'var(--accent)',
                      color: '#fff',
                      padding: '14px 28px',
                      borderRadius: 32,
                      fontSize: 16,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    ✦ Примерить в моём пространстве
                  </button>
                  <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
                    Бесплатно · Без регистрации · 3–8 минут
                  </p>
                </div>
              </div>

              {/* Demo visual */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #8B6F47 0%, #5A3E28 100%)',
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 80 }}>🛋️</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 12, fontWeight: 500 }}>
                      Комплект «Сингапур» на вашей террасе
                    </div>
                  </div>

                  {/* Demo badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: 16,
                    }}
                  >
                    📍 Терраса Алексея, Подмосковье
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: 16,
                    }}
                  >
                    ⏱ 4 минуты
                  </div>
                </div>

                {/* Guarantee note */}
                <div
                  style={{
                    marginTop: 16,
                    backgroundColor: 'var(--surface)',
                    borderRadius: 16,
                    padding: '14px 20px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 20 }}>🛡️</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                      Не понравится результат — переделаем бесплатно
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      Наш дизайнер доработает вашу примерку вручную
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: SELECT PRODUCT ── */}
          {step === 'select' && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, marginBottom: 8 }}>
                  Выберите мебель для примерки
                </h2>
                <p style={{ fontSize: 15, color: 'var(--muted)' }}>
                  Нажмите на карточку, чтобы выбрать. Можно выбрать комплект.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                {PRODUCTS.map((product) => {
                  const icon =
                    product.category === 'sofas' ? '🛋️'
                    : product.category === 'tables' ? '🪵'
                    : product.category === 'sunbeds' ? '🌅'
                    : product.category === 'sets' ? '✦'
                    : '🪑';
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      style={{
                        borderRadius: 16,
                        border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                        backgroundColor: isSelected ? 'var(--surface)' : '#fff',
                        padding: 16,
                        cursor: 'pointer',
                        transition: 'all 0.18s',
                        position: 'relative',
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </div>
                      )}
                      <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{product.categoryLabel}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{product.name}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
                        {formatPrice(product.priceFrom)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setStep('demo')}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 24,
                    fontSize: 15,
                    fontWeight: 500,
                    border: '1.5px solid var(--border)',
                    backgroundColor: 'transparent',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  ← Назад
                </button>
                <button
                  onClick={() => selectedProduct && setStep('upload')}
                  disabled={!selectedProduct}
                  style={{
                    padding: '12px 28px',
                    borderRadius: 24,
                    fontSize: 15,
                    fontWeight: 600,
                    border: 'none',
                    backgroundColor: selectedProduct ? 'var(--accent)' : 'var(--border)',
                    color: selectedProduct ? '#fff' : 'var(--muted)',
                    cursor: selectedProduct ? 'pointer' : 'not-allowed',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s',
                  }}
                >
                  Далее — загрузить фото →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP: UPLOAD ── */}
          {step === 'upload' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
                  Загрузите фото вашего пространства
                </h2>

                {selectedProduct && (
                  <div
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderRadius: 14,
                      padding: '12px 16px',
                      marginBottom: 24,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ fontSize: 24 }}>
                      {selectedProduct.category === 'sofas' ? '🛋️' : selectedProduct.category === 'tables' ? '🪵' : '🪑'}
                    </span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedProduct.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{formatPrice(selectedProduct.priceFrom)}</div>
                    </div>
                    <button
                      onClick={() => setStep('select')}
                      style={{
                        marginLeft: 'auto',
                        fontSize: 12,
                        color: 'var(--accent)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Изменить
                    </button>
                  </div>
                )}

                {/* Upload zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed var(--border)',
                    borderRadius: 20,
                    padding: '48px 32px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'var(--surface)',
                    transition: 'border-color 0.2s',
                    marginBottom: 24,
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                    Нажмите, чтобы выбрать фото
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
                    или перетащите файл сюда
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    JPEG, PNG, HEIC · минимум 800×600 пикселей
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>

                <button
                  onClick={() => setStep('demo')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted)',
                    fontSize: 14,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  ← Вернуться к демо
                </button>
              </div>

              {/* Tips */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                  Советы для лучшего результата
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { icon: '☀️', text: 'Снимайте при дневном свете — утром или вечером' },
                    { icon: '📐', text: 'Покажите всю зону — где планируете поставить мебель' },
                    { icon: '📱', text: 'Фото с телефона подходят — без штатива' },
                    { icon: '🌿', text: 'Уберите крупные объекты из кадра если мешают' },
                    { icon: '🔍', text: 'Чем светлее фото — тем точнее результат AI' },
                  ].map((tip, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: '12px 16px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{tip.icon}</span>
                      <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP: PROCESSING ── */}
          {step === 'processing' && (
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, marginBottom: 12 }}>
                  AI работает над вашей примеркой
                </h2>
                <p style={{ fontSize: 16, color: 'var(--muted)' }}>
                  Обычно занимает 3–8 минут. Не закрывайте вкладку.
                </p>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRadius: 24,
                  padding: '32px 36px',
                  border: '1px solid var(--border)',
                  marginBottom: 32,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                    {PROGRESS_STEPS[progressStep]?.label}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
                    {Math.round(progressPct)}%
                  </span>
                </div>

                {/* Bar */}
                <div
                  style={{
                    height: 8,
                    backgroundColor: 'var(--border)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPct}%`,
                      backgroundColor: 'var(--accent)',
                      borderRadius: 8,
                      transition: 'width 0.12s linear',
                    }}
                  />
                </div>

                {/* Step dots */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {PROGRESS_STEPS.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: i <= progressStep ? 'var(--accent)' : 'var(--border)',
                          transition: 'background-color 0.3s',
                        }}
                      />
                      <span style={{ fontSize: 11, color: i <= progressStep ? 'var(--accent)' : 'var(--muted)' }}>
                        {i + 1}/4
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip card */}
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  padding: '24px 28px',
                  border: '1px solid var(--border)',
                  marginBottom: 24,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Пока ждёте
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, fontFamily: 'Playfair Display, serif', marginBottom: 10 }}>
                  {PROGRESS_STEPS[progressStep]?.tip}
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {PROGRESS_STEPS[progressStep]?.tipBody}
                </p>
              </div>

              {/* Selected product reminder */}
              {selectedProduct && (
                <div
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderRadius: 14,
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: 24 }}>🛋️</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Примеряем: {selectedProduct.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{formatPrice(selectedProduct.priceFrom)} · {selectedProduct.warrantyYears} лет гарантии</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP: RESULT ── */}
          {step === 'result' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 20,
                    padding: '6px 16px',
                    fontSize: 13,
                    color: '#16a34a',
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  ✓ Готово! Ваша примерка готова
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 600, marginBottom: 8 }}>
                  Вот как выглядит{selectedProduct ? ` ${selectedProduct.name}` : ' мебель ТИК'} у вас
                </h2>
                <p style={{ fontSize: 16, color: 'var(--muted)' }}>
                  Поделитесь результатом или задайте вопрос консультанту
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
                {/* Result image */}
                <div>
                  <div
                    style={{
                      borderRadius: 24,
                      overflow: 'hidden',
                      background: uploadedPhoto
                        ? `url(${uploadedPhoto}) center/cover`
                        : 'linear-gradient(135deg, #8B6F47, #5A3E28)',
                      height: 480,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {!uploadedPhoto && (
                      <div style={{ textAlign: 'center', color: '#fff' }}>
                        <div style={{ fontSize: 80 }}>🛋️</div>
                        <div style={{ fontSize: 16, marginTop: 12, fontWeight: 500 }}>Ваша примерка</div>
                      </div>
                    )}
                    {/* Overlay label */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: 16,
                      }}
                    >
                      ✦ AI Примерка Т▪И▪К
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                    <button
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 600,
                        backgroundColor: '#25D366',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      📲 WhatsApp
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 600,
                        backgroundColor: '#229ED9',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      ✈️ Telegram
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '12px 20px',
                        borderRadius: 20,
                        fontSize: 14,
                        fontWeight: 600,
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text)',
                        border: '1.5px solid var(--border)',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      🔗 Скопировать ссылку
                    </button>
                  </div>
                </div>

                {/* Right panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Product info */}
                  {selectedProduct && (
                    <div
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: '20px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{selectedProduct.categoryLabel}</div>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                        {selectedProduct.name}
                      </h3>
                      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                        {formatPrice(selectedProduct.priceFrom)}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
                        до {formatPrice(selectedProduct.priceTo)}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>
                        {selectedProduct.material}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                        {selectedProduct.climateZones.map((z) => (
                          <span
                            key={z}
                            style={{
                              fontSize: 11,
                              color: 'var(--accent)',
                              backgroundColor: 'var(--surface)',
                              padding: '3px 10px',
                              borderRadius: 12,
                              border: '1px solid var(--border)',
                            }}
                          >
                            {z}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA: ask consultant */}
                  <Link
                    href="/chat"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#fff',
                      padding: '16px 20px',
                      borderRadius: 20,
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'block',
                    }}
                  >
                    Задать вопрос по этому комплекту
                  </Link>

                  {/* CTA: showroom */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderRadius: 20,
                      padding: '20px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Хочу в шоурум</div>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
                      Запишитесь на осмотр — потрогаете тик, увидите цвет вживую
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        style={{
                          padding: '10px 14px',
                          borderRadius: 12,
                          border: '1.5px solid var(--border)',
                          fontSize: 14,
                          fontFamily: 'Inter, sans-serif',
                          outline: 'none',
                          backgroundColor: '#fff',
                          color: 'var(--text)',
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Телефон"
                        style={{
                          padding: '10px 14px',
                          borderRadius: 12,
                          border: '1.5px solid var(--border)',
                          fontSize: 14,
                          fontFamily: 'Inter, sans-serif',
                          outline: 'none',
                          backgroundColor: '#fff',
                          color: 'var(--text)',
                        }}
                      />
                      <button
                        style={{
                          padding: '12px',
                          borderRadius: 12,
                          fontSize: 14,
                          fontWeight: 600,
                          backgroundColor: 'var(--text)',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        Записаться
                      </button>
                    </div>
                  </div>

                  {/* Try again */}
                  <button
                    onClick={reset}
                    style={{
                      padding: '12px',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 500,
                      backgroundColor: 'transparent',
                      color: 'var(--muted)',
                      border: '1.5px solid var(--border)',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    ↩ Попробовать другую мебель
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
