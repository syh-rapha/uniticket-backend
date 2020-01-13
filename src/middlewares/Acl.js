import AclModel from '../models/acl';

export default async (req, res, next) => {
  const acl = await AclModel.find();
  const parsedUrl = req['_parsedUrl'];

  for (let i = 0; i < acl.length; i += 1) {
    if (parsedUrl.pathname.includes(acl[i].route)) {
      for (let j = 0; j < acl[i].method.length; j += 1) {
        if (acl[i].method[j] === req.method) {
          for (let k = 0; k < acl[i].authorized.length; k += 1) {
            if (acl[i].authorized[k] === req.role) {
              return next();
            }
          }
        }
      }
    }
  }
  return res.sendStatus(403);
};
