describe('donutChart', function () {

  var $compile;
  var $templateCache;
  var outerScope;
  var scope;
  var element;
  var colors;

  beforeEach(function () {
    colors = {
      getColor: sinon.stub().returns('#A8A3D2'),
      shade: sinon.stub().returns('#BADA55')
    };

    module('iteam-dashboard', function ($provide) {
      $provide.value('colors', colors);
    });
    inject(function ($rootScope, _$compile_, _$templateCache_) {
      outerScope = $rootScope.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });

    outerScope.users = {
      'foo': {
        planned: 4,
        reported: 0,
        calendar: 0
      },
      'bar': {
        planned: 2,
        reported: 4,
        calendar: 0
      },
      'baz': {
        planned: 2,
        reported: 2,
        calendar: 3
      }
    };

    $templateCache.put('directive/donut-chart/donut-chart.html', '<div></div>');
    element = $compile('<donut-chart users="users"></donut-chart>')(outerScope);
    outerScope.$digest();
    scope = element.isolateScope();
  });

  describe('donutChart', function () {
    describe('users watch', function () {
      it('sets data for the rings', function () {
        expect(scope.outerRing, 'outer ring').to.eql([{ 
          user: 'foo',
          planned: 4
        }, {
          user: 'bar',
          planned: 2
        }, {
          user: 'bar',
          fill: 2
        }, {
          user: 'baz',
          planned: 2
        }, {
          user: 'baz',
          fill: 3
        }]);

        expect(scope.innerRing, 'inner ring').to.eql([{ 
          user: 'foo',
          fill: 4
        }, {
          user: 'bar',
          reported: 4
        }, {
          user: 'bar',
          calendar: 0
        }, {
          user: 'baz',
          reported: 2
        }, {
          user: 'baz',
          calendar: 3
        }]);
      });
    });

    describe('#get', function () {
      it('returns a getter function', function () {
        var result = scope.get('foo');
        expect(result).to.be.a.function;
      });
      describe('getter function', function () {
        it('gets the value of the planned', function () {
          var getter = scope.get('planned');
          var result = getter(scope.outerRing[0]);
          expect(result).to.eql(4);
        });
        it('looks in reported and calendar and gets the value of the reported', function () {
          var getter = scope.get(['reported', 'calendar']);
          var result = getter(scope.innerRing[1]);
          expect(result).to.eql(4);
        });
        it('looks in reported and calendar and gets the value of the calendar', function () {
          var getter = scope.get(['reported', 'calendar']);
          var result = getter(scope.innerRing[4]);
          expect(result).to.eql(3);
        });
        it('gets the fill', function () {
          var getter = scope.get('fill');
          expect(getter(scope.outerRing[2])).to.eql(2);
          expect(getter(scope.innerRing[0])).to.eql(4);
        });
      });
    });

    describe('#color', function () {
      it('returns a getter function', function () {
        var result = scope.color('foo');
        expect(result).to.be.a.function;
      });
      describe('getter function', function () {
        it('gets the value of the planned', function () {
          var getter = scope.color('planned');
          var result = getter({
            data: scope.outerRing[0]
          });
          expect(result).to.eql('#A8A3D2');
        });
        it('looks in reported and calendar and gets the value of the reported', function () {
          var getter = scope.color(['reported', 'calendar']);
          var result = getter({
            data: scope.innerRing[1]
          });
          expect(result).to.eql('#BADA55');
        });
        it('looks in reported and calendar and gets the value of the calendar', function () {
          colors.shade.withArgs('#A8A3D2', 10).returns('#FFFFF');
          var getter = scope.color(['reported', 'calendar'], '5');
          var result = getter({
            data: scope.innerRing[4]
          });
          expect(result).to.eql('#FFFFF');
        });
        it('gets the fill', function () {
          var getter = scope.color('fill');
          expect(getter({
            data: scope.outerRing[2]
          })).to.eql('transparent');
          expect(getter({
            data: scope.innerRing[0]
          })).to.eql('transparent');
        });
      });
    });
  });

  it('should have tests');

});