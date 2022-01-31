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

  const deleteIcon = document.createElement('button') as HTMLButtonElement;
  deleteIcon.innerText = 'x';
  // deleteIcon.style.padding = '1rem';
  deleteIcon.style.position = 'relative';
  deleteIcon.style.cursor = 'pointer';
  deleteIcon.style.width = '16px';
  deleteIcon.style.height = '16px';
  deleteIcon.style.lineHeight = '16px';
  deleteIcon.style.padding = '0.5rem';
  deleteIcon.style.display = 'flex';
  deleteIcon.style.justifyContent = 'center';
  deleteIcon.style.alignItems = 'center';
  deleteIcon.style.pointerEvents = 'all';
  deleteIcon.style.border = 'none';
  deleteIcon.style.borderRadius = '50%';
  deleteIcon.style.background = 'var(--dark-brown-primary)';
  deleteIcon.style.color = 'var(--light-brown-primary)';
  deleteIcon.addEventListener('click', () => {
    removeLabel(`label-container${LabelId}`);
  });

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
  document.getElementById(id)?.remove();
};
