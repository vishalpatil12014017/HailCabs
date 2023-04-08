const options = {
	DB: {
		HOST: "sql.freedb.tech",
		USER: "freedb_vishal",
		PASSWORD: "wZz$96f9pcU#H%C",
		DB: "freedb_Projects",
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
