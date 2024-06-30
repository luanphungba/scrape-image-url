export const dynamic = 'force-dynamic' 
import '@/styles/global.css';
import './layout.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { NextIntlClientProvider, useMessages } from 'next-intl';

import { ConfigProvider } from 'antd';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <body style={{background: '#f0f9fe'}}>
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  // borderRadius: 2,
                  // lineHeight: 3.25,
                  controlHeight: 42,
                },
                Select: {
                  controlHeight: 42,
                },
                Button: {
                  controlHeight: 48,
                  colorPrimary: '#0089D6',
                  colorPrimaryHover: '#0089D6',
                  colorPrimaryActive: '#0089D6',
                  colorPrimaryText: '#ffffff',
                  borderRadius: 4,
                  fontFamily: 'Noto Sans JP',
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 18
                }
              },
            }}
          >
            <AntdRegistry>
              {props.children}
            </AntdRegistry>
          </ConfigProvider>
        
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
