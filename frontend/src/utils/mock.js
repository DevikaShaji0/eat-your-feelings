// Mock AI responses for frontend testing
const mockResponses = [
  {
    mood: 'sad',
    food: 'Spicy Thai Green Curry',
    recipe: 'Heat coconut milk, add green curry paste, vegetables, and protein. Simmer for 15 minutes with basil leaves. Serve over jasmine rice for a mood-lifting feast!',
    roast: 'Stop drowning in your own tears and start drowning your sorrows in curry instead. At least the curry won\'t judge your life choices.'
  },
  {
    mood: 'angry',
    food: 'Fluffy Pancakes with Maple Syrup',
    recipe: 'Mix flour, milk, eggs, and baking powder. Cook on medium heat until golden. Stack high and drizzle with pure maple syrup. Let sweetness dissolve that rage!',
    roast: 'Channel that anger into flipping pancakes instead of flipping out. At least pancakes won\'t argue back or steal your parking spot.'
  },
  {
    mood: 'stressed',
    food: 'Homemade Mac and Cheese',
    recipe: 'Cook pasta, make cheese sauce with butter, flour, milk, and lots of cheese. Bake with breadcrumb topping until bubbly. Pure comfort in a dish!',
    roast: 'You\'re stressed about adulting? Here\'s a kid\'s meal to remind you that some problems can be solved with cheese. Lots and lots of cheese.'
  },
  {
    mood: 'bored',
    food: 'Fusion Korean-Mexican Tacos',
    recipe: 'Marinate bulgogi beef, grill with kimchi, serve in corn tortillas with sriracha mayo and cilantro. Adventure on a plate!',
    roast: 'Bored with life? Here\'s a cultural mashup that\'s more interesting than your Netflix queue. At least these tacos have plot twists.'
  },
  {
    mood: 'anxious',
    food: 'Lavender Honey Cookies',
    recipe: 'Mix flour, butter, honey, and dried lavender. Roll into balls, bake at 350°F for 12 minutes. Let the aromatherapy work its magic!',
    roast: 'Anxiety got you spiraling? These cookies are basically edible meditation. Namaste calm and eat cookies, my friend.'
  },
  {
    mood: 'tired',
    food: 'Energy-Packed Smoothie Bowl',
    recipe: 'Blend banana, berries, spinach, and protein powder. Top with granola, nuts, and fresh fruit. Breakfast of champions who actually need to function today!',
    roast: 'Too tired to adult? Here\'s liquid motivation in a bowl. It\'s like coffee but pretending to be healthy. Your future self will thank you.'
  }
];

export const mockAIResponse = (userMood) => {
  const lowerMood = userMood.toLowerCase();
  
  // Find a matching response based on keywords in the mood
  let matchedResponse = mockResponses.find(response => 
    lowerMood.includes(response.mood)
  );
  
  // If no specific match, pick a random response
  if (!matchedResponse) {
    matchedResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  }
  
  return matchedResponse;
};