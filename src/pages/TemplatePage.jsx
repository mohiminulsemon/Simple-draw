import React from 'react';
import {
  CreateTemplateButton,
  DeleteTemplateButton,
  ProtectedRoute,
  TemplateExportButton,
  TemplateImportButton,
  TemplateListV2
} from '../components';

function TemplatePage() {
  return (
    <ProtectedRoute>
      <div className="w-full p-5 text-zinc-600 dark:text-zinc-100">
        {/* title */}
        <div className="text-xl md:text-2xl font-semibold">テンプレート一覧</div>

        {/* buttons */}
        <div className="w-full mx-auto flex flex-wrap my-5 gap-2">
          <TemplateImportButton />
          <TemplateExportButton />
          <CreateTemplateButton />
          <DeleteTemplateButton />
        </div>

        {/* list */}
        <TemplateListV2 />
      </div>
    </ProtectedRoute>
  );
}

export default TemplatePage;
