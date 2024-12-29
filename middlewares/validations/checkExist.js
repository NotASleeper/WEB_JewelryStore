const checkExist = (Model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        const model = await Model.findOne({
            where: {
                id: id,
            }
        })
        if (model) {
            next();
        } else {
            res.status(404).send("Not found");
        }
    }
}

module.exports = {
    checkExist,
}