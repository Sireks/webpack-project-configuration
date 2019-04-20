/**
 *
 * Working with text
 *
 * */
export function cutString(content, symbLimit) {
  if (content.length > symbLimit) {
    return (content.substring(0, symbLimit) + "... ");
  } else {
    return content;
  }
}


/**
 *
 * Cookies
 *
 * */
export function setCookie(name, value, options) {
  options = options || {
    path: '/'
  };

  let expires = options.expires;

  if (typeof expires == "number" && expires) {
    let date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    options.expires = date.toUTCString();
  } else {
    let date = new Date;
    date.setDate(date.getDate() + 365 * 5);
    options.expires = date.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += ";" + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  });
}

/**
 *
 * Timeouts
 *
 * */
export function customTimeout(func, delay = 500) {
  let timeout;

  setCusomTimeout(func);

  function setCusomTimeout(func) {
    timeout = setTimeout(function () {
      func();
      clearCustomTimeout();
    }, delay);
  }

  function clearCustomTimeout() {
    clearTimeout(timeout);
  }
}

/**
 *
 * Url
 *
 * */
export function getAbsolutePath() {
  return window.location.protocol + '//' + window.location.hostname;
}