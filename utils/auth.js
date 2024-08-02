const withAuth = (req, res, next) => {
    // Takes the user to login page if trying to access something that needs you to log in to see
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;