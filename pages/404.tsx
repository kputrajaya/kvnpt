import ErrorPage from '../components/error_page';

export default function Custom404() {
  return <ErrorPage code={404} title="Not Found" message="Page does not exist." />;
}
