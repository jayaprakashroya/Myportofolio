
const ProjectCard = ({ title, description, link }) => (
  <div className="project-card">
    <h2>{title}</h2>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="view-btn">View Project</button>
    </a>
  </div>
);

export default ProjectCard;
