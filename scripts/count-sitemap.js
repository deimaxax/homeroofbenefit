const fs = require('fs');

const data = fs.readFileSync('data/dynamic_cities.json', 'utf8');
const lines = data.trim().split('\n');
const allCities = lines.map(l => JSON.parse(l));

const stateMap = {
  'Texas': 'texas',
  'Colorado': 'colorado',
  'Oklahoma': 'oklahoma',
  'Kansas': 'kansas',
  'Nebraska': 'nebraska',
  'Missouri': 'missouri',
  'Florida': 'florida',
  'Minnesota': 'minnesota',
  'Illinois': 'illinois',
};

const articleSlugs = [
  'free-roof-inspection-guide',
  'hail-damage-roof-replacement',
  'roofing-benefits-guide-2025',
  'storm-damage-claims',
  'home-restoration-tips',
];

const seenCityUrls = new Set();
const seenCountyUrls = new Set();
let cityCount = 0;
let countyCount = 0;
let cityArticleCount = 0;
const stateBreakdown = {};

allCities.forEach(item => {
  const stateSlug = stateMap[item.state];
  if (stateSlug && item.city) {
    const citySlug = item.city.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const cityUrl = '/state/' + stateSlug + '/' + citySlug;
    
    // Add city
    if (!seenCityUrls.has(cityUrl)) {
      seenCityUrls.add(cityUrl);
      cityCount++;
      cityArticleCount += 5; // 5 articles per city
      stateBreakdown[stateSlug] = (stateBreakdown[stateSlug] || 0) + 1;
    }
    
    // Add county separately
    if (item.county) {
      const countyUrl = cityUrl + '/county';
      if (!seenCountyUrls.has(countyUrl)) {
        seenCountyUrls.add(countyUrl);
        countyCount++;
      }
    }
  }
});

const staticPages = 8; // home, benefitform, articles, privacy, terms, contact, about, + root
const statePages = 9;
const genericArticles = 5;
const stateArticles = 9 * 5; // 9 states × 5 articles

console.log('=== FULL SITEMAP ANALYSIS ===\n');
console.log('Static pages:', staticPages);
console.log('State pages:', statePages);
console.log('Generic article pages:', genericArticles);
console.log('State article pages:', stateArticles, '(9 states × 5 articles)');
console.log('City pages:', cityCount);
console.log('City article pages:', cityArticleCount, `(${cityCount} cities × 5 articles)`);
console.log('County pages:', countyCount);
console.log('\n=== TOTAL URL COUNT ===');
const total = staticPages + statePages + genericArticles + stateArticles + cityCount + cityArticleCount + countyCount;
console.log('TOTAL:', total.toLocaleString(), 'URLs');
console.log('\n=== Breakdown by Category ===');
console.log('Core pages:', staticPages + statePages + genericArticles);
console.log('State articles:', stateArticles);
console.log('City pages:', cityCount);
console.log('City articles:', cityArticleCount);
console.log('County pages:', countyCount);
console.log('\n=== Cities By State ===');
Object.entries(stateBreakdown).sort((a,b) => b[1] - a[1]).forEach(([state, count]) => {
  console.log(`${state}: ${count} cities (${count * 5} articles)`);
});
