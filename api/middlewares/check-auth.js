module.exports = (req, res, next) => {
  console.log(req.headers.authorization.split(" ")[1]);
  if (!req.currentUser) return res.status(401).send({ message: "Niste Autentikovani!" });

  next();
};
