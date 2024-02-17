import { getRandomEmoji } from '../../modules/momentum/speechModules/helperFunctions';
/**
 * Filters out the original prompt from Mistral Model response
 * This filter function will work for the following AI Models:
 * Mistral, Mixtral, Zephyr
 * @param {string} prompt
 * @param {object} response
 * @returns response as string
 */
export const filterResponse = (response) => {
  // Originally had this code in order to prevent incomplete output/cut off words
  // It is cutting off some of the actual content the model is producing though so we should
  // revisit later. Maybe include a \n character
  // // Match the last occurrence of punctuation followed by any characters until the end of the string
  // const punctuationRegex = /[\.\?\!\}\"\)\:]/g;
  // const matches = response.match(punctuationRegex);
  // if (matches) {
  //   // Extract the matched text
  //   return response.slice(
  //     0,
  //     response.lastIndexOf(matches[matches.length - 1]) + 1
  //   );
  // } else {
  //   // If no punctuation is found, return the original string
  //   return response;
  // }
  return response;
};

export const filterEmojiResponse = (emojiResponse) => {
  //parse two emojis from response
  const emojiRegex = /\p{Emoji}/gu;

  // Use matchAll to get an iterator of all emoji matches
  const emojiMatches = emojiResponse.matchAll(emojiRegex);
  // Extract the first two emoji matches
  const firstTwoEmojis = Array.from(emojiMatches, (match) => match[0]).slice(
    0,
    2
  );

  return firstTwoEmojis.length === 2
    ? firstTwoEmojis.join('')
    : getRandomEmoji() + getRandomEmoji();
};
