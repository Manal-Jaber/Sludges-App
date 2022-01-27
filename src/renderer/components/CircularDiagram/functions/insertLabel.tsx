export const insertLabel = (
  e: any,
  setTextMarker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // X and Y coordinates relative to the boundary of the circle
  const xBound = e.nativeEvent.offsetX;
  const yBound = e.nativeEvent.offsetY;
  setTextMarker(false);
  const label = document.createElement('textarea');
  label.value = '';
  //   label.type = 'text';
  label.className = 'text-label';
  label.style.top = yBound + 'px';
  label.style.left = xBound + 'px';
  document.querySelector('#circle-wrapper')?.appendChild(label);
  console.log(label);
};
