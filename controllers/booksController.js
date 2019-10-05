const booksController = (Book) => {
  const post = (req, res) => {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book.save();
    res.status(201);
    return res.json(book);
  };

  const get = (req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      const booksResult = books.map((book) => {
        const bookResult = book.toJSON();
        bookResult.links = {};
        bookResult.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return bookResult;
      });
      return res.json(booksResult);
    });
  };

  return { post, get };
};

module.exports = booksController;
