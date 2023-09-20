
//--------------------------------------------------------------------- View ---
// Génération de portions en HTML et affichage
//
view = {

  // Injecte le HTML dans une balise de la page Web.
  samDisplay(sectionId, representation) {
    const section = document.getElementById(sectionId);
    section.innerHTML = representation;
  },

  // Astuce : Pour avoir la coloration syntaxique du HTML avec l'extension lit-html dans VSCode
  // https://marketplace.visualstudio.com/items?itemName=bierner.lit-html
  // utiliser this.html`<h1>Hello World</h1>` en remplacement de `<h1>Hello World</h1>`
  html([str, ...strs], ...vals) {
    return strs.reduce((acc, v, i) => acc + vals[i] + v, str);
  },

  // Renvoit le HTML de l'interface complète de l'application
  appUI(model, state) {
    const configsChooserHTML = this.configsChooserUI();
    return this.html`
    <div class="container">
      ${configsChooserHTML}
      <h1 class="text-center">Portfolio Cryptos</h1>
      <br />
      <div class="row">
        <div class="col-lg-6">
            ${state.representations.currencies}
        <br />
        </div>

        <div class="col-lg-6">
          ${state.representations.preferences}
          <br />
          ${state.representations.wallet}
          <br />
        </div>
      </div>
    </div>
    `;
  },

  configsChooserUI() {
    const options = Object.keys(configs).map(v => {
      const selected = configsSelected == v ? 'selected="selected"' : '';
      return this.html`
      <option ${selected}>${v}</option>
      `;
    }).join('\n');
    return this.html`
    <div class="row">
      <div class="col-md-7"></div>
      <div class="col-md-5">
      <br />
        <div class="d-flex justify-content-end">
          <div class="input-group">
            <div class="input-group-prepend ">
              <label class="input-group-text">Config initiale :</label>
            </div>
            <select class="custom-select" onchange="actions.reinit({e:event})">
              ${options}
            </select>
          </div>
        </div>
      </div>
    </div>
    <br />
    `;
  },

  currenciesUI(model, state) {
    const tabName = model.ui.currenciesCard.selectedTab;
    switch (tabName) {
      case 'cryptos': return this.currenciesCryptosUI(model, state); break;
      case 'fiats': return this.currenciesFiatsUI(model, state); break;
      default:
        console.error('view.currenciesUI() : unknown tab name: ', tabName);
        return '<p>Error in view.currenciesUI()</p>';
    }
  },

  currenciesCryptosUI(model, state) {

    const paginationHTML = this.paginationUI(model, state, 'cryptos');

    return this.html`
<div class="card border-secondary" id="currencies">
  <div class="card-header">
    <ul class="nav nav-pills card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#currencies">
          Cryptos <span class="badge badge-light">19 / 386</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-secondary" href="#currencies" onclick="actions.changeTab({tab:'currenciesFiats'})">
          Monnaies cibles
          <span class="badge badge-secondary">10 / 167</span></a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="input-group">
      <div class="input-group-append">
        <span class="input-group-text">Filtres : </span>
      </div>
      <input value="coin" id="filterText" type="text" class="form-control" placeholder="code ou nom..." />
      <div class="input-group-append">
        <span class="input-group-text">Prix &gt; </span>
      </div>
      <input id="filterSup" type="number" class="form-control" value="5" min="0" />
    </div> <br />
    <div class="table-responsive">
      <table class="col-12 table table-sm table-bordered">
        <thead>
          <th class="align-middle text-center col-2">
            <a href="#currencies">Code</a>
          </th>
          <th class="align-middle text-center col-5">
            <a href="#currencies">Nom</a>
          </th>
          <th class="align-middle text-center col-2">
            <a href="#currencies">Prix</a>
          </th>
          <th class="align-middle text-center col-3">
            <a href="#currencies">Variation</a>
          </th>
        </thead>

        <tr class="bg-warning">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BCH.png" />
              BCH </span>
          </td>
          <td><b>Bitcoin Cash / BCC</b></td>
          <td class="text-right"><b>118.59</b></td>
          <td class="text-right">0.867 ↗</td>
        </tr>


        <tr class="">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BNB.png" />
              BNB </span>
          </td>
          <td><b>Binance Coin</b></td>
          <td class="text-right"><b>331.79</b></td>
          <td class="text-right">-10.479 ↘</td>
        </tr>


        <tr class="bg-success text-light">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BTC.png" />
              BTC </span>
          </td>
          <td><b>Bitcoin</b></td>
          <td class="text-right"><b>20785.03</b></td>
          <td class="text-right">-285.592 ↘</td>
        </tr>


        <tr class="">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BTCZ.png" />
              BTCZ </span>
          </td>
          <td><b>BitcoinZ</b></td>
          <td class="text-right"><b>21264.28</b></td>
          <td class="text-right">-144.348 ↘</td>
        </tr>


        <tr class="">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BTG.png" />
              BTG </span>
          </td>
          <td><b>Bitcoin Gold</b></td>
          <td class="text-right"><b>17.62</b></td>
          <td class="text-right">-0.459 ↘</td>
        </tr>


        <tr class="bg-warning">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BTLC.png" />
              BTLC </span>
          </td>
          <td><b>BitLuckCoin</b></td>
          <td class="text-right"><b>9.00</b></td>
          <td class="text-right">-0.061 ↘</td>
        </tr>


        <tr class="">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/CLOAK.png" />
              CLOAK </span>
          </td>
          <td><b>CloakCoin</b></td>
          <td class="text-right"><b>10.00</b></td>
          <td class="text-right">-0.068 ↘</td>
        </tr>


        <tr class="bg-warning">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/DSH.png" />
              DSH </span>
          </td>
          <td><b>Dashcoin</b></td>
          <td class="text-right"><b>252.20</b></td>
          <td class="text-right">-1.712 ↘</td>
        </tr>


        <tr class="">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/GMX.png" />
              GMX </span>
          </td>
          <td><b>Goldmaxcoin</b></td>
          <td class="text-right"><b>38.30</b></td>
          <td class="text-right">-0.288 ↘</td>
        </tr>


        <tr class="">
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/GRS.png" />
              GRS </span>
          </td>
          <td><b>Groestlcoin </b></td>
          <td class="text-right"><b>10.00</b></td>
          <td class="text-right">-0.068 ↘</td>
        </tr>

      </table>
    </div>

    ${paginationHTML}
  </div>
  <div class="card-footer text-muted"> Cryptos préférées :
    <span class="badge badge-warning">BCH</span>
    <span class="badge badge-success">BTC</span>
    <span class="badge badge-warning">BTLC</span>
    <span class="badge badge-warning">DSH</span>
    <span class="badge badge-success">ETH</span>
    <span class="badge badge-success">LTC</span>
    <span class="badge badge-warning">XMR</span>
  </div>
</div>  
    `;
  },

  paginationUI(model, state, currency) {
    return this.html`
<section id="pagination">
  <div class="row justify-content-center">
    <nav class="col-auto">
      <ul class="pagination">
        <li class="page-item disabled">
          <a class="page-link" href="#currencies">&lt;</a>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#currencies">1</a>
        </li>
        <li class="page-item ">
          <a class="page-link" href="#currencies">2</a>
        </li>
        <li class="page-item ">
          <a class="page-link" href="#currencies">&gt;</a>
        </li>
      </ul>
    </nav>
    <div class="col-auto">
      <div class="input-group mb-3">
        <select class="custom-select" id="selectTo">
          <option value="0">5</option>
          <option selected="selected" value="1">10</option>
          <option value="2">15</option>
        </select>
        <div class="input-group-append">
          <span class="input-group-text">par page</span>
        </div>
      </div>
    </div>
  </div>
</section>    `;
  },

  currenciesFiatsUI(model, state) {

    const paginationHTML = this.paginationUI(model, state, 'fiats');

    return this.html`
<div class="card border-secondary" id="currencies">
  <div class="card-header">
    <ul class="nav nav-pills card-header-tabs">
      <li class="nav-item">
        <a class="nav-link text-secondary" href="#currencies" onclick="actions.changeTab({tab:'currenciesCryptos'})">
          Cryptos <span class="badge badge-secondary">10 / 386</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#currencies">Monnaies cibles <span class="badge badge-light">10 /
            167</span></a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="input-group">
      <div class="input-group-append">
        <span class="input-group-text">Filtres : </span>
      </div>
      <input value="ro" id="filterText" type="text" class="form-control" placeholder="code ou nom..." />
    </div> <br />
    <div>À compléter...</div><br />
    ${paginationHTML}
  </div>
  <div class="card-footer text-muted"> Monnaies préférées :
    <span class="badge badge-warning">CUP</span>
    <span class="badge badge-success">EUR</span>
    <span class="badge badge-warning">GBP</span>
    <span class="badge badge-warning">JEP</span>
    <span class="badge badge-warning">TTD</span>
    <span class="badge badge-warning">USD</span>
  </div>
</div>    `;
  },

  preferencesUI(model, state) {

    const authors = model.config.authors;
    const debug = model.config.debug;
    const activeTarget = model.config.targets.active;
    const updateDisabled = model.config.dataMode == 'offline' ? 'disabled="disabled"' : '';
    const target = model.config.targets.active;
    const targetsList = mergeUnique(model.config.targets.list, [target]).sort();
    const fiatsList = state.data.fiats.list;

    const fiatOptionsHTML = targetsList.map((v) => {
      const code = fiatsList[v].code;
      const name = fiatsList[v].name;
      const isOffline = model.config.dataMode == 'offline';
      const selected = code == target ? 'selected="selected"' : '';
      const disabled = isOffline && code != target ? 'disabled="disabled"' : '';
      return this.html`
      <option value="${code}" ${selected} ${disabled}>${code} - ${name}</option>
      `;
    }).join('\n');

    const dataModeOptionsHTML = [['online', 'En ligne'], ['offline', 'Hors ligne']].map(v => {
      const selected = v[0] == model.config.dataMode ? 'selected="selected"' : '';
      return this.html`<option value="${v[0]}" ${selected}>${v[1]}</option>`;
    }).join('\n');

    return this.html`
<div class="card border-secondary">
  <div class="card-header d-flex justify-content-between">
    <h5 class=""> Préférences </h5>
    <h5 class="text-secondary"><abbr title="${authors}">Crédits</abbr></h5>
  </div>
  <div class="card-body">
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Monnaie
          cible</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01"
        onchange="actions.changeTarget({e:event, debug:'${debug}'})">
        ${fiatOptionsHTML}
      </select>
    </div>
    <p></p>
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text">Données</label>
      </div>
      <select class="custom-select"
        onchange="actions.changeDataMode({e:event, target:'${activeTarget}', debug:'${debug}'})">
        ${dataModeOptionsHTML}
      </select>
      <div class="input-group-append">
        <button class="btn btn-primary" ${updateDisabled}
          onclick="actions.updateOnlineCurrenciesData({target: '${activeTarget}', debug:'${debug}'})">
          Actualiser</button>
      </div>
    </div>
  </div>
</div>    `;
  },

  walletUI(model, state) {
    const tabName = model.ui.walletCard.selectedTab;
    switch (tabName) {
      case 'portfolio': return this.walletPortfolioUI(model, state); break;
      case 'ajouter': return this.walletAjouterUI(model, state); break;
      default:
        console.error('view.currenciesUI() : unknown tab name: ', tabName);
        return '<p>Error in view.currenciesUI()</p>';
    }
  },

  walletPortfolioUI(model, state) {
    return this.html`
<div class="card border-secondary text-center" id="wallet">
  <div class="card-header">
    <ul class="nav nav-pills card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#wallet">Portfolio <span class="badge badge-light">3</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-secondary" href="#wallet" onclick="actions.changeTab({tab:'walletAjouter'})">
          Ajouter <span class="badge badge-secondary">4</span></a>
      </li>
    </ul>
  </div>
  <div class="card-body text-center">

    <br />
    <div class="table-responsive">
      <table class="col-12 table table-sm table-bordered">
        <thead>
          <th class="align-middle text-center col-1"> Code </th>
          <th class="align-middle text-center col-4"> Nom </th>
          <th class="align-middle text-center col-2"> Prix </th>
          <th class="align-middle text-center col-3"> Qté </th>
          <th class="align-middle text-center col-2"> Total </th>
        </thead>

        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BTC.png" />
              BTC </span>
          </td>
          <td><b>Bitcoin</b></td>
          <td class="text-right">20785.03</td>
          <td class="text-right">
            <input type="text" class="form-control " value="1" />
          </td>
          <td class="text-right"><span class=""><b>20785.03</b></span></td>
        </tr>


        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/ETH.png" />
              ETH </span>
          </td>
          <td><b>Ethereum</b></td>
          <td class="text-right">1591.82</td>
          <td class="text-right">
            <input type="text" class="form-control text-primary" value="13" />
          </td>
          <td class="text-right"><span class="text-primary"><b>20693.62</b></span></td>
        </tr>


        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/LTC.png" />
              LTC </span>
          </td>
          <td><b>Litecoin</b></td>
          <td class="text-right">69.44</td>
          <td class="text-right">
            <input type="text" class="form-control text-primary" value="21" />
          </td>
          <td class="text-right"><span class="text-primary"><b>1458.18</b></span></td>
        </tr>

      </table>
    </div>

    <div class="input-group d-flex justify-content-end">
      <div class="input-group-prepend">
        <button class="btn btn-primary">Confirmer</button>
      </div>
      <div class="input-group-append">
        <button class="btn btn-secondary">Annuler</button>
      </div>
    </div>

  </div>

  <div class="card-footer">
    <h3><span class="badge badge-primary">Total : 42936.83 EUR</span></h3>
  </div>
</div>
    `;
  },

  walletAjouterUI(model, state) {
    return this.html`
<div class="card border-secondary text-center" id="wallet">
  <div class="card-header">
    <ul class="nav nav-pills card-header-tabs">
      <li class="nav-item">
        <a class="nav-link text-secondary" href="#wallet" onclick="actions.changeTab({tab:'walletPortfolio'})">
          Portfolio <span class="badge badge-secondary">3</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#wallet">Ajouter <span class="badge badge-light">4</span></a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <br />
    <div class="table-responsive">
      <table class="col-12 table table-sm table-bordered">
        <thead>
          <th class="align-middle text-center col-1"> Code </th>
          <th class="align-middle text-center col-4"> Nom </th>
          <th class="align-middle text-center col-2"> Prix </th>
          <th class="align-middle text-center col-3"> Qté </th>
          <th class="align-middle text-center col-2"> Total </th>
        </thead>

        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BCH.png" />
              BCH </span>
          </td>
          <td><b>Bitcoin Cash / BCC</b></td>
          <td class="text-right">118.59</td>
          <td class="text-right">
            <input type="text" class="form-control " value="0" />
          </td>
          <td class="text-right"><span class=""><b>0.00</b></span></td>
        </tr>


        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/BTLC.png" />
              BTLC </span>
          </td>
          <td><b>BitLuckCoin</b></td>
          <td class="text-right">9.00</td>
          <td class="text-right">
            <input type="text" class="form-control text-primary" value="500" />
          </td>
          <td class="text-right"><span class="text-primary"><b>4501.15</b></span></td>
        </tr>


        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/DSH.png" />
              DSH </span>
          </td>
          <td><b>Dashcoin</b></td>
          <td class="text-right">252.20</td>
          <td class="text-right">
            <input type="text" class="form-control text-danger" value="-1" />
          </td>
          <td class="text-right"><span class="text-danger"><b>???</b></span></td>
        </tr>


        <tr>
          <td class="text-center">
            <span class="badge badge-pill badge-light">
              <img src="https://assets.coinlayer.com/icons/XMR.png" />
              XMR </span>
          </td>
          <td><b>Monero</b></td>
          <td class="text-right">156.85</td>
          <td class="text-right">
            <input type="text" class="form-control text-danger" value="plein!" />
          </td>
          <td class="text-right"><span class="text-danger"><b>???</b></span></td>
        </tr>

      </table>
    </div>

    <div class="input-group d-flex justify-content-end">
      <div class="input-group-prepend">
        <button class="btn disabled">Confirmer</button>
      </div>
      <div class="input-group-append">
        <button class="btn btn-secondary">Annuler</button>
      </div>
    </div>


  </div>
  <div class="card-footer">
    <h3><span class="badge badge-primary">Total : 4501.15 EUR</span></h3>
  </div>
</div>
    `;
  },


};
