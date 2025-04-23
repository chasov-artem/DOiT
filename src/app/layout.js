import { Providers } from "@/components/Providers/Providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DOiT Test",
  description: "Test task for DOiT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
