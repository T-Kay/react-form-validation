import _ from 'lodash';

function errorMessageCreater(errorType, target) {
  const result = [];
  if (!target.rejectedValue) {
    return;
  }
  if (errorType === 'Validation') {
      return { error: true, message: `${target.rejectedValue}は不正な値です。` };
  } else if (errorType === 'Duplicate') {
      return { error: true, message: `${target.rejectedValue}はすでに存在する値です。` };
  } else {
    return { message: 'この値は不正な値です。'};
  }
}

export function errorFilter(errors, key) {
  return _.map(errors,(errorType) => {
    const target = _.filter(errorType.params, { key });
    if (target.length > 0) {
      return errorMessageCreater(errorType.type, _.head(target));
    }
  });
}