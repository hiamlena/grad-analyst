import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ГрадоАналитик — ИИ-анализ земельного участка",
  description:
    "Предварительный ИИ-анализ земельного участка перед строительством: документы, риски, ограничения и рекомендации.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
