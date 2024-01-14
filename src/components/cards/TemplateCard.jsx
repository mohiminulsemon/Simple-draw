import React from 'react';

function TemplateCard({ templateData }) {
  return (
    <div className="w-full h-full">
      <img className="w-full h-full" src={templateData?.thumbnail} alt="thumbnail" loading="lazy" />
    </div>
  );
}

export default TemplateCard;
