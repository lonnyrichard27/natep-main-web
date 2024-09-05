export const stringRegex =
  /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;

export const numberRegex = /^[0-9]*\.?[0-9]+$/;

export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export const lettersNumRegex = /^[A-Za-z0-9\s]*$/;

export const urlRegex =
  /^(https?:\/\/)?((([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+)(:[0-9]+)?@)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}\.){3}\d{1,3}|(\[[0-9a-fA-F:.]+\]))(:[0-9]+)?(\/([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})*)*(\?([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})*)?$/;
