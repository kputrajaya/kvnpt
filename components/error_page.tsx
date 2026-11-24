import { ErrorPageProps } from '../utils/types';
import BackButton from './back_button';
import Seo from './seo';

export default function ErrorPage({ code, title, message }: ErrorPageProps) {
  return (
    <>
      <Seo title={title} description={message} noindex />

      <div className="-my-8 flex h-screen items-center justify-center py-8">
        <div className="text-center">
          <div className="text-5xl font-semibold">{code}</div>
          <h1 className="my-4 text-lg">{message}</h1>
          <BackButton href="/" />
        </div>
      </div>
    </>
  );
}
