// selenium-webdriver
// chromedriver

// Get the first N brands (always the first model/yearModel) for the last M Months

const brands = 10;
const months = 12;
const fs = require('fs');

var logger = fs.createWriteStream('fipe.csv', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
logger.write("tableRef;brand;model;yearModel;price\n");

require('chromedriver');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://veiculos.fipe.org.br/');
driver.findElement(By.xpath("//a[@data-slug='carro']")).click();

// Start months from 1 becouse it has a standard value
for(j = 1; j <= months; j++ ){
  var obj = [];

  driver.findElement(By.xpath("//select[@id='selectTabelaReferenciacarro']//option["+ j +"]")).click();
  driver.findElement(By.xpath("//select[@id='selectTabelaReferenciacarro']//option["+ j +"]")).getText().then(function(txt){
    obj["tableRef"] = txt;
  });

  //Start crawling the loop at 2 because 1 is empty on the indexes.
  for(i = 2; i <= brands+1; i++){

    driver.findElement(By.xpath("//select[@id='selectMarcacarro']//option["+ i +"]")).click();
    driver.findElement(By.xpath("//select[@id='selectMarcacarro']//option["+ i +"]")).getText().then(function(txt){
      obj["brand"] = txt;
    });

    // Get first car model avaiable.
    driver.findElement(By.xpath("//select[@id='selectAnoModelocarro']//option[2]")).click();
    driver.findElement(By.xpath("//select[@id='selectAnoModelocarro']//option[2]")).getText().then(function(txt){
      obj["model"] = txt;
    });

    // Get first car year avaiable.
    driver.findElement(By.xpath("//select[@id='selectAnocarro']//option[2]")).click();
    driver.findElement(By.xpath("//select[@id='selectAnocarro']//option[2]")).getText().then(function(txt){
      obj["yearModel"] = txt;
    });

    driver.findElement(By.id("buttonPesquisarcarro")).click();

    driver.findElement(By.xpath("//tr[@class='last']/td[2]/p")).getText().then(function (txt){
      obj["price"] = txt;
      logger.write(obj["tableRef"].replace(" ", "") + ";" + obj["brand"]+ ";" + obj["model"] + ";" + obj["yearModel"] + ";" + obj["price"].replace("R$ ", "") + "\n");
    });
  }
}

driver.quit().then(function (){
  logger.end() // close string
});
