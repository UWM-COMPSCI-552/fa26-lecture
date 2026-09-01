/* global jest */
// Jest cannot handle nanoid
const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
jest.mock('nanoid', () => ({
  nanoid: (size = 21) => {
        let id = ''
        let i = size | 0
        while (i--) {
            id += urlAlphabet[(Math.random() * 64) | 0]
        }
        return id
    },
}));
