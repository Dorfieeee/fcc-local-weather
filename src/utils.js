export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const epochToTime = (seconds) =>
  new Intl.DateTimeFormat(navigator.language, { timeStyle: "short" }).format(
    new Date(seconds * 1000)
  );
