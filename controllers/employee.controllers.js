const { Op } = require('sequelize');
const { Employee, PositionEmployee, Account, EmployeeImage } = require('../models');
const uploadCloud = require('../middlewares/upload/cloudinary');

const createEmployee = async (req, res) => {
    uploadCloud.single('img')
    const {
        name,
        id_position,
        address,
        phone,
        email,
        birthday,
        status
    } = req.body;
    try {
        const newEmployee = await Employee.create({
            name,
            id_position,
            address,
            phone,
            email,
            birthday,
            status,
        });
        if (req.file) {
            const link_img = req.file.path;
            const newEmployeeImage = await EmployeeImage.create({
                id: newEmployee.id,
                url: link_img,
            });
        }
        res.status(201).send(newEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllEmployee = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const employeeList = await Employee.findAll({
                include: [
                    {
                        model: PositionEmployee,
                    },
                    {
                        model: Account,
                    }
                ],
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                    status: 1,
                }
            });
            res.status(200).send(employeeList);
        } else {
            const employeeList = await Employee.findAll({
                include: [
                    {
                        model: PositionEmployee,
                    },
                    {
                        model: Account,
                    }
                ],
                where: {
                    status: 1,
                }
            });
            res.status(200).send(employeeList);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getDetailEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const detailEmployee = await Employee.findOne({
            include: [
                {
                    model: PositionEmployee,
                },
                {
                    model: Account,
                }
            ],
            where: {
                id: id,
                status: 1,
            }
        });
        res.status(200).send(detailEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        id_position,
        address,
        phone,
        email,
        birthday,
    } = req.body;
    try {
        const detailEmployee = await Employee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailEmployee.name = name;
        detailEmployee.id_position = id_position;
        detailEmployee.address = address;
        detailEmployee.phone = phone;
        detailEmployee.email = email;
        detailEmployee.birthday = birthday;
        await detailEmployee.save();
        res.status(200).send(detailEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const detailEmployee = await Employee.findOne({
            where: {
                id: id,
                status: 1,
            }
        });
        detailEmployee.status = 0;
        await detailEmployee.save();
        res.status(200).send(detailEmployee);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createEmployee,
    getAllEmployee,
    getDetailEmployee,
    updateEmployee,
    deleteEmployee,
}
