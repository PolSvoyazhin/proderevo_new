'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Проекты' },
    { href: '/catalog', label: 'Каталог' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(250, 250, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: 'var(--accent)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'serif' }}>Т</span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--text)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Т▪И▪К
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginTop: -2 }}>
                  ПРО ДЕРЕВО
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="m-hide" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--muted)',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <div style={{ marginLeft: 8, display: 'flex', gap: 8 }}>
              <Link
                href="/tryout"
                style={{
                  padding: '8px 18px',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  transition: 'background-color 0.2s',
                }}
              >
                Примерка
              </Link>
              <Link
                href="/chat"
                style={{
                  padding: '8px 18px',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--accent)',
                  border: '1.5px solid var(--accent)',
                  transition: 'all 0.2s',
                }}
              >
                Консультант
              </Link>
            </div>
          </nav>

          {/* Mobile: CTA + burger */}
          <div className="m-flex" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <Link
              href="/tryout"
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                color: '#fff',
              }}
            >
              Примерка
            </Link>
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Меню"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: '1.5px solid var(--border)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {isOpen ? (
                <span style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1 }}>✕</span>
              ) : (
                <>
                  <span style={{ width: 18, height: 2, backgroundColor: 'var(--text)', borderRadius: 2, display: 'block' }} />
                  <span style={{ width: 18, height: 2, backgroundColor: 'var(--text)', borderRadius: 2, display: 'block' }} />
                  <span style={{ width: 14, height: 2, backgroundColor: 'var(--text)', borderRadius: 2, display: 'block' }} />
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(250,250,248,0.98)',
            backdropFilter: 'blur(16px)',
            zIndex: 49,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            gap: 8,
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 16,
                  fontSize: 18,
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'Playfair Display, serif',
                  backgroundColor: isActive ? 'var(--surface)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link
              href="/tryout"
              onClick={() => setIsOpen(false)}
              style={{
                padding: '16px 24px',
                borderRadius: 24,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              ✦ Бесплатная Примерка
            </Link>
            <Link
              href="/chat"
              onClick={() => setIsOpen(false)}
              style={{
                padding: '16px 24px',
                borderRadius: 24,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                backgroundColor: 'transparent',
                color: 'var(--accent)',
                border: '1.5px solid var(--accent)',
                textAlign: 'center',
              }}
            >
              Консультант
            </Link>
          </div>

          <div style={{ marginTop: 'auto', fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
            Т▪И▪К · ПРО ДЕРЕВО · Новороссийск
          </div>
        </div>
      )}
    </>
  );
}
