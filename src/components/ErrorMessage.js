const ErrorMessage = ({ error_id, error_name, error_message }) => {
  return (
    <p className='error'>
      It looks like there was a {error_id} network error... since: "{error_name}{' '}
      - {error_message}"
    </p>
  );
};

export default ErrorMessage;
