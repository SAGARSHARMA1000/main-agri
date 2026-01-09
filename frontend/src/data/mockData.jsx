export const INITIAL_LISTINGS = [
  { id: 1, commodity: 'Wheat (Sharbati)', quantity: '50 Quintal', price: 2850, location: 'Sehore, MP', seller: 'Ram Kishan', sellerId: 'f1', quality: 'Grade A', date: '2023-10-25' },
  { id: 2, commodity: 'Soybean', quantity: '100 Quintal', price: 4200, location: 'Ujjain, MP', seller: 'Vikram Singh', sellerId: 'f2', quality: 'Standard', date: '2023-10-26' },
  { id: 3, commodity: 'Basmati Rice', quantity: '200 Quintal', price: 6500, location: 'Karnal, Haryana', seller: 'Amit Agro', sellerId: 'f3', quality: 'Premium', date: '2023-10-26' },
  { id: 4, commodity: 'Mustard Seeds', quantity: '30 Quintal', price: 5400, location: 'Jaipur, Rajasthan', seller: 'Rajesh Kumar', sellerId: 'f4', quality: 'Grade B', date: '2023-10-24' },
];

export const INITIAL_PROPOSALS = [
  {
    id: 101,
    buyerId: 'b1',
    buyerName: 'Fresh Foods Ltd',
    listing: INITIAL_LISTINGS[0],
    price: 2800,
    quantity: '50 Quintal',
    date: '2023-11-05',
    status: 'pending',
    signatures: { farmer: false, buyer: false }
  },
  {
    id: 102,
    buyerId: 'b1',
    buyerName: 'Fresh Foods Ltd',
    listing: { ...INITIAL_LISTINGS[0], id: 99, commodity: 'Wheat (Old Stock)' },
    price: 2750,
    quantity: '20 Quintal',
    date: '2023-11-02',
    status: 'accepted',
    signatures: { farmer: true, buyer: false }
  }
];

export const MANDI_RATES = [
  { state: 'Madhya Pradesh', commodity: 'Wheat', min: 2100, max: 2900, trend: 'up' },
  { state: 'Maharashtra', commodity: 'Onion', min: 1200, max: 2500, trend: 'down' },
  { state: 'Punjab', commodity: 'Paddy', min: 2200, max: 2400, trend: 'stable' },
  { state: 'Gujarat', commodity: 'Groundnut', min: 5500, max: 6200, trend: 'up' },
];
