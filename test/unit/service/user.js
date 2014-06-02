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
            NumberOfHours: 1.25,
            EmployeeShortName: 'jgn',
            ParentProjectIds:[
              577,
              8,
              1339,
              1338
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
  });

});