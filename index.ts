import uniq from 'lodash.uniq'
import emojiCodes from './emoji-codes'

// ======================================================
// unicode-range を出力する
// ------------------------------------------------------

let codes = [];
emojiCodes.forEach(function (emoji) {
  emoji.forEach(function (code) {
    codes.push(code)
  })
});

codes.sort(function (a, b) {
  return a - b
});
codes = uniq(codes);
const chunkedCodes = [];
codes.forEach((code, i) => {
  const lastChunk = chunkedCodes[chunkedCodes.length - 1];
  if (i === 0 || chunkedCodes[chunkedCodes.length - 1][lastChunk.length - 1] !== code - 1) {
    chunkedCodes.push([])
  }
  chunkedCodes[chunkedCodes.length - 1].push(code)
});

const hex = number => {
  return number.toString(16).toUpperCase()
};

const rangeString = chunkedCodes.map(chunk => {
  let range = 'U+' + hex(chunk[0]);
  if (chunk.length > 1) {
    range += '-' + hex(chunk[chunk.length - 1])
  }
  return range
}).join(', ');

console.log(rangeString);

// ======================================================
// 表を出力する
// ------------------------------------------------------

const table = document.createElement('table');
const rows = document.createDocumentFragment();

const makeEmoji = function (chars) {
  return chars.map(function (char) {
    return String.fromCodePoint(char)
  }).join('')
};

const makeEmojiCodeString = function (chars) {
  return chars.map(function (char) {
    return 'U+' + char.toString(16).toUpperCase()
  }).join(' ')
};

emojiCodes.forEach(function (emoji) {
  const row = document.createElement('tr');
  const char = document.createElement('td');
  const code = document.createElement('td');
  char.className = 'char';
  char.appendChild(document.createTextNode(makeEmoji(emoji)));
  code.className = 'code';
  code.appendChild(document.createTextNode(makeEmojiCodeString(emoji)));
  row.appendChild(char);
  row.appendChild(code);
  rows.appendChild(row)
});

table.appendChild(rows);
document.body.appendChild(table);
