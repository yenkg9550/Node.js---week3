const handleSuccess = (res, data) => {
  res.send({
    status: true,
    data
  })
  res.end();
}

const handleError = (res, err) => {
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = "欄位未填寫正確";
  }
  res.status(400).send({
    status: true,
    message
  })
  res.end();
}

module.exports = { handleSuccess, handleError }