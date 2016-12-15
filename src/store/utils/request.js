import _ from 'lodash';

export const assignDefaults = request => {
  if (typeof request === 'undefined') request = {};
  const headers = request.method === 'DELETE' ? request.headers || {} : _.merge({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cookie: document.cookie
  }, request.headers || {});

  var body = null;
  if (_.includes(['POST', 'PUT'], request.method)) {
    if (request.body) {
      body = JSON.stringify(request.body);
    } else {
      body = request.body;
    }
  }

  const other = {
    method: 'GET',
    redirect: 'follow'
  };

  return _.merge(
    other,
    request,
    { headers },
    { body }
  );
};
