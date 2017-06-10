import { format } from 'date-fns';

import formatDate from '../src/format-date';

describe('Format date', () => {
  describe('returns a nicely formatted date', () => {
    it('when passes a unix time stamp as a string', () => {
      const date = '1482431076';
      const expected = format(parseInt('1482431076', 10) * 1000, 'YYYY/MM/DD @ HH:mm');

      expect(formatDate(date)).to.equal(expected);
    });
    it('when passes a unix time stamp as a number', () => {
      const date = 1482431076;
      const expected = format(parseInt(1482431076, 10) * 1000, 'YYYY/MM/DD @ HH:mm');

      expect(formatDate(date)).to.equal(expected);
    });
    it('when passed a date as string', () => {
      const date = 'Sat Dec 24 18:27:51 +0000 2016';
      const expected = format(new Date('Sat Dec 24 18:27:51 +0000 2016'), 'YYYY/MM/DD @ HH:mm');

      expect(formatDate(date)).to.equal(expected);
    });
    it('when passed a UTC date as string', () => {
      const date = '2014-04-28T17:10:50+00:00';
      const expected = format(new Date('2014-04-28T17:10:50+00:00'), 'YYYY/MM/DD @ HH:mm');

      expect(formatDate(date)).to.equal(expected);
    });

    it('when passed a Date object', () => {
      const date = new Date();
      const expected = format(new Date(), 'YYYY/MM/DD @ HH:mm');

      expect(formatDate(date)).to.equal(expected);
    });
  });
});
