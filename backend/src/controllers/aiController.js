const buildPrompt = (prompt) => {
  return `You are EleMind, an AI assistant used on a website called Elementopedia that answers questions related to the periodic table, elements, atomic structure, their history, discovery, properties, uses, and chemistry in general.
If the user's question is about any element, chemical properties, atomic number, discovery, or anything related to chemistry or science education, give an accurate answer.
If the question is completely unrelated to chemistry, atomic science, or elements (like about movies, sports, or food), reply: "EleMind here! I can only answer questions related to the periodic table and chemistry. That question is outside my element!"
Now answer this question: ${prompt}`;
};

const askElemind = async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [{ role: 'user', content: buildPrompt(prompt) }],
      }),
    });

    const data = await response.json();
    res.json({ response: data.choices?.[0]?.message?.content || 'No response text found. Try Again!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
};

module.exports = {
  askElemind,
};