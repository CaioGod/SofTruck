# Crawler e Server da tabela FIPE.

## PARA RODAR OS 2 PROGAMAS PRIMEIRO INSTALE OS PACOTES NECESSÁRIOS:

- npm install express
- npm install fs
- npm install underscore
- npm install selenium-webdriver
- npm install chromedriver

## Sobre o Crawler

Criei o crawler usando as ferramentas do Selenium Webdriver pois o site não disponibilizava uma maneira facil de coletar os dados. 
Usei o Selenium pois já conhecia um pouco de suas ferramentas (usei para fazer um bot de spam no whatsapp web no passado). O crawler apresentou funcionamento perfeito no Windows10 usando o ChromeDriver.

Como o site fazia uma espécie de consulta interna antes de mostrar os valores do carro, fiz com que o selenium fizesse as requisições automaticamente e salvasse todos os valores organizados em um arquivo .csv com o seguinte cabeçalho:

tableRef;brand;model;yearModel;price

Além disso optei por pegar apenas o primeiro modelo/anoModelo de cada umas das 10 primeiras marcas (para facilitar a coleta), mas isso pode ser facilmente trocado alterando os valores no código.

## Sobre o Server

Criei um simples servidor RESTFull em Node para poder consultar os valores do arquivo .csv salvo anteriormente. Não acho que tenha sido o melhor formato para armazenar os dados, mas levando em conta que perdi muito tempo fazendo o crawler funcionar optei por uma opção mais rapida e mais familiar para mim.

O servidor roda no localhost:8081 e tem implementados alguns endpoints para consultas:

- **'/' e '/getAll'**: retorna um JSON com todos os dados coletados sem nenhum filtro.

- **'/getBrand/:brand**: retorna em formato JSON todas as entradas da marca especificada (no meu caso existe apenas 1 carro por marca)

- **/depreciation/:brand**: retorna em formato JSON a depreciação (em %) mensal da marca especificada


## Observações 

Qualquer tipo de resultado/filtro se torna facil de montar (mesmo sem BD) usando a biblioteca 'underscore' do NODE

Gostaria de ter tido mais tempo para tentar fazer a parte de AngularJS, mas acabei gastando 70% do tempo tentando automizar a retirada de dados do site especificado. 

Gostaria ter alterado/lapidado diversas partes do código, ou até mesmo criado a visualização em Angular, mas como tive que trabalhar segunda eu não pude dedicar mais tempo ao código depois do final de semana.