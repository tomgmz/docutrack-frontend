import { toast, Id } from 'react-toastify';

const error = (message: string, customId: Id | null = null) => {
  toast.error(message, {
    toastId: customId || message,
  });
};

const success = (message: string, customId: Id | null = null) => {
  toast.success(message, {
    toastId: customId || message,
  });
};

const info = (message: string, customId: Id | null = null) => {
  toast.info(message, {
    toastId: customId || message,
  });
};

const warn = (message: string, customId: Id | null = null) => {
  toast.warn(message, {
    toastId: customId || message,
  });
};

const customToast = {
  error,
  success,
  info,
  warn,
  // this wrapper doesn't include the base toast() call,
  // only the specific types.
};

export default customToast;