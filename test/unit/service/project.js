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

  it('should aggregate planned week', function () {
    var week = {
      reported: [],
      planned: dummyWeek.planned
    };
    expect(project.getProjects(week)).to.have.keys('1337');
    expect(project.getProjects(week)[1337]).to.have.property('users');
    expect(project.getProjects(week)[1337].users).to.have.property('jgn');
  });

  it('should aggregate reported week', function () {
    var week = {
      planned: [],
      reported: dummyWeek.reported
    };
    expect(project.getProjects(week)).to.have.keys('1337');
    expect(project.getProjects(week)[1337]).to.have.property('users');
    expect(project.getProjects(week)[1337].users).to.have.property('jgn');
  });

  it('should aggregate both planned and reported week', function () {
    var week = dummyWeek;
    expect(project.getProjects(week)).to.have.keys('1337');
    expect(project.getProjects(week)[1337]).to.have.property('users');
    expect(project.getProjects(week)[1337].users).to.have.property('jgn');
    expect(project.getProjects(week)[1337].users.jgn).to.have.property('planned');
    expect(project.getProjects(week)[1337].users.jgn).to.have.property('reported');
  });

});