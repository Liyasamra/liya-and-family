import type { Metadata } from "next";
import "./globals.css";
import "./learn/learning-fonts.css";

export const metadata: Metadata = {
  title: "Ewket Kids — Free Learning",
  description: "Free preschool through sixth-grade learning activities, practice, and family routines.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}

