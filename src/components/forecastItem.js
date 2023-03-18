export default (props) => {
  const weatherComponent = `
    <div class="rounded-2xl bg-white relative flex flex-col px-4 py-2 justify-between items-center mr-4 last:mr-0">
    <span class="text-lg">${props.title}</span>
    <img src=${props.icon} alt="${props.alt}" title="${props.alt}" width="48" height="48">
    <span class="inline-flex gap-1">
      <span><span class="text-lg" data-value>${props.temp}</span><span data-unit>${props.tempUnit}</span></span>
      <span title="feels like" class="text-gray-400"><span class="text-lg" data-value>${props.feelsLike}</span><span data-unit>${props.tempUnit}</span></span>
    </span>
  </div>`;

  if (!props.newDay) return weatherComponent;

  // append a name of the new day to the left of the weather component
  return `
    <div class="flex flex-row items-center -ml-3 first:ml-0 mr-4 last:mr-0">
      <div class="-rotate-90 translate-x-12 translate-y-8 text-center w-6 h-full text-gray-400 text-xl mb-2 mr-2">${props.newDay}</div>
      ${weatherComponent}
    </div>
  `;
};
