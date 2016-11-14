'use strict';

describe('when a model does exist', function() {
  var should = require('./init.js');
  var db, Model;
  var id = 0;

  before(defineModel);
  beforeEach(createNewModel);

  describe('destroyAll', function() {
    it('should destroy all models', function(done) {
      Model.destroyAll(function(err) {
        if (err) return done(err);

        Model.find(function(err, instances) {
          if (err) return done(err);
          instances.should.have.lengthOf(0);
          done();
        });
      });
    });
  });

  function defineModel() {
    db = getSchema();
    Model = db.define('Model', {name: String});
  }

  function createNewModel(done) {
    Model.create({name: 'horse'}, function(err, m) {
      if (err) return done(err);
      id = m.id;
      done();
    });
  }
});
