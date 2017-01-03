export default store => next => action => { // eslint-disable-line
  console.log(action);
  return next(action);
};
