if (typeof T === 'undefined') require('../setup');

(function () {
  T('toJSON');

  function t(n, expected) {
    T.assertEqual(expected, new Decimal(n).toJSON());
  }

  Decimal.config({
    toExpNeg: -9e15,
    toExpPos: 9e15,
    minE: -9e15,
    maxE: 9e15
  });

  // Base 88
  // 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~

  //    0   0     g  16    w  32    M  48    $  64    ]  80
  //    1   1     h  17    x  33    N  49    %  65    ^  81
  //    2   2     i  18    y  34    O  50    (  66    _  82
  //    3   3     j  19    z  35    P  51    )  67    `  83
  //    4   4     k  20    A  36    Q  52    *  68    {  84
  //    5   5     l  21    B  37    R  53    +  69    |  85
  //    6   6     m  22    C  38    S  54    ,  70    }  86
  //    7   7     n  23    D  39    T  55    -  71    ~  87
  //    8   8     o  24    E  40    U  56    .  72
  //    9   9     p  25    F  41    V  57    /  73
  //    a  10     q  26    G  42    W  58    :  74
  //    b  11     r  27    H  43    X  59    ;  75
  //    c  12     s  28    I  44    Y  60    =  76
  //    d  13     t  29    J  45    Z  61    ?  77
  //    e  14     u  30    K  46    !  62    @  78
  //    f  15     v  31    L  47    #  63    [  79

  // 0123456789abcdefghijklmnopqrstuvwxyzABCDE  [0, 40]
  // FGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^  [-0, -40]
  // _  82 -Infinity
  // `  83 Infinity
  // {  84 NaN
  // |  85
  // }  86
  // ~  87

  t('-40', '^');
  t('-1', 'G');
  t('-0', 'F');
  t('0', '0');
  t('1', '1');
  t('15', 'f');
  t('40', 'E');

  t('-Infinity', '_');
  t('Infinity', '`');
  t('NaN', '{');

  t('-41', 'w0');
  t('41', '00');
  t('-2856', '#~');
  t('2856', 'v~');

  t('0.1', ',1');
  t('0.01', '+1');
  t('0.001', '*1');
  t('0.0001', ')1');
  t('1', '1');
  t('10', 'a');
  t('100', '0X');
  t('1000', 'a[');
  t('1.5', '-f');
  t('123456789.87654321', '[3C7]NAda1');
  t('1234567890000.0000000987654321', '1c7yH67}?[lk2mc:%');

  t('-0.1', '_1');
  t('-0.01', '^1');
  t('-0.001', ']1');
  t('-0.0001', 'N41');
  t('-1', 'G');
  t('-10', 'P');
  t('-100', 'wX');
  t('-1000', 'G[');
  t('-1.5', '`f');
  t('-123456789.87654321', 'x83C7]NAda1');
  t('-1234567890000.0000000987654321', 'xc7yH67}?[lk2mc:%');

  t('0.00000009876543212345678987654321', 'h8J+]nxS}gN-^oN');
  t('-0.00000009876543212345678987654321', 'N8J+]nxS}gN-^oN');
  t('1.00000009876543212345678987654321', '-7$yQ@UAPUk2SZ#XQh');

  T.stop();
})();
