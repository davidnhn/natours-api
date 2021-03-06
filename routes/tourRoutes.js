const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

// app.use('/api/v1/tours', router);
// router.param('id', tourController.checkID); //* param middleware

//cretae a checkBody middleware function
//check if body contains the name and pricee property
//if not send back 400 'bas request)
//add it to the handler stack

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
