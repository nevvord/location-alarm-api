type TLacole =
  | 'uk'
  | 'en'
  | 'fr'
  | 'de'
  | 'es'
  | 'it'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'ar'
  | 'hi'
  | 'pt'
  | 'nl'
  | 'sv'
  | 'fi'
  | 'da'
  | 'no'
  | 'pl'
  | 'cs'
  | 'sk'
  | 'hu'
  | 'tr'
  | 'th'
  | 'vi'
  | 'id'
  | 'ms'
  | 'tl'
  | 'el'
  | 'ro'
  | 'bg'
  | 'hr'
  | 'sr'
  | 'sq'
  | 'sl'
  | 'mk'
  | 'be'
  | 'ka'
  | 'hy'
  | 'lv'
  | 'lt'
  | 'et'
  | 'gl'
  | 'eu'
  | 'cy'
  | 'ga'
  | 'mt'
  | 'is';

export interface UserInfoInterface {
  sub: string; //'107002865617408159312';
  name: string; //'Andrii Andrieiev';
  given_name?: string; //'Andrii';
  family_name?: string; //'Andrieiev';
  picture?: string; //'https://lh3.googleusercontent.com/a/ACg8ocLfjM3Db2GivcmFPh6vGqnXlMb_586T6nCz3QaMAMFB=s96-c';
  email: string; //'proph7000@gmail.com';
  email_verified: boolean; //true;
  locale: TLacole; //'uk';
}
