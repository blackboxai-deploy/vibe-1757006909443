import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCQ Chemistry Quiz",
  description: "Interactive chemistry quiz with 17 questions on chemical reactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}