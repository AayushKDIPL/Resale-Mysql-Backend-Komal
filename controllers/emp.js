// controllers/EmployeeController.js
import Employee from '../models/emp.js';

const EmployeeController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { rows: employees, count: totalEmployees } = await Employee.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: employees,
        totalEmployees,
        hasNextPage: offset + limit < totalEmployees,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) throw new Error('Employee not found');
      return res.status(200).json({ message: employee });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { employee_name } = req.body;
      console.log('Incoming data:', employee_name);

      const employee = await Employee.create({ employee: employee_name });
      return res.status(200).json({ message: 'Employee added successfully', employee, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) throw new Error('Invalid call');
      await employee.destroy();
      return res.status(200).json({ message: 'Deleted Successfully', status: true });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default EmployeeController;
