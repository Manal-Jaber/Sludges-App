import deleteImage from 'renderer/assets/delete-icon.svg';
export const insertLabel = (
  e: any,
  LabelId: number,
  setLabelId: React.Dispatch<React.SetStateAction<number>>,
  setTextMarker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // X and Y coordinates relative to the boundary of the circle
  const xBound = e.nativeEvent.offsetX;
  const yBound = e.nativeEvent.offsetY;
  setTextMarker(false);
  const label = document.createElement('textarea');
  label.className = 'text-label';
  label.value = '';

  const deleteIcon = document.createElement('img') as HTMLImageElement;
  deleteIcon.src = deleteImage;
  deleteIcon.addEventListener('click', () =>
    removeLabel(`label-container${LabelId}`)
  );

  const labelContainer = document.createElement('div');
  labelContainer.id = `label-container${LabelId}`;
  labelContainer.className = 'label-container';
  labelContainer.style.top = yBound + 'px';
  labelContainer.style.left = xBound + 'px';
  labelContainer.appendChild(label);
  labelContainer.appendChild(deleteIcon);
  document.querySelector('#circle-wrapper')?.appendChild(labelContainer);
  setLabelId((prev) => prev++);
};

export const removeLabel = (id: string) => {
  document.querySelector(id)?.remove();
};
