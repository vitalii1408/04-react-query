import css from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message?: string
}

function ErrorMessage({
  message = 'Something went wrong. Please try again.',
}: ErrorMessageProps) {
  return <p className={css.text}>{message}</p>
}

export default ErrorMessage
