// const fs = require('fs');
const express = require('express');
// const { stringify } = require('querystring');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//! 1) MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// middleware milieu entre le client et serveur , ajoute a la requete la data(que.body) que l'on veut envoyer
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// ce middlware s'execute a chaque requete
app.use((req, res, next) => {
  console.log('Hello from the middleware 😃');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//!
// const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
// );

//*=========== Get Tours===============
// const getAllTours = (req, res) => {
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

//*=========== Get Tour By ID ===============
// const getTour = (req, res) => {
//   console.log(req.params);
//   console.log(+req.params.id); // ou * 1 pour convertir en int
//   const id = +req.params.id;
//   const tour = tours.find((el) => el.id === id);

//   // if (id > tours.length)
//   if (!tour) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// };
// app.get('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);
//   console.log(+req.params.id); // ou * 1 pour convertir en int
//   const id = +req.params.id;
//   const tour = tours.find((el) => el.id === id);

//   // if (id > tours.length)
//   if (!tour) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

//*========== ADD A TOUR ============

// const createTour = (req, res) => {
//   // console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   // on aurai pu faire req.body.id = newId mais on veut pas muter notre objet , on en cree un nouveau
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// res.send('Done');
// };
// app.post('/api/v1/tours', (req, res) => {
//   // console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   // on aurai pu faire req.body.id = newId mais on veut pas muter notre objet , on en cree un nouveau
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//     );
//     // res.send('Done');
//   });

//*============= UPDATE A TOUR =============

// const updateTour = (req, res) => {
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     dat: {
//       tour: '<updated tour here>',
//     },
//   });
// };

// app.patch('/api/v1/tours/:id', (req, res) => {
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     dat: {
//       tour: '<updated tour here>',
//     },
//   });
// });
//*============ DELETE =============
// const deleteTour = (req, res) => {
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   //204 pour no content
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };

// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };
// const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };
// const createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };
// const updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };
// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

//! ROUTES
//*simple
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
//*Mounting the routers
// const tourRouter = express.Router();
// const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// //* chaining routes with app.route
// app.route('/api/v1/users').get(getAllUsers).post(createUser);
// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

// app.delete('/api/v1/tours/:id', (req, res) => {
//   if (+req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   //204 pour no content
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

//*=========== LISTEN =============
// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

module.exports = app;
