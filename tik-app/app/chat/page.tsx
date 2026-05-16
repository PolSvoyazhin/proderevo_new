'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  isTyping?: boolean;
};

const QUICK_QUESTIONS = [
  'Какой тик лучше для Подмосковья?',
  'Чем отличается Grade A от Grade B?',
  'Как ухаживать за тиковой мебелью зимой?',
  'Сколько стоит комплект для террасы?',
  'Подходит ли тик для Урала?',
  'Что входит в гарантию 15 лет?',
];

const AI_RESPONSES: Record<string, string> = {
  'default': 'Хороший вопрос. Если вы уточните детали — размер пространства, регион, что именно планируете поставить — смогу ответить точнее. Или передам Анне — она специалист по подбору комплектов.',
  'подмосковье': 'Для Подмосковья термоясень, Ироко и тик подходят отлично — выдерживают до −40°C без растрескивания. Рекомендую раз в сезон наносить масло Burma. Со временем цвет перейдёт в серебристо-серый — это нормальное патинирование, не повреждение.',
  'grade': 'Grade A — высший сорт: равномерный цвет, минимум сучков, влажность 12%, без расслоений. Вся коллекция Т▪И▪К производится только из материалов класса A — термоясень, Ироко и тик высшей селекции.',
  'уход': 'Уход минимальный: раз в год протрите маслом Burma — занимает 20–30 минут. Зимой можно накрыть чехлами или оставить под открытым небом — дерево это выдержит. Не нужно заносить в дом.',
  'цена': 'Диван «Джакарта» 3-местный — от 390 000 руб. Кресло «Кейптаун» — от 155 000. Комплект «Сингапур» (диван + 2 кресла + стол) — от 780 000 руб. Шезлонг «Сочи» — от 98 000. Все цены включают доставку по России.',
  'урал': 'Да, термоясень, Ироко и тик отлично работают на Урале и в Сибири. Температурный диапазон −40°C до +50°C. Единственная рекомендация — раз в год наносить масло Burma до наступления зимы. Клиенты из Екатеринбурга уже 5+ лет используют без нареканий.',
  'гарантия': 'Гарантия 15 лет — без условий. Заменим или отремонтируем любую деталь бесплатно. Гарантия не аннулируется при смене владельца. На монолитные столешницы — 20 лет. Всё это прописано в договоре.',
};

function getAIResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('подмосков') || lower.includes('москв')) return AI_RESPONSES['подмосковье'];
  if (lower.includes('grade') || lower.includes('грейд') || lower.includes('сорт')) return AI_RESPONSES['grade'];
  if (lower.includes('уход') || lower.includes('зим') || lower.includes('масл')) return AI_RESPONSES['уход'];
  if (lower.includes('цен') || lower.includes('стоит') || lower.includes('стоим')) return AI_RESPONSES['цена'];
  if (lower.includes('урал') || lower.includes('сибир') || lower.includes('екатер')) return AI_RESPONSES['урал'];
  if (lower.includes('гарант')) return AI_RESPONSES['гарантия'];
  return AI_RESPONSES['default'];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: 'Здравствуйте! Я консультант по коллекции Т▪И▪К. Отвечу на вопросы о материалах, уходе, размерах, гарантии и подборе мебели под ваше пространство. Спросите — отвечу честно и конкретно.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Typing indicator
    const typingId = 'typing-' + Date.now();
    setMessages((prev) => [...prev, { id: typingId, role: 'assistant', text: '', isTyping: true }]);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const response = getAIResponse(text);
    setMessages((prev) =>
      prev
        .filter((m) => m.id !== typingId)
        .concat({ id: Date.now().toString(), role: 'assistant', text: response })
    );
    setIsLoading(false);

    // After 3 user messages — suggest lead form
    const userMsgCount = messages.filter((m) => m.role === 'user').length + 1;
    if (userMsgCount >= 3 && !showLeadForm) {
      setTimeout(() => setShowLeadForm(true), 600);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            width: '100%',
            padding: '0 24px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Page header */}
          <div
            style={{
              padding: '40px 0 24px',
              borderBottom: '1px solid var(--border)',
              marginBottom: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Consultant avatar */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), #5A3E28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                👩
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600 }}>
                    Анна · Консультант Т▪И▪К
                  </h1>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      padding: '3px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      color: '#16a34a',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                    Онлайн
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                  AI знает весь каталог · Если не знаю — передам Анне, она ответит за 15 минут
                </p>
              </div>
              <Link
                href="/tryout"
                style={{
                  marginLeft: 'auto',
                  padding: '9px 18px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                ✦ Попробовать Примерку
              </Link>
            </div>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minHeight: 400,
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 10,
                  alignItems: 'flex-end',
                }}
              >
                {msg.role === 'assistant' && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent), #5A3E28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    👩
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '70%',
                    padding: msg.isTyping ? '14px 18px' : '14px 18px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: msg.role === 'user' ? 'var(--accent)' : '#fff',
                    color: msg.role === 'user' ? '#fff' : 'var(--text)',
                    fontSize: 15,
                    lineHeight: 1.6,
                    border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {msg.isTyping ? (
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center', height: 20 }}>
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent)',
                            animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {/* Lead form after 3 messages */}
            {showLeadForm && (
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRadius: 20,
                  padding: '24px',
                  border: '1px solid var(--border)',
                  marginTop: 8,
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                  Хотите поговорить с живым специалистом?
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
                  Анна — старший консультант — ответит на сложные вопросы и подберёт комплект под ваш участок.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="tel"
                    placeholder="Ваш телефон"
                    style={{
                      flex: 1,
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
                      padding: '10px 20px',
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      backgroundColor: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Перезвоните мне
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div style={{ paddingBottom: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Частые вопросы
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      backgroundColor: '#fff',
                      color: 'var(--text)',
                      border: '1.5px solid var(--border)',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 16,
              paddingBottom: 32,
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Задайте вопрос о мебели, материалах, уходе..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: 28,
                  border: '1.5px solid var(--border)',
                  fontSize: 15,
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  backgroundColor: '#fff',
                  color: 'var(--text)',
                  transition: 'border-color 0.2s',
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  padding: '14px 24px',
                  borderRadius: 28,
                  fontSize: 15,
                  fontWeight: 600,
                  backgroundColor: input.trim() && !isLoading ? 'var(--accent)' : 'var(--border)',
                  color: input.trim() && !isLoading ? '#fff' : 'var(--muted)',
                  border: 'none',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {isLoading ? '...' : 'Отправить →'}
              </button>
            </form>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
              AI отвечает по каталогу ТИК · Для сложных вопросов — живой специалист за 15 минут
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
