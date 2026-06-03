const convertToBaseUnit = (
quantity,
unit
) => {

 switch(unit){

   case "kg":
      return quantity * 1000;

   case "g":
      return quantity;

   case "L":
      return quantity * 1000;

   case "mL":
      return quantity;

   case "item":
      return quantity;

   default:
      return quantity;
 }
};

module.exports = convertToBaseUnit;