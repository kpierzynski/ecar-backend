const mongoose = require('mongoose');

const exampleConfig = {
  mailConfig: {
    title: 'Przypominamy o wizycie w serwisie samochodowym w Poznaniu',
    template:
      'Szanowni Państwo,\n\nW związku z ostatnią wizytą na {0}, informujemy, że w pojeździe o nr rej. {1} uwagi wymagają następujące pozycje:\n{2*}\n\nJako profesjonaliści w dziedzinie motoryzacji, wiemy, że bezpieczeństwo jest kluczowe, dlatego zawsze podejmujemy działania, które zapewnią Państwu bezpieczną eksploatację. W trosce o Państwa czas, informujemy o konieczności wizyty w serwisie odpowiednio wcześniej.\n\n{3}\n\nZachęcamy do umówienia się na wizytę w dogodnym dla Państwa terminie, odpowiadając na ten e-mail bądź poprzez kontakt telefoniczny.\n\n{4}\n',
    footer: 'Z wyrazami szacunku\nTymoteusz Kowalski\nE-CAR\n123-456-789\ne-car.poznan@hotmail.com',
  },

  globalConfig: {
    pageTitle: 'E-Car Message System',
  },

  appointmentTypes: {
    default: 'Rodzaj wizyty',
    types: [
      {
        name: 'Przegląd okresowy',
        text: 'przeglądzie okresowym',
      },
      {
        name: 'Diagnostyka komputerowa',
        text: 'diagnostyce komputerowej',
      },
      {
        name: 'Diagnostyka zgłoszonej usterki',
        text: 'diagnostyce zgłoszonej usterki',
      },
    ],
  },

  partTypes: {
    default: 'Typ układu',
    types: [
      {
        name: 'Układ hamulcowy',
        options: [
          {
            name: 'Tarcze hamulcowe przód',
          },
          {
            name: 'Okładziny hamulcowe przód',
          },
          {
            name: 'Płyn hamulcowy',
          },
        ],
        note: 'Regularna kontrola stanu układu hamulcowego jest kluczowa dla zapewnienia prawidłowej pracy hamulców i uniknięcia niebezpiecznych sytuacji na drodze. Zaniedbania w tym zakresie mogą prowadzić do pogorszenia skuteczności hamowania oraz poważnych uszkodzeń układu hamulcowego. Zalecamy, aby co najmniej raz na miesiąc sprawdzać stan układu, a także w razie potrzeby wymieniać jego elementy zgodnie z zaleceniami. Pamiętajmy, że bezpieczeństwo nasze i innych użytkowników dróg zależy w dużej mierze od sprawności układu hamulcowego, dlatego zachęcamy do systematycznej kontroli i dbałości o ten niezwykle ważny element pojazdu.',
      },
      {
        name: 'Układ smarowania',
        options: [
          {
            name: 'Olej silnikowy z filtrem i korkiem',
          },
          {
            name: 'Pompa oleju',
          },
          {
            name: 'Czujnik ciśnienia oleju',
          },
        ],
        note: 'Regularna kontrola stanu układu smarowania jest kluczowa dla prawidłowego działania pojazdu. Zaniedbania w tym zakresie mogą prowadzić do poważnych uszkodzeń silnika i innych elementów samochodu. Zalecamy, aby co najmniej raz na miesiąc sprawdzać poziom oleju w silniku i regularnie wymieniać go zgodnie z zaleceniami. W przypadku zauważenia jakichkolwiek nieprawidłowości, konieczne jest natychmiastowe podjęcie działań.',
      },
      {
        name: 'Układ zawieszenia',
        options: [
          {
            name: 'Amortyzatory przód',
          },
          {
            name: 'Tuleje wahacza tył',
          },
          {
            name: 'Sprężyny',
          },
        ],
        note: 'Regularna kontrola stanu układu zawieszenia jest kluczowa dla prawidłowego działania pojazdu i zapewnienia bezpieczeństwa na drodze. Zaniedbania w tym zakresie mogą prowadzić do pogorszenia stabilności i prowadzenia samochodu, a także poważnych uszkodzeń układu zawieszenia. Zalecamy, aby co najmniej raz na miesiąc sprawdzać stan amortyzatorów i resorów, a także w razie potrzeby wymieniać je zgodnie z zaleceniami. Stan układu zawieszenia wpływa nie tylko na komfort jazdy, ale przede wszystkim na bezpieczeństwo nasze i innych użytkowników na drodze.',
      },
    ],
  },
};

const mailConfigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  template: { type: String, required: true },
  footer: { type: String, required: true },
});

const globalConfigSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true },
});

const appointmentTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
});

const partTypeOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const partTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [partTypeOptionSchema],
  note: { type: String, required: true },
});

const configSchema = new mongoose.Schema({
  mailConfig: mailConfigSchema,
  globalConfig: globalConfigSchema,
  appointmentTypes: {
    default: { type: String, required: true },
    types: [appointmentTypeSchema],
  },
  partTypes: {
    default: { type: String, required: true },
    types: [partTypeSchema],
  },
});

// This middleware on pre-save checks if config document exists
configSchema.pre('save', async function () {
  try {
    const count = await this.constructor.countDocuments({});
    if (count > 0) {
      throw new Error('Cannot add more than one configuration object');
    }
  } catch (err) {
    throw err;
  }
});

async function initializeConfig() {
  try {
    const count = await Config.countDocuments();

    if (count === 0) {
      await Config.create(exampleConfig);
      console.log('Example config added successfully!');
    } else {
      console.log('Config collection already contains documents.');
    }
  } catch (err) {
    console.error(err);
  }
}

const Config = mongoose.model('Config', configSchema);
initializeConfig();

module.exports = Config;
