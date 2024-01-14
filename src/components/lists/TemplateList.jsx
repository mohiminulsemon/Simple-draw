import { React, useEffect, useRef, useState } from 'react';
import { IconButton, TemplateCard, TemplateSkeleton } from '..';
import { windowSize } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTemplatesQuery } from '../../services/templateApi';
import { updateTemplates } from '../../features/templateSlice';
import { Link } from 'react-router-dom';
import { routes } from '../../utils/routes';

function TemplateList() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const screen = useSelector((state) => state.persist.appReducer.screen);
  const templates = useSelector((state) => state.templateReducer.templates);

  const templatesQuery = useGetTemplatesQuery();
  const dispatch = useDispatch();

  // scroll variables
  const templateListDiv = useRef();
  const scrollOffset = 300; // scroll offset
  const [scrollStart, setScrollStart] = useState(0); // scroll start
  const [scrollEnd, setScrollEnd] = useState(9999); // scroll end
  const [scrollPosition, setScrollPosition] = useState(0); // current scroll position

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleScroll = (offset) => {
    const position = templateListDiv.current.scrollLeft + offset;
    const end = templateListDiv.current.scrollWidth - templateListDiv.current.clientWidth;

    templateListDiv.current.scrollLeft = position;
    setScrollEnd(end);
    setScrollPosition(position);
  };

  /**
   * while template query is success
   * update templates state
   */
  useEffect(() => {
    if (templatesQuery.isSuccess) {
      dispatch(updateTemplates(templatesQuery.data));
    }
  }, [templatesQuery.data]);

  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div
      className="w-full h-[280px] dark:bg-zinc-700 bg-zinc-100 
    rounded-md relative"
    >
      {/* header */}
      <div className="flex justify-between items-center p-4 ">
        <div className="font-semibold text-lg truncate">テンプレートから始める</div>

        {screen?.x > windowSize.md ? (
          <Link
            to={routes.template}
            className="text-sm text-indigo-500 dark:text-indigo-300 cursor-pointer 
              hover:underline hover:text-indigo-700 hover:dark:text-indigo-400 "
          >
            すべてのテンプレート
          </Link>
        ) : (
          <Link to={routes.template}>
            <IconButton size="20px" icon={<i className="fa-solid fa-ellipsis"></i>} />
          </Link>
        )}
      </div>

      {/* list */}
      <div
        style={{ scrollBehavior: 'smooth' }}
        className="w-full overflow-y-hidden overflow-x-auto no-scrollbar"
        ref={templateListDiv}
      >
        {templatesQuery?.isLoading ? (
          // loading skeleton
          <div className="inline-flex space-x-2  w-auto px-2 mb-4 ">
            <TemplateSkeleton />
            <TemplateSkeleton />
            <TemplateSkeleton />
            <TemplateSkeleton />
            <TemplateSkeleton />
            <TemplateSkeleton />
          </div>
        ) : (
          // template data
          <div className="inline-flex space-x-2 w-auto px-2 mb-4">
            {templates?.map((template, index) => (
              <div key={index} className="w-[150px] h-[200px] ">
                <TemplateCard templateData={template} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* scroll buttons */}
      {
        /**
         * left scroll button
         * only render while current scroll position
         * is not equal scroll start position
         */
        scrollPosition > scrollStart && (
          <div
            onClick={(e) => handleScroll(-scrollOffset)}
            className="dark:bg-zinc-700 bg-cyan-50 w-[30px] h-[30px] 
          absolute top-[140px] left-0 rounded-full ms-1 
          flex justify-center items-center cursor-pointer 
          hover:dark:bg-zinc-600 hover:bg-indigo-200"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        )
      }

      {
        /**
         * right scroll button
         * only render while current scroll position
         * is smaller than scroll end position
         */
        scrollPosition < scrollEnd && (
          <div
            onClick={(e) => handleScroll(scrollOffset)}
            className="dark:bg-zinc-700 bg-cyan-50 w-[30px] h-[30px] 
          absolute top-[140px] right-0 rounded-full me-1 
          flex justify-center items-center cursor-pointer 
          hover:dark:bg-zinc-600 hover:bg-indigo-200"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        )
      }
    </div>
  );
}

export default TemplateList;
