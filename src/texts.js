export function getText(text, language, data) {
  if (language === '1') {
    return data[text].am;
  } else if (language === '2') {
    return data[text].en;
  } else {
    return data[text].ru;
  }
}

export const barText = {
  home: {
    am: 'Գլխավոր',
    en: 'home',
    ru: 'главная',
  },
  about: {
    en: 'About',
    ru: 'О нас',
    am: 'Մեր մասին',
  },
  news: {
    en: 'News',
    ru: 'Новости',
    am: 'Նորություններ',
  },
  signIn: {
    en: 'Sign in',
    ru: 'Войти',
    am: 'Մուտք',
  },
  signUp: {
    en: 'Sign up',
    ru: 'Зарегистрироваться',
    am: 'Գրանցվել',
  },
};

export const textSideBar = {
  home: {
    am: 'Գլխավոր',
    en: 'Home',
    ru: 'Главная',
  },
  onRoad: {
    am: 'Ճանապարհին',
    en: 'On the raod',
    ru: 'На дороге',
  },
  general: {
    am: 'Ընդհանուր',
    en: 'General',
    ru: 'Общее',
  },
  inGeorgia: {
    am: 'Վրաստանում',
    en: 'In Georgia',
    ru: 'В Грузии',
  },
  inArmenia: {
    am: 'Հայաստանում',
    en: 'In Armenia',
    ru: 'В Армении',
  },
  cars: {
    am: 'Մեքենաներ',
    en: 'Autos',
    ru: 'Автомобили',
  },
  tyres: {
    en: 'Tyres',
    ru: 'Шины',
    am: 'Անվադողեր',
  },
  choose: {
    en: 'Choose',
    ru: 'Выбирать',
    am: 'Ընտրեք',
  },
  wheels: {
    en: 'Wheels',
    ru: 'Диски',
    am: 'Անիվներ',
  },
  discount: {
    en: 'Discount',
    ru: 'Скидка',
    am: 'Զեղչ',
  },
  partners: {
    en: 'Partners',
    ru: 'Партнерам',
    am: 'Գործընկերներ   ',
  },
  news: {
    en: 'News',
    ru: 'Новости',
    am: 'Նորություններ',
  },
  customers: {
    en: 'Customers',
    ru: 'Покупателям',
    am: 'Գնորդներին',
  },
  about: {
    en: 'About',
    ru: 'О нас',
    am: 'Մեր մասին',
  },
  balance: {
    en: 'Tire fitting',
    ru: 'Шиномонтаж',
    am: 'Անվադողերի տեղադրում',
  },
  news: {
    en: 'News',
    ru: 'Новости',
    am: 'Նորություններ',
  },
  signIn: {
    en: 'Sign in',
    ru: 'Войти',
    am: 'Մուտք',
  },
};

export const textSignInUp = {
  signIn: {
    en: 'Sign in',
    ru: 'Войти',
    am: 'Մուտք',
  },
  email: {
    en: 'Email Address',
    ru: 'Электронная почта',
    am: 'Էլեկտրոնային հասցե',
  },
  password: {
    en: 'Password',
    ru: 'Пароль',
    am: 'Գաղտնաբառ',
  },
  remember: {
    en: 'Password',
    ru: 'Запомнить меня',
    am: 'Հիշիր ինձ',
  },
  signInGoogle: {
    en: ' Sign in with Google',
    ru: 'Войти через Google',
    am: 'Մուտք գործեք Google-ով',
  },
  forgotPassword: {
    en: 'Forgot password?',
    ru: 'Забыли пароль?',
    am: 'Մոռացել եք գաղտնաբառը?',
  },
  noAcount: {
    en: "Don't have an account? Sign Up",
    ru: 'У вас нет аккаунта? Зарегистрироваться',
    am: 'Չունե՞ք հաշիվ: Գրանցվել',
  },
  signUp: {
    en: 'Sign up',
    ru: 'Зарегистрироваться',
    am: 'Գրանցվել',
  },
  name: {
    en: 'First Name',
    ru: 'Имя',
    am: 'Անուն',
  },
  srName: {
    en: 'Last Name',
    ru: 'Фамилия',
    am: 'Ազգանուն',
  },
  getNot: {
    en: 'I want to receive inspiration, marketing promotions and updates via email.',
    ru: 'Я хочу получать вдохновение, маркетинговые акции и обновления по электронной почте.',
    am: 'Ես ուզում եմ ստանալ ոգեշնչում, մարքեթինգային առաջխաղացումներ և թարմացումներ էլփոստի միջոցով:',
  },
  signUpGoogle: {
    en: 'Sign up with Google',
    ru: 'Зарегистрируйтесь в Google',
    am: 'Գրանցվեք Google-ի հետ',
  },
  haveAccount: {
    en: 'Already have an account? Sign in',
    ru: 'У вас уже есть аккаунт? Войти',
    am: 'Արդեն ունեք հաշիվ? Մուտք գործել',
  },
  //   srName: {
  //     en: 'Last Name *',
  //     ru: 'Фамилия *',
  //     am: 'Ազգանուն *',
  //   },
};

