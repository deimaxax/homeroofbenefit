// Script to process dynamic_cities.json into a usable format
// Run manually if needed: node scripts/process-cities.js

const fs = require('fs');
const path = require('path');

// Read the NDJSON file (newline-delimited JSON)
const rawData = fs.readFileSync(
  path.join(__dirname, '../dynamic_cities.json'), 
  'utf-8'
);

const lines = rawData.trim().split('\n');
const cities = [];

lines.forEach(line => {
  try {
    const parsed = JSON.parse(line);
    // Only include if it has both city and state
    if (parsed.city && parsed.state) {
      cities.push(parsed);
    }
  } catch (e) {
    console.error('Failed to parse line:', line);
  }
});

console.log(`Parsed ${cities.length} cities`);

// Group by state
const byState = {};
cities.forEach(item => {
  const state = item.state.toLowerCase().replace(/\s+/g, '-');
  if (!byState[state]) {
    byState[state] = {
      name: item.state,
      cities: []
    };
  }
  
  // Create URL-friendly city slug
  const citySlug = item.city.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  // Avoid duplicates
  if (!byState[state].cities.some(c => c.slug === citySlug)) {
    byState[state].cities.push({
      name: item.city,
      slug: citySlug,
      county: item.county || null
    });
  }
});

// Write processed data
fs.writeFileSync(
  path.join(__dirname, '../lib/cities-data.json'),
  JSON.stringify(byState, null, 2)
);

console.log(`Written data for ${Object.keys(byState).length} states`);
console.log('States:', Object.keys(byState).sort().join(', '));
