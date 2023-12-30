/**
 * Filters out the original prompt from Mistral Model response
 * This filter function will work for the following AI Models:
 * Mistral, Mixtral, Zephyr
 * @param {string} prompt
 * @param {object} response
 * @returns response as string
 */
export const filterMistralResponse = function filterMistralBasedModelResponse(
  prompt,
  response
) {
  return response[0].generated_text.replace(prompt, "");
};
