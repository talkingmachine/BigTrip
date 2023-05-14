export const getMockOffers = () => ([
  {
    type: 'taxi',
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Switch to comfort',
        price: 70
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 'test-offer-1',
        title: 'Add luggage',
        price: 111
      },
      {
        id: 'test-offer-2',
        title: 'Rent a car',
        price: 538
      },
      {
        id: 'undef-offer',
        title: 'test-3st-offer-title',
        price: 666
      }
    ]
  },
]);
