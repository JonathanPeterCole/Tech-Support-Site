/**
	* Form Validation JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

function formValidator() {
  // Prepare the Regex expressions
  defaultExpression = new RegExp(/^[a-z0-9 ,.'@:()?!#+=£%&*\/\-\"]{0,50}$/i);
  var expressionArray = {
    "name" : new RegExp(/^[a-z ,.'\-]{1,50}$/i),
    "email" : new RegExp(/^[a-z0-9!#$%&'*+\-/=?^_`{|}~]{1,50}@[a-z0-9\-]{1,50}\.[a-z0-9.\-]{1,50}[a-z0-9]$/i),
    "phone" : new RegExp(/^(0|\+44|44)[0-9]{10}$|^$/i),
    "message" : new RegExp(/^(?=.*[a-z])[a-z0-9 ,.'@:()?!#+=£%&*\/\-\"\r\n]{1,5000}$/i)
  };

  this.validateField = function(field) {
    // Get the expression for the field
    var expression = expressionArray[field.attr("name")];
    if (typeof expression == "undefined") {
      expression = defaultExpression;
    }
    // Check the expression
    if (expression.test(field.val())) {
      return true;
    }
    return false;
  }
}
