const Ollama = require("ollama").Ollama || require("ollama").default;

let ollama = null;
const historic = [
  {
    role: "user",
    content: "Bonjours, tu dois me repondre avec une seul phrase tout le temps",
  },
];

async function chatstart(prompt) {
  prompt += " ?";
  console.log("user : ", prompt);
  historic.push({ role: "user", content: prompt });

  const response = await ollama.chat({
    model: "gemma3:1b",
    messages: historic,
    stream: false, // <--- On active le streaming ici
  });

  const ret = response.message.content;

  console.log("model : ", ret);

  console.log("\n"); // Saut de ligne final une fois terminé
  historic.push({ role: "assistant", content: ret });

  return ret;
}

exports.goGemma = async (prompt) => {
  if (ollama == null) ollama = new Ollama();

  return await chatstart(prompt);
};
