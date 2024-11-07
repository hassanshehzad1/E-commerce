import jwt from "jsonwebtoken";
export const isLoggedIn = (req, res, next) => {
  try {
    // If their is not token exist
    if (!req.cookies.token) {
      req.flash("error", "User need to login first");
      return res.status(401).redirect("/index/login");
    }

    // Verify token
    jwt.verify(req.cookies.token, process.env.SECRET_JWT_KEY, (err, user) => {
      // Error
      if (err) {
        req.flash("error", "You are not authorized for this action");
        return res.status(403).redirect("/index/login");
      }
      req.user = user;
      next();
    });

    // Handling
  } catch (error) {
    req.status(500).send("Internal server error");
  }
};
