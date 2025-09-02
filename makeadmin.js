const User = require('./models/User');
const bcrypt = require('bcrypt')
async function makeAdmin() {
    try {
        let user = await User.findOne({email: 'luckykharb@gmail.com'});
        if(user){
            console.log("user updated...");
        
        }else{
        let user = new User();
        user.firstName = 'lucky';
        user.lastName = 'kharb';
        user.email = 'luckykharb@gmail.com';
        let encryptedpassword = bcrypt.hashSync('12345', 10);
        user.password = encryptedpassword;
        user.userType = 'Admin';
        await user.save();
        console.log("usr saved successfully.....");
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = makeAdmin