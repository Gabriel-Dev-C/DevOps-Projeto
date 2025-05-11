# FrontEnd DevOps

<br> <div align=center>

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white) ![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>


<p align="center">
<img src="./src/images/capaRM.png" alt="Protótipo do projeto.">
</p>

## 📂 Menu

<ul>
    <li><a href="#descricao">Meta e Descrição</a></li>
    <li><a href="#funcionamento">Funcionamento</a></li>
    <ul>
        <li><a href="#ci">Funcionamento do CI</a></li>
        <li><a href="#cd">Funcionamento do CD</a></li>
    </ul>
    <li><a href="#perfil">Perfil</a></li>
    <li><a href="#mapa">Mapa do Projeto</a></li>
    <li><a href="#contributing">Contributing</a></li>
</ul>

<p id="descricao"></p>

## 🎯 Meta e Descrição

*Projeto desenvolvido em equipe.*
> Página web desenvolvida para estudos e compreensão de tecnologias utilizadas no mercado.
O foco do projeto é desenvolver um website responsivo com frameworks como SASS e DataTables, para desenvolvimento completo do projeto, até seu deploy na fase final. Além disso é utilizado cypress para automação de testes de uso da página.

<p id="funcionamento"></p>

## ⚙️ Funcionamento

<p id="ci"></p>

### 🔁 Funcinamento do CI

Um workflow do GitHub Actions chamado Build, com o nome de execução Continuous Integration.

O workflow é ativado quando, há um push para a branch master ou quando usuário executa manualmente pelo GitHub através de workflow_dispatch.

O job Build and analyze roda em uma máquina virtual com Ubuntu (ubuntu-latest).

Checkout do repositório, usa a ação actions/checkout@v4, que baixa o código-fonte do repositório. O parâmetro fetch-depth: 0 garante que todo o histórico de commits seja obtido, útil para análises mais relevantes no SonarQube.

Análise de código com SonarQube, usa a ação SonarSource/sonarqube-scan-action@v5 para escanear o código com SonarQube. Configura as variáveis SONAR_TOKEN e SONAR_HOST_URL, armazenadas de forma segura nos GitHub Secrets. Os parâmetros do projeto no SonarQube são:

```.
sonar.projectKey=FrontEnd-DevOps
```
Define um identificador único para o projeto dentro do SonarQube. Esse projectKey permite que o SonarQube diferencie projetos diferentes na mesma instância.

```.
sonar.projectName=FrontEnd-DevOps
```
Nome amigável do projeto dentro do SonarQube. Este nome aparece na interface do SonarQube, facilitando a identificação dos relatórios de análise.

```.
sonar.projectVersion=1.0.0
```
Define a versão do projeto sendo analisado. Útil para rastrear melhorias ou mudanças de qualidade ao longo do tempo.

```.
sonar.sources=.
```
Especifica o diretório que contém os arquivos que devem ser analisados. O valor . significa "analisar todo o código-fonte do repositório", ou seja, todos os arquivos do projeto.

Esses parâmetros são fundamentais para o SonarQube identificar, nomear e organizar as análises do código do seu projeto. Eles garantem que a qualidade do código seja rastreada corretamente ao longo das versões.

Sendo assim, o workflow automatiza a integração contínua (CI) do projeto. Sempre que houver um push na branch master, o código será analisado automaticamente pelo SonarQube, garantindo que possíveis problemas de qualidade sejam identificados. Além disso, o usuário pode rodá-lo manualmente via GitHub.

<p id="cd"></p>

### 🚀 Funcionamento do CD

<p id="perfil"></p>

## 👥 Perfil

[Meu perfil do Github](https://github.com/Gabriel-Dev-C/)

<p id="mapa"></p>

## 🗺️  Mapa do Projeto

```.
├───.github\workflows       //Pasta com os arquivos yml para a execução do CI e do CD
└───cypress        //Pasta com os arquivos de configuração do cypress
└───src            //Pasta com os arquivos do site
    └───images      //Pasta com as imagens do README.md
```

<p id="contributing"></p>

## 🤝 Contributing

1. Fork it (<https://github.com/Gabriel-Dev-C/DevOps-Projeto/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
