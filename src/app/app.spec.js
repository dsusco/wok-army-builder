describe('wokArmyBuilder', function () {
  var filter;

  beforeEach(module('wokArmyBuilder'));

  describe('optionsFilter', function () {
    beforeEach(inject(function (_$filter_) {
      filter = _$filter_('optionsFilter');
    }));

    it('should return one third of the argument', function () {
      expect(filter(3)).toEqual('1');
    });

    it('should replace thirds with ⅓', function () {
      expect(filter(4)).toEqual('1⅓');
    });

    it('should replace two-thirds with ⅔', function () {
      expect(filter(8)).toEqual('2⅔');
    });
  });

  describe('spinalCaseFilter', function () {
    beforeEach(inject(function (_$filter_) {
      filter = _$filter_('spinalCaseFilter');
    }));

    it('should return undefined when argument is undefined', function () {
      expect(filter()).toBe(undefined);
    });

    it('should return lower-spinalcase string', function () {
      expect(filter('Lower ~ Me')).toBe('lower-me');
    });
  });
});
