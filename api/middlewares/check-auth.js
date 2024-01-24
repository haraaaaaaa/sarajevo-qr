module.exports = (req, res, next) => {
  if (!req.currentUser) return res.status(401).send({ message: "Niste Autentikovani!" });

  next();
};
