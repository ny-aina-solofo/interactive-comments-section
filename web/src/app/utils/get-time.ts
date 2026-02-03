export const getAgoTime = (time:number) => {
  let createdAt = new Date(time);
  let getMs = (new Date().getTime() - createdAt.getTime()) / 1000;
  let ago = "";

  // with less than 1 minute return sec ago
  if (getMs < 60) {
    ago = "seconde ago";

    // with less than 1 hour return mins
  } else if (getMs < 3600 && getMs > 60) {
    ago = Math.floor(getMs / 60) + " min ago";

    // with less than 1 day return hour 
  } else if (getMs < 86400 && getMs > 3600) {
    ago = Math.floor(getMs / 3600) + " hour ago";
  }

  // with less than 1 week  return day
  else if (getMs < 604800 && getMs > 86400) {
    ago = Math.floor(getMs / 86400) + " day ago";
  }

  // with less than 1 month return weeks
  else if (getMs < 2419200 && getMs > 604800) {
    ago = Math.floor(getMs / 604800) + " week ago";
  }

  // with less than 1 year return month
  else if (getMs < 31104000 && getMs > 2419200) {
    ago = Math.floor(getMs / 2419200) + " month ago";
  }

  // with more than 1 year return year
  else {
    ago = Math.floor(getMs / 3.154e7) + " year ago";
  }

  return ago;
};