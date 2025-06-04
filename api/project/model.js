const db = require('../../data/dbConfig');

function getAll() {
  return db('projects').select('*').then(projects =>
    projects.map(proj => ({
      ...proj,
      project_completed: proj.project_completed === 1 ? true : false
    }))
  );
}

async function add(project) {
  const [id] = await db('projects').insert({
    project_name: project.project_name,
    project_description: project.project_description || null,
    project_completed: project.project_completed ? 1 : 0
  });
  return getById(id);
}

function getById(project_id) {
  return db('projects').where({ project_id }).first().then(proj => {
    if (!proj) return null;
    return {
      ...proj,
      project_completed: proj.project_completed === 1 ? true : false
    };
  });
}

module.exports = {
  getAll,
  add,
  getById,
};
