import {useRouteError, isRouteErrorResponse} from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.message || 'Someting goes wrong'}</h2>
        <h3>{error.data.reason}</h3>
      </div>
    );
  }
  // return <div>Someting goes wrong</div>
  throw error;
};

export default ErrorPage;
