const formatResponse = (data) => {
	return {
		...data,
		id: data._id,
	}
}

module.exports = {formatResponse}
