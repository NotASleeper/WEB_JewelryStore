const { OrderForm, ImportForm, LiquidationForm } = require('../models');

const getDailyRevenue = async (req, res) => {
    const { date } = req.params;
    try {
        const orderForm = await OrderForm.findAll({
            where: { date_created: date },
            attributes: ['total_price']
        });

        const importForm = await ImportForm.findAll({
            where: { date_created: date },
            attributes: ['total_price']
        });

        const liquidationForm = await LiquidationForm.findAll({
            where: { date_created: date },
            attributes: ['total_price']
        });

        const orderPrice = orderForm.reduce((sum, form) => sum + form.total_price, 0);
        const importPrice = importForm.reduce((sum, form) => sum + form.total_price, 0);
        const liquidationPrice = liquidationForm.reduce((sum, form) => sum + form.total_price, 0);
        const revenue = orderPrice - importPrice + liquidationPrice;

        res.status(200).json({ revenue: revenue });
    } catch (error) {
        res.status(500).send(error);
        throw error;
    }
};

module.exports = {
    getDailyRevenue,
}