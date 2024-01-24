module.exports = (req, res, next) => {
  if (req.currentUser.role !== "admin") return res.status(403).send({ message: "Niste Autorizovani!" });

  next();
};
