const { Op } = require('sequelize');
const { OrderForm, ImportForm, LiquidationForm, OrderDetail, sequelize, Employee, Product } = require('../models');

//function
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


//api
const getDailyRevenue = async (req, res) => {
    const { date } = req.params;
    try {
        const orderForm = await OrderForm.findAll({
            where: { date_created: date, status: 1 },
            attributes: ['total_price']
        });

        const importForm = await ImportForm.findAll({
            where: { date_created: date, status: 1 },
            attributes: ['total_price']
        });

        const liquidationForm = await LiquidationForm.findAll({
            where: { date_created: date, status: 1 },
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

const getWeeklyRevenue = async (req, res) => {
    const { date } = req.params;
    try {
        const weekDates = getWeekDates(date);
        const weeklyRevenue = {};

        for (let i = 0; i < weekDates.length; i++) {
            const day = weekDates[i];

            const orderForms = await OrderForm.findAll({
                where: { date_created: day, status: 1 },
                attributes: ['total_price']
            });

            const importForms = await ImportForm.findAll({
                where: { date_created: day, status: 1 },
                attributes: ['total_price']
            });

            const liquidationForms = await LiquidationForm.findAll({
                where: { date_created: day, status: 1 },
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

const getBestSalesByWeek = async (req, res) => {
    const { date } = req.params
    const startDate = getMonday(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    try {
        const bestSales = await OrderDetail.findAll({
            attributes: [
                'id_product',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'total_quantity']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                status: 1
            },
            group: ['id_product'],
            order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
            limit: 4,
            include: {
                model: Product,
                attributes: ['name', 'price'] // Adjust based on what product details you need
            }
        });

        res.json(bestSales);
    } catch (error) {
        throw error;
        res.status(500).send(error);
    }
}

const getBestSellersByWeek = async (req, res) => {
    const { date } = req.params
    const startDate = getMonday(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    try {
        const topEmployees = await OrderForm.findAll({
            attributes: [
                'id_employee',
                [sequelize.fn('COUNT', sequelize.col('OrderForm.id')), 'total_orders'],
            ],
            where: {
                date_created: {
                    [Op.between]: [startDate, endDate],
                },
                status: 1
            },
            group: ['id_employee'],
            order: [[sequelize.literal('total_orders'), 'DESC']],
            limit: 4,
            include: [{
                model: Employee,
            }]
        });

        res.status(200).json(topEmployees);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getWeeklyBills = async (req, res) => {
    const { date } = req.params;
    const weekDates = getWeekDates(date);
    try {
        const weeklyBills = {};

        for (let i = 0; i < weekDates.length; i++) {
            const day = weekDates[i];
            const nextDay = new Date(day);
            nextDay.setDate(nextDay.getDate() + 1);
            const count = await OrderForm.count({
                where: {
                    date_created: {
                        [Op.gte]: new Date(day),
                        [Op.lt]: nextDay,
                    }
                },
            });
            weeklyBills[i + 1] = count;
        }

        res.status(200).json(weeklyBills);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getDailyRevenue,
    getWeeklyRevenue,
    getBestSalesByWeek,
    getBestSellersByWeek,
    getWeeklyBills,
}