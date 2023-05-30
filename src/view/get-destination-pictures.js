export function getDestinationPictures(pictures) {

  return (
    pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `).join('')
  );
}