export const textHomePage = {
  passenger: {
    en: 'Passenger',
    ru: 'Легковым',
    am: 'Մարդատար',
  },
  trucks: {
    en: 'Trucks',
    ru: 'Грузовикам',
    am: 'Բեռնատար',
  },
  chooseTyre: {
    en: 'Tyres',
    ru: 'Шины',
    am: 'Անվադողեր',
  },
  chooseWheel: {
    en: 'Wheels',
    ru: 'Колеса',
    am: 'Անիվներ',
  },
  width: {
    en: 'Width',
    ru: 'Ширина',
    am: 'Լայնությունը',
  },
  profile: {
    en: 'Height',
    ru: 'Профиль',
    am: 'Պրոֆիլ',
  },
  diameter: {
    en: 'Diameter',
    ru: 'Диаметр',
    am: 'Տրամագիծը',
  },
  discountedItems: {
    en: 'Discounted items',
    ru: 'Товары со скидкой',
    am: 'Զեղչված ապրանքներ',
  },
  topTyres: {
    en: 'Top tires',
    ru: 'Топ шины',
    am: 'Տոպ անվադողեր',
  },
  searchResult: {
    en: 'Searching results',
    ru: 'Результаты поиска',
    am: 'Որոնման արդյունքները',
  },
  summer: {
    en: 'Summer',
    ru: 'Летние',
    am: 'Ամառ',
  },
  winter: {
    en: 'Winter',
    ru: 'Зимние',
    am: 'Ձմեռ',
  },
  allSeason: {
    en: 'All season',
    ru: 'Всесезонные',
    am: 'Ամբողջ սեզոնի',
  },
  search: {
    en: 'Search',
    ru: 'Поиск',
    am: 'Փնտրել',
  },
  bolt: {
    en: 'Вылет',
    ru: 'Вылет',
    am: 'Вылет',
  },
  from: {
    en: 'from',
    ru: 'от',
    am: 'սկս',
  },
  to: {
    en: 'to',
    ru: 'до',
    am: 'մին',
  },
  SUV: {
    en: 'SUV',
    ru: 'Внедорожник',
    am: 'Ամենագնաց',
  },
  all: {
    en: 'All',
    ru: 'Все',
    am: 'Ամբողջը',
  },
  apply: {
    en: 'Apply',
    ru: 'Показать',
    am: 'Կիրառել',
  },
  reset: {
    en: 'Reset',
    ru: 'Сбросить',
    am: 'Չեղարկել',
  },
  manufacturers: {
    en: 'Manufacturers',
    ru: 'Производители',
    am: 'Արտադրողներ',
  },
  addCart: {
    en: 'Add to Cart',
    ru: 'Добавить в корзину',
    am: 'Ավելացնել զամբյուղ',
  },
  smallTruck: {
    en: 'Small trucks and commercial (up to 3.5 tons)',
    ru: 'Малые грузовики и коммерческий (до 3,5 тонн)',
    am: 'Փոքր բեռնատարներ և կոմերցիոն (մինչև 3,5 տոննա)',
  },
  carType: {
    en: 'Vehicle type',
    ru: 'Тип автомобиля',
    am: 'Տրանսպորտի տեսակը',
  },
  uniquePrice: {
    en: 'Price for one',
    ru: 'Цена за штуку',
    am: 'Մեկ հատի գինը',
  },
  settings: {
    en: 'Extra options',
    ru: 'Дополнительные параметры',
    am: 'Լրացուցիչ պարամետրեր',
  },
};

export const textCopartCars = {
  cars: {
    en: 'Cars',
    ru: 'Автомобили',
    am: 'Ավտոմեքենաներ',
  },
};
