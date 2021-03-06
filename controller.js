var mysql = require('mysql');
var exports = module.exports;
var connection;

exports.connect =  function(callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  connection.connect(function(err) {
    if (err)
    {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.end(function(err){
    if(err)
    {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log('Ended connection');
  });
  callback(null);
}

exports.get_heart_params = function(callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  connection.query("SELECT * FROM params", function(err, results, fields){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }

    console.log("Queried for Heart Parameters!");

    connection.end(function(err){
      if(err)
      {
        console.log(err);
        console.error('error connecting: ' + err.stack);
      }
      console.log('Ended connection');
      callback(null,results);
    });
  });
}

exports.post_heart_params = function(params,callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  var heartparams = {
    pace_channel: params.pace_channel,
    pace_time_duration: params.pace_time_duration,
    pulse_width_duration: params.pulse_width_duration,
    pulse_amplitude: params.pulse_width_amplitude,
    record_channel: params.record_channel,
    record_duration: params.record_duration
  }

  connection.query("UPDATE params SET ?", [heartparams], function(err, result){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log("Updated Parameters: " + heartparams);
  });

  connection.end(function(err){
    if(err)
    {
      console.log(err);
      console.error('error connecting: ' + err.stack);
    }
    console.log('Ended connection');
  });
  callback(null,heartparams);
}

exports.heart_data = function(heart_string, callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  var heartdata = {
    data : heart_string,
    time : (new Date()).toJSON(),
    record_channel : "1"
  }

  connection.query("INSERT INTO testdata SET ?", [heartdata], function(err, result){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log("Inserted :" + result);
    console.log("Inserted Real Information");
  });

  connection.end(function(err){
    if(err)
    {
      console.log(err);
      console.error('error connecting: ' + err.stack);
    }
    console.log('Ended connection');
  });
  callback(null,heartdata);
}
