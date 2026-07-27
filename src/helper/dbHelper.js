class DbHelper {
  createData = async (model, data, bulkCreate) => {
    const responseData = bulkCreate
      ? await model.insertMany(data)
      : await model.create(data);

    return responseData;
  };

  getData = async (model, condition, findAll, attributes, populateFields = [], page = 1, limit = 10) => {
    if (findAll) {
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        select: attributes,
        populate: populateFields
      };

      const result = await model.paginate(condition, options);

      return {
        docs: result.docs,          
        pagination: {
          totalDocs: result.totalDocs, 
          totalPages: result.totalPages,
          currentPage: result.page,
          nextPage: result.hasNextPage ? result.nextPage : null,
          prevPage: result.hasPrevPage ? result.prevPage : null,
          pageSize: result.limit
        }
      };
    } else {
      return await model.findOne(condition).select(attributes).populate(populateFields);
    }
  };


  updateData = async (model, condition, data) => {
    return await model.update(data, {
      ...condition,
    });
  };

  deleteData = async (model, condition) => {
    return await model.delete({
      ...condition,
    });
  };
};

module.exports = new DbHelper();
