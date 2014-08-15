describe('user', function () {

  var user;
  var dummyWeek;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function (_user_) {
      user = _user_;
    });


    dummyWeek = {
        planned: [
          {
            ProjectId: 1337,
            ProjectName: 'Leet',
            PlannedHoursPerEmployee:[{
              EmployeeShortName: 'jgn',
              PlannedHoursPerRole: {
                int: 1,
                dev: 2
              }
            }, {
              EmployeeShortName: 'abc',
              PlannedHoursPerRole: {
                dev: 3
              }
            }]
          },
          {
            ProjectId: 1338,
            ProjectName: 'More Leet',
            PlannedHoursPerEmployee:[
              {
                EmployeeShortName: 'jgn',
                PlannedHoursPerRole: {
                  int: 1,
                  dev: 2
                }
              }
            ]
          }
        ],
        reported : [
          {
            ProjectId: 1337,
            NumberOfHours: 1.6,
            EmployeeShortName: 'jgn',
            ParentProjectIds:[
              577,
              8,
              1339,
              1338
            ]
          },
          {
            ProjectId: 1338,
            NumberOfHours: 1.3,
            EmployeeShortName: 'jgn',
            ParentProjectIds:[
              577,
              8,
              1339,
              1338
            ]
          }, {
            ProjectId: 1339,
            NumberOfHours: 2,
            EmployeeShortName: 'def',
            ParentProjectIds: [
              577
            ]
          }
        ],
        calendar : [
          {
            ProjectId: 1337,
            NumberOfHours: 1.6,
            EmployeeShortName: 'jgn',
            ParentProjectIds:[
              577,
              8,
              1339,
              1338
            ]
          },
          {
            ProjectId: 1338,
            NumberOfHours: 1.3,
            EmployeeShortName: 'jgn',
            ParentProjectIds:[
              577,
              8,
              1339,
              1338
            ]
          }, {
            ProjectId: 1339,
            NumberOfHours: 2,
            EmployeeShortName: 'def',
            ParentProjectIds: [
              577
            ]
          }
        ]
      };
  });

  describe('#summary', function(){
    it('should return summary of users for a week', function () {
      var week = dummyWeek;
      var users = user.getUsers(week);
      expect(users).to.have.property('jgn');
      expect(users.jgn).to.have.property('planned');
      expect(users.jgn).to.have.property('reported');
    });

    it('should merge many projects together', function(){
      var week = dummyWeek;
      var users = user.getUsers(week);
      expect(users.jgn.planned).to.eql(6);
      expect(users.jgn.reported).to.eql(2.9);
    });

  });

});