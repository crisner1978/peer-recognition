import { DefaultToastOptions } from 'react-hot-toast'

export const toastStyles: DefaultToastOptions = {
  style: {
    marginTop: 35,
    marginRight: 16,
    fontSize: 13,
    fontWeight: 500,
    padding: 16,
    borderRadius: 6,
    maxWidth: 356,
    minWidth: 296,
    
  },
  className: 'z-50 ',
  success: {
    style: {
      backgroundColor: 'var(--success-bg)',
      color: 'var(--success-text)',
      borderColor: 'var(--success-border)',
    },
    duration: 3000,
  },
  error: {
    style: {
      backgroundColor: 'var(--error-bg)',
      color: 'var(--error-text)',
      borderColor: 'var(--error-border)',
    },
    duration: 3000,
  },
}
