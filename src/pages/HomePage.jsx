import React from 'react';
import { ProtectedRoute, CreateProjectButton, TemplateList, ProjectList } from '../components';

function HomePage() {
  return (
    <ProtectedRoute>
      <div className="w-full p-5 text-zinc-600 dark:text-zinc-100">
        {/* title */}
        <div className="text-xl md:text-2xl font-semibold">Home Title</div>

        <div className="w-full mx-auto md:flex md:space-x-7 space-y-2 md:space-y-0 my-5">
          {/* create project button */}
          <CreateProjectButton />

          <div className="w-[300px] rounded-md h-[60px] bg-green-300">Button 1</div>
        </div>

        {/* template list */}
        <TemplateList />

        {/* project list */}
        <ProjectList />
      </div>
    </ProtectedRoute>
  );
}

export default HomePage;
