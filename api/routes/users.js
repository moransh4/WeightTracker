const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.get('/person/:ID', function (req, res, next) {
    db.query(
      'SELECT * FROM life_tracker.users_details WHERE Id=?',
      [req.params.ID],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });

  router.post('/userDetails', (req, res, next) => {
    db.query(
      'INSERT INTO life_tracker.users_details (ID, FirstName, LastName, Gender , Age, Height, Weight, SportsLevel, JobTitle) VALUES (?,?,?,?,?,?,?,?,?)',
      [ req.body.ID, req.body.FirstName , req.body.LastName, req.body.Gender, req.body.Age, req.body.Height, req.body.Weight, req.body.SportsLevel, req.body.JobTitle ],
      (error, results) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/person/:ID', function (req, res, next) {
    db.query(
      'UPDATE life_tracker.users_details SET Height=?, Weight=? , Age=? , FirstName=?, LastName=? , Gender=?, SportsLevel=?, JobTitle=?   WHERE ID=? ',
      [req.body.Height, req.body.Weight, req.body.Age, req.body.FirstName, req.body.LastName , req.body.Gender, req.body.SportsLevel, req.body.JobTitle, req.params.ID ],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/userDetails/:ID', function (req, res, next) {
    db.query(
      'DELETE FROM life_tracker.users_details WHERE ID=?',
      [req.params.ID],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/user/:ID', function (req, res, next) {
    db.query(
      'SELECT * FROM life_tracker.users WHERE Id=?',
      [req.params.ID],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });

  router.put('/user/:ID', function (req, res, next) {
    db.query(
      'UPDATE life_tracker.users SET UserName=?, Email=? , Password=?  WHERE ID=? ',
      [req.body.UserName, req.body.Email, req.body.Password, req.params.ID  ],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/user/authenticate', (req, res, next) => {
    db.query(
      'SELECT * FROM life_tracker.users WHERE UserName=? AND Password=? ',
      [  req.body.username , req.body.password ],
      (error, results) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/users', function (req, res, next) {
    db.query(
      'SELECT * FROM life_tracker.users',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.post('/user', (req, res, next) => {
    db.query(
      'INSERT INTO life_tracker.users (ID, UserName , Email, Password) VALUES (?,?,?,?)',
      [ req.body.ID ,  req.body.UserName , req.body.Email, req.body.Password],
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

  router.delete('/user/:ID', function (req, res, next) {
    db.query(
      'DELETE FROM life_tracker.users WHERE ID=?',
      [req.params.ID],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.post('/logs', (req, res, next) => {
    console.log(req.body);
    db.query(
      'INSERT INTO life_tracker.logs (ID, UserID, UserName, Action, Date) VALUES (?,?,?,?,?)',
      [ 0 , req.body.UserID,  req.body.UserName , req.body.Action, req.body.Date],
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

  return router;
}



module.exports = createRouter;
