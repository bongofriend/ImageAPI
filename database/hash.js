const bcrypt = require("bcrypt-nodejs");
const Promise = require("bluebird");

const rounds = 5;

class Hasher{
    
   hash(data){
       return new Promise(function(resolve,reject){
           bcrypt.genSalt(rounds,function(err,salt){
               if (err) return reject(err);
               bcrypt.hash(data,salt,null,function(err,result){
                   if (err) return reject(err);
                   return resolve(result);
               })
           })
       })
   }

    compare(data,hash,cb){
        bcrypt.compare(data,hash,function(err,result){
            if (err){
                return cb(err,null);
            }
            return cb(null,result);
        })
    }
}

module.exports = new Hasher()
 