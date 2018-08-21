'use strict';

describe('when a model does exist', function() {
  var should = require('./init.js');
  var db, Model;
  var id = 0;

  before(createNewModel);

  describe('updateOrCreate', function() {
    it('should not return boolean field as string', function(done) {
      var data = {id: id, enabled: true};
      Model.updateOrCreate(data, function(err, instance) {
        if (err) return done(err);
        instance.should.have.property('enabled');
        instance.enabled.should.equal(true);
        done();
      });
    });

    it('should not return number field as string', function(done) {
      var data = {id: id, enabled: true};
      Model.updateOrCreate(data, function(err, instance) {
        if (err) return done(err);
        instance.should.have.property('count');
        instance.count.should.equal(4);
        done();
      });
    });
  });

  function createNewModel(done) {
    db = getSchema();
    Model = db.define('Model', {name: String, enabled: Boolean, count: Number});

    Model.create({name: 'horse', enabled: false, count: 4}, function(err, m) {
      if (err) return done(err);
      id = m.id;
      done();
    });
  }
});
