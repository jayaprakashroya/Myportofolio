import ProjectCard from './ProjectCard';

const projectData = [
	{
		title: 'Student Performance Dashboard',
		description:
			'React & Tableau dashboard for 500+ records: fast data viz and improved reporting.',
		link: 'https://github.com/jayaprakashroya/student-dashboard',
	},
	{
		title: 'Online Bookstore',
		description:
			'Full-stack bookstore app with login, CRUD, and REST API integration.',
		link: 'https://github.com/jayaprakashroya/online-bookstore',
	},
	{
		title: 'Portfolio Website',
		description:
			'Responsive site built with React and accessibility features; supports dark/light mode.',
		link: 'https://github.com/jayaprakashroya/portfolio',
	},
];

const Projects = () => (
	<section className="projects">
		<h1>My Projects</h1>
		<h2 className="section-title">Featured Projects</h2>
		{projectData.map((project, index) => (
			<ProjectCard key={index} {...project} />
		))}
	</section>
);

export default Projects;
