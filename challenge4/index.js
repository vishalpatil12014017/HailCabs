//Here is Two approches 


// First One
for (var i = 0; i < 5; i++) {
    (function(j) {
      setTimeout(function() {
        console.log(j);
      }, j * 1000);
    })(i);
  }
  
//Here we can use self-invoking function where we are passing passing value of i inside function printing it
  


// Second One
  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }


  //Here we can simply make for loop from var declaration to let in which it will provide block scope for value i and it will print 0 to 4