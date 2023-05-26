export const getMockPoints = () => ([
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1000,
    dateFrom: '2019-03-12T11:22:15.375Z',
    dateTo: '2019-07-12T13:22:18.375Z',
    destination: 'Amsterdam',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'taxi'
  },
  {
    id: 'test-id1',
    basePrice: 5000,
    dateFrom: '2019-07-12T14:55:55.845Z',
    dateTo: '2019-07-12T17:02:03.375Z',
    destination: 'Chamonix',
    isFavorite: true,
    offers: [
      'test-offer-1',
      'test-offer-2'
    ],
    type: 'sightseeing'
  },
  {
    id: 'test-id2',
    basePrice: 20,
    dateFrom: '2019-07-12T18:55:55.845Z',
    dateTo: '2019-07-12T23:02:03.375Z',
    destination: 'Alaska',
    isFavorite: true,
    offers: [
    ],
    type: 'flight'
  },
]);
