import type { Metadata } from "next";
import "./globals.css";
import "./cabinet.css";

export const metadata: Metadata = {
  title: "ГрадоАналитик — закрытый кабинет анализа участков",
  description:
    "Закрытый MVP-кабинет для одного пользователя: участки, документы, версии ПЗЗ, предварительный анализ и отчёты.",
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
