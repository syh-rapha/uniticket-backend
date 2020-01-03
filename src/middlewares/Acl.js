const aclMap = {
  admin: ['/transactions', '/ingredientes', '/cardapio'],
  discente: ['/transactions'],
  servidor: ['/transactions'],
  visitante: ['/transactions'],
};
export default (req, res, next) => {
  const rotas = aclMap[req.role];

  for (let i = 0; i < rotas.length; i += 1) {
    if (rotas[i].includes(req.url)) return next();
  }

  return res.status(401).json({ error: 'Usuário sem autorização.' });
};
