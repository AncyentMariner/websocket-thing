const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var from = 'me';
    var text = 'this is a message';
    var result = generateMessage(from, text);
    expect(result.from).toBe('me');
    expect(result).toInclude({from, text});
  });
});
