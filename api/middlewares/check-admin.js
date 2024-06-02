module.exports = (req, res, next) => {
  console.log(req.headers.authorization.split(" ")[1]);
  if (req.currentUser.role !== "admin") return res.status(403).send({ message: "Niste Autorizovani!" });
  next();
};
