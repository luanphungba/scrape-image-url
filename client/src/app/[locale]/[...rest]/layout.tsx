import '@/styles/global.css';
// import { Logo } from "@/components_bk/Logo"
import { NextIntlClientProvider, useMessages } from 'next-intl';

export const metadata = {
  title: 'Next.js',
  description: 'Scrape Media',
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: string };
}) {

  // Using internationalization in Client Components
  const messages = useMessages();
  return (
    <html lang={params.locale}>
      <body style={{ background: '#001f2f' }}>
        <NextIntlClientProvider
          locale={params.locale}
          messages={messages}      >
          <div className="flex flex-col items-center justify-center pt-32">
            {children}
          </div>
        </NextIntlClientProvider>

      </body>
    </html>
  )
}
