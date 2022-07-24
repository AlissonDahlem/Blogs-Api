module.exports = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'missingFields':
      res.status(400).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    case 'EmailAlreadyInUse':
      res.status(409).json({ message });
      break;
    case 'userDoesNotExist':
      res.status(404).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};