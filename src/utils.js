export function generateRandomSeeds() {
  return Math.floor(Math.random() * 1000000);
}

export function generateRandomPrompt() {
  const prompts = [
    "A serene landscape with mountains",
    "A futuristic city skyline at night",
    "A vibrant underwater scene with coral reefs",
    "A cozy cabin in a snowy forest",
    "An abstract painting with bold colors",
    "A majestic lion resting in the savannah",
    "A bustling market in a Middle Eastern city",
    "A tranquil beach at sunset with palm trees",
    "A vintage car parked on a cobblestone street",
    "A whimsical fairy tale forest with glowing mushrooms",
    "A steampunk-inspired airship flying over a city",
    "A close-up of a blooming flower with dew drops",
    "A dramatic stormy sky over a calm sea",
    "A futuristic robot in a high-tech laboratory",
  ];
  for (let i = prompts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [prompts[i], prompts[j]] = [prompts[j], prompts[i]];
  }

  return prompts;
}
