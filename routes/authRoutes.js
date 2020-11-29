module.exports = app => {

  app.get('/app/current_user', (req, res) => {
    res.send(req.user);
  });

}
