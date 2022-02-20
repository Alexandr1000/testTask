export const INVALID_FIO_INPUT  = 'Фамилия должна состоять не менее 3 символов. Пример: Пушкин А.С.';

export const REGFIO = /^[А-ЯA-Z][a-яa-z]{2,} [А-ЯA-Z]\.[А-ЯA-Z]\.$/;

export const TABLEINIT = [
  {
    id: 0,
    selectedRow: false,
    FIO: 'Человек X.A.',
    date: new Date(2011, 0, 1),
    gender: 'm',
    dopInfo: {
      bloodType: 1,
      numberOfChildren: 4,
    }
  },
  {
    id: 1,
    selectedRow: true,
    FIO: 'Человекa T.A.',
    date: new Date(2012, 1, 1),
    gender: 'w',
    dopInfo: {
      bloodType: 4,
      numberOfChildren: 6,
    }
  },  {
    id: 2,
    selectedRow: true,
    FIO: 'Человекaчка T.A.',
    date: new Date(2013, 1, 1),
    gender: 'w',
    dopInfo: {
      bloodType: 3,
      numberOfChildren: 1,
    }
  },  {
    id: 3,
    selectedRow: false,
    FIO: 'Человекaчок T.A.',
    date: new Date(2001, 1, 1),
    gender: 'w',
    dopInfo: {
      bloodType: 3,
      numberOfChildren: 3,
    }
  },
]