'use strict';

describe('when a model does not exist', function() {
  var should = require('./init.js');
  var db, Model;

  before(function() {
    db = getSchema();
    Model = db.define('Model', {name: String});
  });

  it('should return an error', function(done) {
    Model.all({where: {id: 999}}, function(err, objs) {
      should.exist(err);
      err.should.have.property('status');
      err.status.should.equal(404);
      done();
    });
  });
});

describe('when a model does exist', function() {
  var should = require('./init.js');
  var db, Model;
  var id = 0;

  before(createNewModel);

  it('should not return an error', function(done) {
    Model.all({where: {id: id}}, function(err, objs) {
      should.not.exist(err);
      objs[0].id.should.equal(id);
      done();
    });
  });

  function createNewModel(done) {
    db = getSchema();
    Model = db.define('Model', {name: String});

    Model.create({name: 'horse'}, function(err, m) {
      should.not.exist(err);
      id = m.id;
      done();
    });
  }
});
