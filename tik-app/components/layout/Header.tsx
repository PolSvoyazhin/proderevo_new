'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Проекты' },
    { href: '/catalog', label: 'Каталог' },
  ];

  return (
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

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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

          {/* CTA buttons */}
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
      </div>
    </header>
  );
}
