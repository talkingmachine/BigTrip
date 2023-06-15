export function getEventEditDatalist(destinations) {
  return (`
  <datalist id="destination-list-1">
    ${destinations.map((destination) =>
      `<option value="${destination.name}">${destination.name}</option>>
    `).join('')}
  </datalist>`
  );
}

