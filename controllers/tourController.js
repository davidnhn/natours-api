// const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures');
const Tour = require('../models/tourModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`This is id ${val}`);
//   if (val > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // try {
  //* BUILD THE QUERY
  //* 1A) Filltering
  /*
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj);
    //* 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj); // on recupere queryObj qui est une copie de req.query (object), on le stringify en json pour pouvoir le manipuker et remplacer des caracteres, puis on le parse en object pour le passer en parametre de la fonction qui recherche
    queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));
    */

  // const tours = await Tour.find()
  //   .where('duration')
  //   .equals(5)
  //   .where('difficulty')
  //   .equals('easy');
  // console.log(req.requestTime);

  //* 2) Sorting
  //sil y a propriete sort dans query
  /*
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    */
  //* 3) Field limiting
  /*
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      console.log(fields);

      query = query.select(fields); // on veut recuperer que les propiete dans fields fiels='price ratings name'
    } else {
      query = query.select('-__v'); // le moins fait l'inverse , il exclue le __v
    }
    */
  //* 4) Pagination
  /*
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    // page 1 : 1-10, page 2 : 11-20, page 3 : 21-30
    query = query.skip(skip).limit(limit); // si on veut page 2 on skip 10 query

    if (req.query.page) {
      const numTours = await Tour.countDocuments(query);
      if (skip >= numTours) throw new Error('This page does not exist');
    }
    */
  //* EXECUTE THE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  //* SEND RESPONSE
  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
  // } catch (err) {
  // res.status(404).json({
  //   status: 'fail',
  //   message: err,
  // });
  // }
});

exports.getTour = catchAsync(async (req, res, next) => {
  // try {
  const tour = await Tour.findById(req.params.id);

  // Tour.findOne({ _id : req.params.id })

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
  // console.log(req.params);
  // console.log(+req.params.id); // ou * 1 pour convertir en int
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);

  // if (id > tours.length)
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'Fail',
  //     message: 'Invalid ID',
  //   });
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
});

// exports.checkBody = (req, res, next) => {
//   if (!req.body.price || !req.body.name) {
//     return res.status(400).json({
//       status: 'Fail',
//       message: 'Bad Request',
//     });
//   }
//   next();
// };

exports.createTour = catchAsync(async (req, res, next) => {
  // try {
  // const newTour = new Tour({});
  // newTour.save();
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
  // } catch (err) {
  // res.status(400).json({
  //   status: 'fail',
  //   message: err,
  // });
  // }
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // on aurai pu faire req.body.id = newId mais on veut pas muter notre objet , on en cree un nouveau
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  // }
  // );
  // res.send('Done');
});

exports.updateTour = catchAsync(async (req, res, next) => {
  // try {
  const tour = await Tour.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
    // (err) => {
    //   if (err) {
    //     return next(new AppError('No tour found with that ID', 404));
    //   }
    // }
  );
  // if (+req.params.id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  // try {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  // if (+req.params.id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  //204 pour no content
  res.status(204).json({
    status: 'success',
    data: null,
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  // try {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        // _id: '$ratingsAverage',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: 'err',
  //   });
  // }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  // try {
  const { year } = req.params;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStart: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStart: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: 'err',
  //   });
  // }
});
