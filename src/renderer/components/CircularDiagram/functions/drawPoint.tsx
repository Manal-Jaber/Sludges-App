export const drawPoint = (
  name: string,
  x: number,
  y: number,
  indicator: string,
  color?: string,
  alpha?: number
) => {
  var svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  let newElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  newElement.setAttribute(
    'fill',
    indicator === 'marker' ? 'none' : color || '#A47A51'
  );
  newElement.setAttribute('fillOpacity', `${alpha || 0}`);
  newElement.setAttribute('stroke', color || '#A47A51');
  newElement.setAttribute('strokeWidth', '1');
  newElement.setAttribute('cx', '2.5');
  newElement.setAttribute('cy', '2.5');
  newElement.setAttribute('r', '2');
  svgElement.appendChild(newElement);
  svgElement.setAttribute('x', String(x));
  svgElement.setAttribute('y', String(y));
  svgElement.setAttribute('height', '5');
  svgElement.setAttribute('width', '5');
  svgElement.setAttribute('id', name);
  document.querySelector('#circle')?.appendChild(svgElement);
};

export const removePoint = (id: string) => {
  document.querySelector(`#${id}`)?.remove();
};
