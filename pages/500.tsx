import ErrorPage from '../components/error_page';

export default function Custom500() {
  return <ErrorPage code={500} title="Server Error" message="Something went wrong." />;
}
