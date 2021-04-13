import wtext from './minify'

self.onmessage = ({ data: { text } }) => {
    self.postMessage({ text: text + wtext });
  };