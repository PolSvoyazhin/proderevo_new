import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Т▪И▪К — Премиальная тиковая мебель для вашего пространства",
  description: "Примерьте premium outdoor мебель ТИК в вашем саду или на террасе — бесплатно, с помощью AI-визуализации. Бренд ПРО ДЕРЕВО.",
  keywords: "тиковая мебель, outdoor мебель, садовая мебель, примерка мебели, ПРО ДЕРЕВО",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
