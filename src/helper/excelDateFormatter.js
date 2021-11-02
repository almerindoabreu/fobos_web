import moment from "moment";

class ExcelDateFormatter{

  excelDateToDate(excelDate){
    console.log("excelDateToDate");
    var unixTimestamp = (excelDate-25568)*86400*1000 //as per the post above, convert Excel date to unix timestamp, assuming Mac/Windows Excel 2011 onwards
    var date = moment(new Date(unixTimestamp)); //Pass in unix timestamp instead of Excel date
    var dateWithNewFormat = date.format('YYYY-MM-DD')
    return dateWithNewFormat;
   }

}

export default ExcelDateFormatter;