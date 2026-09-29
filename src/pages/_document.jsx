import { Html, Head, Main, NextScript } from 'next/document';

// The "js" class lets CSS hide reveal targets only when scripting is available (content stays visible without JS).
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function Document(props) {
  const locale = props.__NEXT_DATA__?.props?.pageProps?.locale === 'en' ? 'en' : 'tr';
  return (
    <Html lang={locale}>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
