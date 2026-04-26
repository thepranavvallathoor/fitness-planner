const API_KEY = 'AIzaSyAr97fziWf11_U6ml1-y3_bJnt2fzSQrVM';

async function generatePlan() {
  const goal = document.getElementById('goal').value;
  const level = document.getElementById('level').value;
  const time = document.getElementById('time').value;
  const output = document.getElementById('output');

  output.classList.remove('hidden');
  output.innerHTML = '<p>Generating your personalised plan... ⏳</p>';

  const prompt = `You are a certified fitness coach. Create a personalised weekly fitness plan for someone with the following profile:
- Goal: ${goal}
- Fitness level: ${level}
- Available time per day: ${time}

Provide:
1. A 5-day workout plan (list exercises with sets/reps or duration)
2. A simple daily meal plan with breakfast, lunch, dinner, and a snack
3. Three motivational tips to stay consistent

Keep it practical, clear, and encouraging. Format with clear headings.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    output.innerHTML = text.replace(/\n/g, '<br>');
  } catch (err) {
    output.innerHTML = '<p>Something went wrong. Check your API key and try again.</p>';
    console.error(err);
  }
}
