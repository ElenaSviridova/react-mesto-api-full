// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://domainname.students.nomoredomains.club',
  'http://api.sviridova.students.nomoredomains.club',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  // const requestHeaders = req.headers['access-control-request-headers'];

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // res.header('Access-Control-Allow-Origin', '*');

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // const requestHeaders = 'content-type, application/json';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // res.status(200).send();
    // return;
  }
  next();
};
