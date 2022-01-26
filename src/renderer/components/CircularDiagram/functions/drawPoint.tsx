export const drawPoint = (
  name: string,
  x: number,
  y: number,
  indicator: string,
  color?: string
) => {
  var svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  let newElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  let textElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );
  let myText = document.createTextNode(name);
  textElement.setAttribute('x', '5');
  textElement.setAttribute('y', '5');
  textElement.setAttribute('fill', color || '#A47A51');
  textElement.setAttribute('font-family', 'Verdana');
  textElement.setAttribute('font-size', '5');
  textElement.setAttribute('class', 'points-text');
  textElement.appendChild(myText);
  newElement.setAttribute(
    'fill',
    indicator === 'marker' ? 'none' : color || '#A47A51'
  );
  newElement.setAttribute('stroke', color || '#A47A51');
  newElement.setAttribute('strokeWidth', '1');
  newElement.setAttribute('cx', '2.5');
  newElement.setAttribute('cy', '2.5');
  newElement.setAttribute('r', '2');
  svgElement.appendChild(newElement);
  svgElement.appendChild(textElement);
  svgElement.setAttribute('x', String(x));
  svgElement.setAttribute('y', String(y));
  svgElement.setAttribute('height', '15');
  svgElement.setAttribute('width', '15');
  svgElement.setAttribute('id', name);
  document.querySelector('#circle')?.appendChild(svgElement);
};

export const removePoint = (id: string) => {
  document.querySelector(`#${id}`)?.remove();
};
