export function validateRequired(value) {
  if (value == null || value.trim().length === 0) {
    return { error: true, message: '必須項目です。' };
  }
  return { error: false };
}

export function validateLength(value, options = { min: 1, max: 10}) {
  if (value == null) {
    return { error: true };
  }
  const length = value.length;
  if (options.min <= length && length <= options.max) {
    return { error: false };
  } else {
    return { error: true, message: `文字数を${options.min}以上${options.max}以下にしていください。` };
  }
}

export function validateEmail(value) {
  const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value)) {
    return { error: true, message: 'Emailの形式で入力してください。' };
  }
  return { error: false };
}

export function validateConfirm(value, confirmValue) {
  if (value == null || confirmValue == null) {
    return { error: true };
  }
  if (value !== confirmValue) {
    return { error: true, message: 'パスワードが一致しません。' };
  }
  return { error: false };
}