import type { Metadata } from "next";
import "./globals.css";
import "./cabinet.css";
import "./plan.css";
import "./clean.css";

export const metadata: Metadata = {
  title: "ГрадоАналитик — закрытый кабинет анализа участков",
  description: "Закрытый MVP-кабинет для анализа земельных участков, документов, предварительных выводов и отчётов.",
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
