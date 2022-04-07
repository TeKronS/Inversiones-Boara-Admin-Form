const DATE_UNITS = {
  year: 31104000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

const getSecondsDiff = (timestamp) => (Date.now() - timestamp) / 1000;

const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "seconds") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
      return { value, unit };
    }
  }
};

const getTimeAgo = (timestamp, locale) => {
  const rtf = new Intl.RelativeTimeFormat(locale);

  const secondsElapsed = getSecondsDiff(timestamp);
  const { value, unit } = getUnitAndValueDate(secondsElapsed);

  return rtf.format(value, unit);
};

export const timeAgo = (timestamp) => {
  const locale = "es";
  const timeago = getTimeAgo(timestamp, locale);

  const date = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat().format(date);
  return {
    dateTime: formattedDate,
    timeago,
  };
};
