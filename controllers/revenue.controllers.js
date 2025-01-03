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

function getWeekDates(date) {
    const startDate = getMonday(date);
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        return day.toISOString().split('T')[0];
    });
    return weekDates;
}

function getMonday(date) {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(currentDate.setDate(diff));
    return monday;
}

const getWeeklyRevenue = async (req, res) => {
    const { date } = req.params;
    try {
        const weekDates = getWeekDates(date);
        const weeklyRevenue = {};

        for (let i = 0; i < weekDates.length; i++) {
            const day = weekDates[i];

            const orderForms = await OrderForm.findAll({
                where: { date_created: day },
                attributes: ['total_price']
            });

            const importForms = await ImportForm.findAll({
                where: { date_created: day },
                attributes: ['total_price']
            });

            const liquidationForms = await LiquidationForm.findAll({
                where: { date_created: day },
                attributes: ['total_price']
            });

            const orderPrice = orderForms.reduce((sum, form) => sum + form.total_price, 0);
            const importPrice = importForms.reduce((sum, form) => sum + form.total_price, 0);
            const liquidationPrice = liquidationForms.reduce((sum, form) => sum + form.total_price, 0);
            const dailyRevenue = orderPrice - importPrice + liquidationPrice;

            weeklyRevenue[i + 1] = dailyRevenue;
        }

        res.status(200).json(weeklyRevenue);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getDailyRevenue,
    getWeeklyRevenue,
}