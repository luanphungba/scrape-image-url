export const getBaseUrl = () => {
  console.log('process.env.NEXT_PUBLIC_APP_URL  ', process.env.NEXT_PUBLIC_APP_URL)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};

export const getCountries = () => {
  return [
    { "locationName": "Tokyo", "country": "Japan", "price": 150000, "region": "Asia" },
    { "locationName": "New York", "country": "USA", "price": 200000, "region": "North America" },
    { "locationName": "Paris", "country": "France", "price": 180000, "region": "Europe" },
    { "locationName": "London", "country": "UK", "price": 190000, "region": "Europe" },
    { "locationName": "Berlin", "country": "Germany", "price": 175000, "region": "Europe" },
    { "locationName": "Sydney", "country": "Australia", "price": 190000, "region": "Australia" },
    { "locationName": "Toronto", "country": "Canada", "price": 180000, "region": "North America" },
    { "locationName": "Rome", "country": "Italy", "price": 160000, "region": "Europe" },
    { "locationName": "Barcelona", "country": "Spain", "price": 150000, "region": "Europe" },
    { "locationName": "Amsterdam", "country": "Netherlands", "price": 170000, "region": "Europe" },
    { "locationName": "Seoul", "country": "South Korea", "price": 160000, "region": "Asia" },
    { "locationName": "Shanghai", "country": "China", "price": 150000, "region": "Asia" },
    { "locationName": "Singapore", "country": "Singapore", "price": 160000, "region": "Asia" },
    { "locationName": "Bangkok", "country": "Thailand", "price": 130000, "region": "Asia" },
    { "locationName": "Dubai", "country": "UAE", "price": 180000, "region": "Asia" },
    { "locationName": "Moscow", "country": "Russia", "price": 140000, "region": "Europe" },
    { "locationName": "Istanbul", "country": "Turkey", "price": 130000, "region": "Europe" },
    { "locationName": "Cairo", "country": "Egypt", "price": 110000, "region": "Africa" },
    { "locationName": "Cape Town", "country": "South Africa", "price": 120000, "region": "Africa" },
    { "locationName": "Buenos Aires", "country": "Argentina", "price": 125000, "region": "South America" },
    { "locationName": "Santiago", "country": "Chile", "price": 130000, "region": "South America" },
    { "locationName": "Lima", "country": "Peru", "price": 120000, "region": "South America" },
    { "locationName": "Nairobi", "country": "Kenya", "price": 110000, "region": "Africa" },
    { "locationName": "Mumbai", "country": "India", "price": 90000, "region": "Asia" },
    { "locationName": "Kathmandu", "country": "Nepal", "price": 80000, "region": "Asia" },
    { "locationName": "Hanoi", "country": "Vietnam", "price": 100000, "region": "Asia" }
  ]
};

