import bcrypt from "bcryptjs";

const users=[
   { email: "nssadmin@rguktong.ac.in",
    password: bcrypt.hashSync("nssadmin", 10)
   }
];

export default users;