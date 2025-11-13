import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateInspectionChecklist(propertyData: {
  area: number;
  year: number;
  floor: number;
}) {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Wygeneruj listę inspekcji dla mieszkania:
          - Metraż: ${propertyData.area} m²
          - Rok budowy: ${propertyData.year}
          - Piętro: ${propertyData.floor}

          Zwróć JSON z punktami do sprawdzenia.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    try {
      return JSON.parse(content.text);
    } catch (e) {
      return { items: content.text.split('\n').filter(line => line.trim()) };
    }
  }
}

export async function generateContractorQuestions(sectionType: string, propertyData: any) {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Generuj 10-15 pytań do fachowca zajmującego się ${sectionType}.
          Dane mieszkania: ${JSON.stringify(propertyData)}

          Zwróć JSON z tablicą pytań.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === 'text') {
    try {
      return JSON.parse(content.text);
    } catch (e) {
      return { questions: content.text.split('\n').filter(line => line.trim()) };
    }
  }
}
