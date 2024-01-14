import React from 'react';
import { IconButton, LoadingIconButton } from '..';
import { useDispatch } from 'react-redux';
import { openTemplateDetailModal } from '../../features/templateSlice';

function TemplateMenuModal({ onClose = () => {} }) {
  const dispatch = useDispatch();

  const handleDetialModalOpen = () => {
    onClose();
    dispatch(openTemplateDetailModal());
  };

  return (
    <div
      className="animate-scale-in-center w-full h-full p-1 
    bg-zinc-200 dark:bg-zinc-600 rounded-sm"
    >
      {/* detail button */}
      <IconButton
        onClick={handleDetialModalOpen}
        label="詳細"
        icon={<i className="fa-solid fa-paperclip"></i>}
      />

      {/* delete button */}
      <LoadingIconButton label="削除" icon={<i className="fa-regular fa-trash-can"></i>} />
    </div>
  );
}

export default TemplateMenuModal;
