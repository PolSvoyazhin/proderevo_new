import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '48px 24px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}
          >
            Т▪И▪К
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 260 }}>
            Premium outdoor мебель из термоясеня, Ироко и тика. Бренд компании ПРО ДЕРЕВО. Производство Новороссийск. Гарантия 15 лет.
          </p>
        </div>

        {/* Links */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Навигация
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/', label: 'Проекты клиентов' },
              { href: '/catalog', label: 'Каталог мебели' },
              { href: '/tryout', label: 'Бесплатная Примерка' },
              { href: '/chat', label: 'Консультант' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Контакты
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="tel:+78001234567" style={{ fontSize: 14, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
              8 800 123-45-67
            </a>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Пн-Пт: 9:00–20:00 МСК</span>
            <div style={{ marginTop: 8 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span>✦</span>
                <span>FSC Сертификат</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          © 2026 ПРО ДЕРЕВО · Бренд Т▪И▪К · Тиковая мебель премиум класса
        </p>
      </div>
    </footer>
  );
}
