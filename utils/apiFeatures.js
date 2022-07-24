class APIFeatures {
  constructor(query, queryString) {
    //query est Tour.find()
    // queryString est req.query
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(this.queryString, queryObj);

    //* 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj); // on recupere queryObj qui est une copie de req.query (object), on le stringify en json pour pouvoir le manipuker et remplacer des caracteres, puis on le parse en object pour le passer en parametre de la fonction qui recherche
    queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      console.log(fields);

      this.query = this.query.select(fields); // on veut recuperer que les propiete dans fields fiels='price ratings name'
    } else {
      this.query = this.query.select('-__v'); // le moins fait l'inverse , il exclue le __v
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    // page 1 : 1-10, page 2 : 11-20, page 3 : 21-30
    this.query = this.query.skip(skip).limit(limit); // si on veut page 2 on skip 10 query
    return this;
  }
}

module.exports = APIFeatures;
