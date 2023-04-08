const options = {
	DB: {
		HOST: "xxxxx",
		USER: "xxxxx",
		PASSWORD: "xxxxx",
		DB: "xxxxx",
		dialect: "mysql",
		pool: {
		  max: 5,
		  min: 0,
		  acquire: 30000,
		  idle: 10000,
		},
	  },
};
module.exports = options;
