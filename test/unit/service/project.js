describe('project', function () {

  var project;

  var dummyWeek;

  beforeEach(function () {
    module('iteam-dashboard');
    inject(function (_project_) {
      project = _project_;
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
                  dev: 0.3
                }
              }
            ]
          }
        ],
        reported : [
          {
            ProjectId: 1337,
            NumberOfHours: 1.6,
            EmployeeShortName: 'JGN',
            ParentProjectIds:[
              577,
              8,
              1339,
              1338
            ]
          },
          {
            ProjectId: 1337,
            NumberOfHours: 0.3,
            EmployeeShortName: 'JGN',
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

  describe("#summary", function(){

    it('should aggregate planned week', function () {
      var week = {
        reported: [],
        planned: dummyWeek.planned
      };
      var summary = project.getProjects(week);
      expect(summary).to.have.keys('1337');
      expect(summary[1337]).to.have.property('users');
      expect(summary[1337].users).to.have.property('jgn');
    });

    it('should aggregate reported week', function () {
      var week = {
        planned: [],
        reported: dummyWeek.reported
      };
      var summary = project.getProjects(week);
      expect(summary).to.have.keys('1337');
      expect(summary[1337]).to.have.property('users');
      expect(summary[1337].users).to.have.property('jgn');
    });

    it('should aggregate both planned and reported week', function () {
      var week = dummyWeek;
      var summary = project.getProjects(week);
      expect(summary).to.have.keys('1337');
      expect(summary[1337]).to.have.property('users');
      expect(summary[1337].users).to.have.property('jgn');
      expect(summary[1337].users.jgn).to.have.property('planned');
      expect(summary[1337].users.jgn).to.have.property('reported');
    });

    it('should aggregate both planned and reported week', function () {
      var week = dummyWeek;
      week.reported.push({
        ProjectId: 1339,
        NumberOfHours: 1.25,
        EmployeeShortName: 'abo',
        ParentProjectIds:[
          577,
          8,
          1337 // this should merge back to the 1337 project
        ]
      });
      var summary = project.getProjects(week);
      expect(summary).to.have.keys('1337');
      expect(summary[1337]).to.have.property('users');
      expect(summary[1337].users).to.have.property('jgn');
      expect(summary[1337].users).to.have.property('jgn');
      expect(summary[1337].users.jgn).to.have.property('planned');
      expect(summary[1337].users.jgn).to.have.property('reported');
      expect(summary[1337].users.jgn.reported).to.eql(1.9);
    });
  });

});