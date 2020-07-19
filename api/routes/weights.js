const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/weight', (req, res, next) => {
    let date = new Date(req.body.Date);
    db.query(
      'INSERT INTO life_tracker.weights (ID, UserID, Weight, Date, Note , EatingLog, Sport) VALUES (?,?,?,?,?,?,?)',
      [ '0' , req.body.UserID , req.body.Weight , date, req.body.Note, req.body.EatingLog , req.body.Sport],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  router.get('/weights/:UserID', function (req, res, next) {
    db.query(
      'SELECT * FROM life_tracker.weights WHERE UserID=? ORDER BY date ',
      [req.params.UserID],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          console.log(results);
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/weight/:Date/:UserId', function (req, res, next) {
    db.query(
      'SELECT * FROM life_tracker.weights WHERE UserID=? AND Date=?',
      [req.params.UserId, req.params.Date],
      (error, results) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/weight/:ID', function (req, res, next) {
    db.query(
      'UPDATE life_tracker.weights SET UserID=?, Note=?, Weight=? , EatingLog=? , Sport=?  WHERE UserID=? AND ID=? ',
      [req.body.UserID, req.body.Note, req.body.Weight, req.body.EatingLog, req.body.Sport, req.body.UserID , req.params.ID ],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/weight/:ID/:UserID', function (req, res, next) {
    db.query(
      'DELETE FROM life_tracker.weights WHERE UserID=? AND ID=? ',
      [req.params.UserID , req.params.ID],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });


  return router;
}



module.exports = createRouter;
