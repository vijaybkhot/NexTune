import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientApolloProvider from "@/components/ClientApolloProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexTune",
  description:
    "Full-stack music metadata management platform with artist, album, and track search, built with Next.js, GraphQL, and Redis.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-50">
      <body
        className={`
    ${geistSans.variable} ${geistMono.variable}
    antialiased
    bg-gray-50
    text-gray-900
     min-h-screen
  `}
      >
        <ClientApolloProvider>
          <main className="max-w-full mx-auto px-4 py-8 bg-gray-50">
            {children}
          </main>
        </ClientApolloProvider>
      </body>
    </html>
  );
}
