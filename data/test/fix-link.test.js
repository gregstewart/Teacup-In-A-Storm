import fixLink from '../src/fix-link';

describe('Fix link', () => {
  describe('returns a nicely link', () => {
    it('when passed a string without http', () => {
      const link = 'www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model/';
      const expected = `https://${link}`;

      expect(fixLink(link)).to.equal(expected);
    });
    it('when passed a properly formatted https url keeps it', () => {
      const link = 'https://www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model/';
      const expected = `${link}`;

      expect(fixLink(link)).to.equal(expected);
    });

    it('when passed a properly formatted http url keeps it', () => {
      const link = 'http://www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model/';
      const expected = `${link}`;

      expect(fixLink(link)).to.equal(expected);
    });
  });
});
