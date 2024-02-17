import { Project } from "../../contracts"

type ProjectListProps = {
  projects: Project[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div>
      {projects.map((p) => (
        <div>{p.projectName}</div>
      ))}
    </div>
  )
}

export { ProjectList }
