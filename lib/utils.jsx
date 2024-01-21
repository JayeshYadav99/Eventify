import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const formatDateTime = (dateString) => {
  const dateTimeOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const dateOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDateTime = new Date(dateString).toLocaleString('en-US', dateTimeOptions);
  const formattedDate = new Date(dateString).toLocaleString('en-US', dateOptions);
  const formattedTime = new Date(dateString).toLocaleString('en-US', timeOptions);

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const formatPrice = (price) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return formattedPrice;
};

export function formUrlQuery({ params, key, value }) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export const handleError = (error) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

