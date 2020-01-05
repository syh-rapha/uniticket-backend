const aclMap = {
  admin: ['/transactions', '/ingredients', '/menu', '/users'],
  discente: ['/transactions'],
  servidor: ['/transactions'],
  visitante: ['/transactions'],
};
export default (req, res, next) => {
  const rotas = aclMap[req.role];

  for (let i = 0; i < rotas.length; i += 1) {
    if (req.originalUrl.includes(rotas[i])) return next();
  }
  return res.sendStatus(403);
};
