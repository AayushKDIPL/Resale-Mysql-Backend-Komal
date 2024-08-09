import Project from '../models/project.js';

const projectController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const { count: totalProjects, rows: projects } = await Project.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      });

      res.status(200).send({
        success: true,
        message: projects,
        totalProjects,
        hasNextPage: offset + limit < totalProjects,
        hasPreviousPage: page > 1,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  getProduct: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) throw new Error("Project not found");
      return res.status(200).json({ message: project });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { project_name } = req.body;

      // Log the incoming data for debugging
      console.log('Incoming data:', project_name);

      // Validate and create project
      const project = await Project.create({
        project: project_name,
      });

      return res.status(200).json({ message: 'Project added successfully', project, status: 'ok' });
    } catch (err) {
      console.log('Error:', err);
      res.status(400).json({ message: err.message, status: 'error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) throw new Error("Invalid call");
      await Project.destroy({ where: { id: req.params.id } });

      return res.status(200).json({ message: "Deleted Successfully", status: true });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },
};

export default projectController;
