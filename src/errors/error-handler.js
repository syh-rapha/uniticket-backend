class Error {
  getError(err, res) {
    if (err.name === 'ValidationError')
      res.status(422).json({ message: err.message });
    else if (err.table) res.status(500).json({ message: err.detail });
    else res.status(500).json(err);
    if (err.name !== 'ValidationError') console.log(err);
  }
}

export default new Error();
