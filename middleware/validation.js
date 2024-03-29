module.exports = function (req, res, next) {
  const { email, user, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    if (![email, user, password].every(Boolean)) {
      return res.status(403).json({ message: 'Missing Credentials' });
    } else if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials');
    } else if (!validEmail(email)) {
      return res.json('Invalid Email');
    }
  }

  next();
};
