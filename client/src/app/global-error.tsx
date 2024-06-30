'use client';
import '@/styles/global.css';
import Error from 'next/error';
import Image from 'next/image'


export default function GlobalErrorPage(props: {
  error: Error & { digest?: string };
  params: { locale: string };
}) {

  return (
    <html lang={props.params?.locale}>
      <body style={{ background: '#001f2f' }}>
        <div className="flex flex-col items-center justify-center pt-32">
          {/* <Logo uri="/assets/images/logo-white.png" /> */}
          <Image
            className='mt-16'
            src={"/assets/images/500.png"}
            alt=""
            width={100}
            height={100}
          />
          {/* <GlobalError/> */}
        </div>
      </body>
    </html>
  );
}
