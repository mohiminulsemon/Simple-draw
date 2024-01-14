import React, { useEffect } from 'react';
import { useGetTemplatesQuery } from '../../services/templateApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateTemplates } from '../../features/templateSlice';
import { ProjectSkeleton, TemplateCardV2 } from '..';

function TemplateListV2() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const templateQuery = useGetTemplatesQuery();
  const dispatch = useDispatch();

  const templates = useSelector((state) => state.templateReducer.templates);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  /**
   * while template query is success
   * update template state
   */
  useEffect(() => {
    if (templateQuery.isSuccess) {
      dispatch(updateTemplates(templateQuery.data));
    }
  }, [templateQuery.data]);
  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div className="">
      {/* list */}
      {templateQuery.isLoading ? (
        // loading skeleton
        <div className="grid grid-cols-4 gap-3 mt-3">
          <div className="col-span-4 md:col-span-2 lg:col-span-1 h-[300px]">
            <ProjectSkeleton />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 h-[300px]">
            <ProjectSkeleton />
          </div>
        </div>
      ) : (
        // template data
        <div className="grid grid-cols-4 gap-3 mt-3">
          {templates?.map((data, index) => (
            <div
              key={index}
              className="col-span-4 md:col-span-2 lg:col-span-1 h-[300px]
            bg-zinc-50 dark:bg-zinc-800 rounded-md"
            >
              <TemplateCardV2 templateData={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TemplateListV2;
