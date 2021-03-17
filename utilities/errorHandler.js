exports.errorHandler = (message, next, status = 500) => {
	const error = new Error(message);
	error.status = status;
	next(error);
}