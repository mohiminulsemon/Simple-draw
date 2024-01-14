import { React, useEffect } from 'react';
import { ProjectCard, ProjectSkeleton } from '..';
import { useGetProjectsQuery } from '../../services/projectApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjects } from '../../features/projectSlice';

function ProjectList() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const projectsQuery = useGetProjectsQuery();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectReducer.projects);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  /**
   * while project query is success
   * update project state
   */
  useEffect(() => {
    if (projectsQuery.isSuccess) {
      dispatch(updateProjects(projectsQuery.data));
    }
  }, [projectsQuery.data]);

  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div className="my-5 truncate font-semibold">
      {/* title */}
      あなたのプロジェクト
      {/* list */}
      {projectsQuery.isLoading ? (
        // loading skeleton
        <div className="grid grid-cols-6 gap-3 mt-3">
          <div className="col-span-6 md:col-span-3 lg:col-span-2 h-[300px]">
            <ProjectSkeleton />
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2 h-[300px]">
            <ProjectSkeleton />
          </div>
        </div>
      ) : (
        // project data
        <div className="grid grid-cols-6 gap-3 mt-3">
          {projects?.map((data, index) => (
            <div
              key={index}
              className="col-span-6 md:col-span-3 lg:col-span-2 h-[300px] bg-zinc-50 dark:bg-zinc-800 rounded-md relative"
            >
              <ProjectCard projectData={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
