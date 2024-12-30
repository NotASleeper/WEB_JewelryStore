const checkExist = (Model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        const model = await Model.findOne({
            where: {
                id: id,
                status: 1
            }
        })
        if (model) {
            next();
        } else {
            res.status(404).send("Not found");
        }
    }
}

//Dùng cho các bảng có 2 khóa chính
const checkExistOrderDetail = (Model) => {
    return async (req, res, next) => {
        const { id_order, id_product } = req.params;
        const model = await Model.findOne({
            where: {
                id_order: id_order,
                id_product: id_product,
                status: 1
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
    checkExistOrderDetail,
}