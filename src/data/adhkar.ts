import type { Category, Dhikr } from './types';

/*
 * Content is drawn from the Qur'an and from the authentic supplications
 * compiled in Ḥiṣn al-Muslim (Fortress of the Muslim). Translations are
 * meaning-based renderings, not word-for-word.
 */

// ---------------------------------------------------------------------------
// Shared passages
// ---------------------------------------------------------------------------

const ayatAlKursi = (id: string): Dhikr => ({
  id,
  arabic:
    'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nاللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
  repeat: 1,
  translation: {
    en: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who could intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth, and their preservation does not tire Him. And He is the Most High, the Most Great.',
    fr: 'Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient tout ce qui est dans les cieux et sur la terre. Qui peut intercéder auprès de Lui sans Sa permission ? Il connaît leur passé et leur futur, et de Sa science ils n’embrassent que ce qu’Il veut. Son Trône déborde les cieux et la terre, dont la garde ne Lui coûte aucune peine. Et Il est le Très-Haut, le Très-Grand.',
  },
  source: 'Qur’an 2:255',
});

const ikhlas = (id: string, repeat = 3): Dhikr => ({
  id,
  arabic:
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
  repeat,
  translation: {
    en: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is none comparable to Him.',
    fr: 'Dis : Il est Allah, Unique. Allah, le Seul à être imploré. Il n’a jamais engendré, n’a pas été engendré, et nul n’est égal à Lui.',
  },
  source: 'Qur’an 112 · Abū Dāwūd, at-Tirmidhī',
});

const falaq = (id: string, repeat = 3): Dhikr => ({
  id,
  arabic:
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
  repeat,
  translation: {
    en: 'Say: I seek refuge in the Lord of daybreak, from the evil of what He created, from the evil of darkness when it settles, from the evil of those who blow on knots, and from the evil of an envier when he envies.',
    fr: 'Dis : Je cherche refuge auprès du Seigneur de l’aube naissante, contre le mal de ce qu’Il a créé, contre le mal de l’obscurité quand elle s’approfondit, contre le mal de celles qui soufflent sur les nœuds, et contre le mal de l’envieux quand il envie.',
  },
  source: 'Qur’an 113 · Abū Dāwūd, at-Tirmidhī',
});

const nas = (id: string, repeat = 3): Dhikr => ({
  id,
  arabic:
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
  repeat,
  translation: {
    en: 'Say: I seek refuge in the Lord of mankind, the King of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers in the breasts of mankind, from among the jinn and mankind.',
    fr: 'Dis : Je cherche refuge auprès du Seigneur des hommes, le Souverain des hommes, Dieu des hommes, contre le mal du mauvais conseiller furtif, qui souffle le mal dans les poitrines des hommes, qu’il soit djinn ou humain.',
  },
  source: 'Qur’an 114 · Abū Dāwūd, at-Tirmidhī',
});

const sayyidAlIstighfar = (id: string): Dhikr => ({
  id,
  arabic:
    'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
  repeat: 1,
  translation: {
    en: 'O Allah, You are my Lord; there is no deity but You. You created me and I am Your servant, and I keep Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me and I acknowledge my sin, so forgive me, for none forgives sins but You.',
    fr: 'Ô Allah, Tu es mon Seigneur, il n’y a de divinité que Toi. Tu m’as créé et je suis Ton serviteur. Je respecte Ton pacte et Ta promesse autant que je le peux. Je cherche refuge auprès de Toi contre le mal que j’ai commis. Je reconnais Ton bienfait envers moi et je reconnais mon péché ; pardonne-moi donc, car nul ne pardonne les péchés à part Toi.',
  },
  source: 'al-Bukhārī',
});

const afiyah = (id: string): Dhikr => ({
  id,
  arabic:
    'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ',
  repeat: 3,
  translation: {
    en: 'O Allah, grant me well-being in my body. O Allah, grant me well-being in my hearing. O Allah, grant me well-being in my sight. There is no deity but You. O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. There is no deity but You.',
    fr: 'Ô Allah, accorde-moi la santé dans mon corps. Ô Allah, accorde-moi la santé dans mon ouïe. Ô Allah, accorde-moi la santé dans ma vue. Il n’y a de divinité que Toi. Ô Allah, je cherche refuge auprès de Toi contre la mécréance et la pauvreté, et contre le châtiment de la tombe. Il n’y a de divinité que Toi.',
  },
  source: 'Abū Dāwūd',
});

const afwWaAfiyah = (id: string): Dhikr => ({
  id,
  arabic:
    'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
  repeat: 1,
  translation: {
    en: 'O Allah, I ask You for pardon and well-being in this world and the next. O Allah, I ask You for pardon and well-being in my religion, my worldly life, my family and my wealth. O Allah, conceal my faults and calm my fears. O Allah, protect me from in front of me and behind me, from my right and my left, and from above me; and I seek refuge in Your greatness from being struck down from beneath me.',
    fr: 'Ô Allah, je Te demande le pardon et la santé dans ce monde et dans l’au-delà. Ô Allah, je Te demande le pardon et la santé dans ma religion, ma vie, ma famille et mes biens. Ô Allah, couvre mes défauts et apaise mes craintes. Ô Allah, protège-moi par-devant, par-derrière, à ma droite, à ma gauche et par-dessus, et je cherche refuge dans Ta grandeur contre une attaque venant d’en dessous de moi.',
  },
  source: 'Abū Dāwūd, Ibn Mājah',
});

const bismillahLaYadurr = (id: string): Dhikr => ({
  id,
  arabic:
    'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ',
  repeat: 3,
  translation: {
    en: 'In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.',
    fr: 'Au nom d’Allah, avec le nom duquel rien sur terre ni dans le ciel ne peut nuire, et Il est Celui qui entend tout, Celui qui sait tout.',
  },
  source: 'Abū Dāwūd, at-Tirmidhī',
});

const raditu = (id: string): Dhikr => ({
  id,
  arabic:
    'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
  repeat: 3,
  translation: {
    en: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad ﷺ as my Prophet.',
    fr: 'Je suis satisfait d’Allah comme Seigneur, de l’islam comme religion et de Muhammad ﷺ comme Prophète.',
  },
  source: 'Abū Dāwūd, at-Tirmidhī',
});

const yaHayy = (id: string): Dhikr => ({
  id,
  arabic:
    'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
  repeat: 1,
  translation: {
    en: 'O Ever-Living, O Sustainer, by Your mercy I seek help. Set right all my affairs, and do not leave me to myself even for the blink of an eye.',
    fr: 'Ô Vivant, Ô Celui qui subsiste par Lui-même, c’est par Ta miséricorde que j’implore secours. Améliore toutes mes affaires et ne m’abandonne pas à moi-même, ne serait-ce qu’un clin d’œil.',
  },
  source: 'al-Ḥākim',
});

const hasbiyallah = (id: string): Dhikr => ({
  id,
  arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
  repeat: 7,
  translation: {
    en: 'Allah is sufficient for me; there is no deity but Him. In Him I place my trust, and He is the Lord of the Mighty Throne.',
    fr: 'Allah me suffit, il n’y a de divinité que Lui. En Lui je place ma confiance, et Il est le Seigneur du Trône immense.',
  },
  source: 'Abū Dāwūd · Qur’an 9:129',
});

const tahlil = (id: string, repeat: number): Dhikr => ({
  id,
  arabic:
    'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
  repeat,
  translation: {
    en: 'There is no deity but Allah alone, without partner. His is the dominion and His is the praise, and He is over all things capable.',
    fr: 'Il n’y a de divinité qu’Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose.',
  },
  source: 'Muslim, an-Nasāʾī',
});

const subhanAllahWaBihamdih = (id: string): Dhikr => ({
  id,
  arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
  repeat: 100,
  translation: {
    en: 'Glory be to Allah and praise be to Him.',
    fr: 'Gloire et louange à Allah.',
  },
  source: 'Muslim',
});

const salawat = (id: string): Dhikr => ({
  id,
  arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
  repeat: 10,
  translation: {
    en: 'O Allah, send prayers and peace upon our Prophet Muhammad.',
    fr: 'Ô Allah, prie sur notre Prophète Muhammad et accorde-lui la paix.',
  },
  source: 'aṭ-Ṭabarānī',
});

const tasbih = (prefix: string, akbarCount: 33 | 34): Dhikr[] => [
  {
    id: `${prefix}-subhanallah`,
    arabic: 'سُبْحَانَ اللَّهِ',
    repeat: 33,
    translation: { en: 'Glory be to Allah.', fr: 'Gloire à Allah.' },
    source: 'al-Bukhārī, Muslim',
  },
  {
    id: `${prefix}-alhamdulillah`,
    arabic: 'الْحَمْدُ لِلَّهِ',
    repeat: 33,
    translation: { en: 'All praise is for Allah.', fr: 'Louange à Allah.' },
    source: 'al-Bukhārī, Muslim',
  },
  {
    id: `${prefix}-allahuakbar`,
    arabic: 'اللَّهُ أَكْبَرُ',
    repeat: akbarCount,
    translation: { en: 'Allah is the Greatest.', fr: 'Allah est le Plus Grand.' },
    source: 'al-Bukhārī, Muslim',
  },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

const morning: Category = {
  id: 'morning',
  icon: 'weather-sunny',
  daily: true,
  title: { en: 'Morning', fr: 'Matin', ar: 'أذكار الصباح' },
  subtitle: {
    en: 'From dawn until sunrise',
    fr: 'De l’aube au lever du soleil',
    ar: 'من الفجر إلى طلوع الشمس',
  },
  items: [
    ayatAlKursi('m-kursi'),
    ikhlas('m-ikhlas'),
    falaq('m-falaq'),
    nas('m-nas'),
    {
      id: 'm-asbahna',
      arabic:
        'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      repeat: 1,
      translation: {
        en: 'We have entered the morning and the whole kingdom belongs to Allah. Praise is for Allah. There is no deity but Allah alone, without partner; His is the dominion and the praise, and He is over all things capable. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.',
        fr: 'Nous voici au matin et la royauté appartient à Allah. Louange à Allah. Il n’y a de divinité qu’Allah, Seul, sans associé ; à Lui la royauté et la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de ce jour et de ce qui le suit, et je cherche refuge auprès de Toi contre le mal de ce jour et de ce qui le suit. Seigneur, je cherche refuge auprès de Toi contre la paresse et les maux de la vieillesse. Seigneur, je cherche refuge auprès de Toi contre le châtiment du Feu et celui de la tombe.',
      },
      source: 'Muslim',
    },
    {
      id: 'm-bika',
      arabic:
        'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      repeat: 1,
      translation: {
        en: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
        fr: 'Ô Allah, c’est par Toi que nous atteignons le matin et par Toi que nous atteignons le soir, par Toi nous vivons et par Toi nous mourons, et vers Toi est la résurrection.',
      },
      source: 'at-Tirmidhī',
    },
    sayyidAlIstighfar('m-sayyid'),
    afiyah('m-afiyah'),
    afwWaAfiyah('m-afw'),
    bismillahLaYadurr('m-bismillah'),
    raditu('m-raditu'),
    yaHayy('m-hayy'),
    hasbiyallah('m-hasbi'),
    {
      id: 'm-adada',
      arabic:
        'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
      repeat: 3,
      translation: {
        en: 'Glory be to Allah and praise be to Him, as many times as the number of His creation, as much as pleases Him, as much as the weight of His Throne, and as much as the ink of His words.',
        fr: 'Gloire et louange à Allah, autant que le nombre de Ses créatures, autant qu’il Lui plaît, autant que le poids de Son Trône et autant que l’encre de Ses paroles.',
      },
      source: 'Muslim',
    },
    tahlil('m-tahlil', 10),
    subhanAllahWaBihamdih('m-subhan'),
    {
      id: 'm-istighfar',
      arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      repeat: 100,
      translation: {
        en: 'I seek the forgiveness of Allah and I repent to Him.',
        fr: 'Je demande pardon à Allah et je me repens à Lui.',
      },
      source: 'al-Bukhārī, Muslim',
    },
    salawat('m-salawat'),
  ],
};

const evening: Category = {
  id: 'evening',
  icon: 'weather-night',
  daily: true,
  title: { en: 'Evening', fr: 'Soir', ar: 'أذكار المساء' },
  subtitle: {
    en: 'From afternoon (ʿAṣr) until night',
    fr: 'De l’après-midi (ʿAṣr) à la nuit',
    ar: 'من العصر إلى الليل',
  },
  items: [
    ayatAlKursi('e-kursi'),
    ikhlas('e-ikhlas'),
    falaq('e-falaq'),
    nas('e-nas'),
    {
      id: 'e-amsayna',
      arabic:
        'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
      repeat: 1,
      translation: {
        en: 'We have entered the evening and the whole kingdom belongs to Allah. Praise is for Allah. There is no deity but Allah alone, without partner; His is the dominion and the praise, and He is over all things capable. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.',
        fr: 'Nous voici au soir et la royauté appartient à Allah. Louange à Allah. Il n’y a de divinité qu’Allah, Seul, sans associé ; à Lui la royauté et la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de cette nuit et de ce qui la suit, et je cherche refuge auprès de Toi contre le mal de cette nuit et de ce qui la suit. Seigneur, je cherche refuge auprès de Toi contre la paresse et les maux de la vieillesse. Seigneur, je cherche refuge auprès de Toi contre le châtiment du Feu et celui de la tombe.',
      },
      source: 'Muslim',
    },
    {
      id: 'e-bika',
      arabic:
        'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      repeat: 1,
      translation: {
        en: 'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.',
        fr: 'Ô Allah, c’est par Toi que nous atteignons le soir et par Toi que nous atteignons le matin, par Toi nous vivons et par Toi nous mourons, et vers Toi est le retour.',
      },
      source: 'at-Tirmidhī',
    },
    sayyidAlIstighfar('e-sayyid'),
    afiyah('e-afiyah'),
    afwWaAfiyah('e-afw'),
    bismillahLaYadurr('e-bismillah'),
    raditu('e-raditu'),
    yaHayy('e-hayy'),
    hasbiyallah('e-hasbi'),
    {
      id: 'e-kalimat',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      repeat: 3,
      translation: {
        en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        fr: 'Je cherche refuge dans les paroles parfaites d’Allah contre le mal de ce qu’Il a créé.',
      },
      source: 'Muslim',
    },
    tahlil('e-tahlil', 10),
    subhanAllahWaBihamdih('e-subhan'),
    salawat('e-salawat'),
  ],
};

const sleep: Category = {
  id: 'sleep',
  icon: 'power-sleep',
  daily: true,
  title: { en: 'Before sleep', fr: 'Avant de dormir', ar: 'أذكار النوم' },
  subtitle: {
    en: 'Lying down to rest',
    fr: 'En se couchant',
    ar: 'عند الخلود إلى النوم',
  },
  items: [
    {
      ...ikhlas('s-ikhlas'),
      note: {
        en: 'Cup your hands, blow into them, recite the three Quls and wipe over your body. Do this three times.',
        fr: 'Joignez les mains, soufflez dedans, récitez les trois sourates protectrices puis passez-les sur le corps. Trois fois.',
        ar: 'يجمع كفيه وينفث فيهما ويقرأ المعوذات ثم يمسح بهما ما استطاع من جسده، ثلاث مرات.',
      },
    },
    falaq('s-falaq'),
    nas('s-nas'),
    ayatAlKursi('s-kursi'),
    {
      id: 's-baqarah',
      arabic:
        'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
      repeat: 1,
      translation: {
        en: 'The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah, His angels, His books and His messengers: “We make no distinction between any of His messengers.” And they say, “We hear and we obey. Grant us Your forgiveness, our Lord, and to You is the final return.” Allah does not burden a soul beyond its capacity. It will have what it has earned and bear what it has committed. “Our Lord, do not take us to task if we forget or make a mistake. Our Lord, do not place on us a burden like that which You placed on those before us. Our Lord, do not burden us with what we cannot bear. Pardon us, forgive us and have mercy on us. You are our Protector, so grant us victory over the disbelieving people.”',
        fr: 'Le Messager a cru en ce qu’on a fait descendre vers lui de la part de son Seigneur, et aussi les croyants : tous ont cru en Allah, en Ses anges, à Ses livres et en Ses messagers ; « Nous ne faisons aucune distinction entre Ses messagers. » Et ils ont dit : « Nous avons entendu et obéi. Seigneur, nous implorons Ton pardon. C’est à Toi que sera le retour. » Allah n’impose à aucune âme une charge supérieure à sa capacité. Elle sera récompensée du bien qu’elle aura fait, punie du mal qu’elle aura fait. « Seigneur, ne nous châtie pas s’il nous arrive d’oublier ou de commettre une erreur. Seigneur, ne nous charge pas d’un fardeau lourd comme Tu as chargé ceux qui vécurent avant nous. Seigneur, ne nous impose pas ce que nous ne pouvons supporter. Efface nos fautes, pardonne-nous et fais-nous miséricorde. Tu es notre Maître, accorde-nous donc la victoire sur les peuples mécréants. »',
      },
      source: 'Qur’an 2:285–286 · al-Bukhārī, Muslim',
    },
    ...tasbih('s', 34),
    {
      id: 's-qini',
      arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      repeat: 3,
      translation: {
        en: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
        fr: 'Ô Allah, préserve-moi de Ton châtiment le jour où Tu ressusciteras Tes serviteurs.',
      },
      source: 'Abū Dāwūd',
    },
    {
      id: 's-bismika',
      arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      repeat: 1,
      translation: {
        en: 'In Your name, O Allah, I die and I live.',
        fr: 'C’est en Ton nom, ô Allah, que je meurs et que je vis.',
      },
      source: 'al-Bukhārī',
    },
  ],
};

const waking: Category = {
  id: 'waking',
  icon: 'weather-sunset-up',
  daily: false,
  title: { en: 'Waking up', fr: 'Au réveil', ar: 'أذكار الاستيقاظ' },
  subtitle: { en: 'On opening your eyes', fr: 'En ouvrant les yeux', ar: 'عند الاستيقاظ من النوم' },
  items: [
    {
      id: 'w-ahyana',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      repeat: 1,
      translation: {
        en: 'All praise is for Allah, who gave us life after having taken it from us, and to Him is the resurrection.',
        fr: 'Louange à Allah qui nous a rendu la vie après nous l’avoir ôtée, et vers Lui est la résurrection.',
      },
      source: 'al-Bukhārī',
    },
  ],
};

const afterPrayer: Category = {
  id: 'prayer',
  icon: 'mosque',
  daily: false,
  title: { en: 'After prayer', fr: 'Après la prière', ar: 'أذكار بعد الصلاة' },
  subtitle: {
    en: 'After each obligatory prayer',
    fr: 'Après chaque prière obligatoire',
    ar: 'بعد كل صلاة مفروضة',
  },
  items: [
    {
      id: 'p-astaghfir',
      arabic: 'أَسْتَغْفِرُ اللَّهَ',
      repeat: 3,
      translation: { en: 'I seek the forgiveness of Allah.', fr: 'Je demande pardon à Allah.' },
      source: 'Muslim',
    },
    {
      id: 'p-salam',
      arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
      repeat: 1,
      translation: {
        en: 'O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honour.',
        fr: 'Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, ô Détenteur de la majesté et de la générosité.',
      },
      source: 'Muslim',
    },
    ayatAlKursi('p-kursi'),
    ...tasbih('p', 33),
    { ...tahlil('p-tahlil', 1), source: 'Muslim' },
  ],
};

const home: Category = {
  id: 'home',
  icon: 'home-heart',
  daily: false,
  title: { en: 'Home', fr: 'Maison', ar: 'المنزل' },
  subtitle: {
    en: 'Leaving and entering the house',
    fr: 'En sortant et en entrant',
    ar: 'عند الخروج والدخول',
  },
  items: [
    {
      id: 'h-leave',
      arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      repeat: 1,
      translation: {
        en: 'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
        fr: 'Au nom d’Allah, je place ma confiance en Allah, et il n’y a de force ni de puissance qu’en Allah.',
      },
      note: { en: 'When leaving home.', fr: 'En sortant de la maison.', ar: 'عند الخروج من المنزل.' },
      source: 'Abū Dāwūd, at-Tirmidhī',
    },
    {
      id: 'h-enter',
      arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
      repeat: 1,
      translation: {
        en: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.',
        fr: 'Au nom d’Allah nous entrons, au nom d’Allah nous sortons, et c’est en notre Seigneur que nous plaçons notre confiance.',
      },
      note: {
        en: 'When entering home, then greet its people with salām.',
        fr: 'En entrant, puis saluez les vôtres par le salām.',
        ar: 'عند دخول المنزل، ثم يسلّم على أهله.',
      },
      source: 'Abū Dāwūd',
    },
  ],
};

const travel: Category = {
  id: 'travel',
  icon: 'airplane',
  daily: false,
  title: { en: 'Travel', fr: 'Voyage', ar: 'السفر' },
  subtitle: { en: 'Setting out and returning', fr: 'Au départ et au retour', ar: 'عند السفر والرجوع' },
  items: [
    {
      id: 't-takbir',
      arabic: 'اللَّهُ أَكْبَرُ',
      repeat: 3,
      translation: { en: 'Allah is the Greatest.', fr: 'Allah est le Plus Grand.' },
      note: {
        en: 'Once seated in your vehicle.',
        fr: 'Une fois installé dans votre moyen de transport.',
        ar: 'إذا استوى على راحلته.',
      },
      source: 'Muslim',
    },
    {
      id: 't-safar',
      arabic:
        'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ',
      repeat: 1,
      translation: {
        en: 'Glory be to Him who has subjected this to us, for we could never have done it ourselves, and to our Lord we will surely return. O Allah, we ask You on this journey for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance. O Allah, You are the Companion on the journey and the Guardian of the family. O Allah, I seek refuge in You from the hardships of travel, from a distressing sight, and from an evil return in wealth and family.',
        fr: 'Gloire à Celui qui a mis ceci à notre service alors que nous n’en étions pas capables, et c’est vers notre Seigneur que nous retournerons. Ô Allah, nous Te demandons dans ce voyage la bonté et la piété, et des œuvres qui Te satisfont. Ô Allah, facilite-nous ce voyage et raccourcis-en la distance. Ô Allah, Tu es le Compagnon du voyage et Celui qui veille sur la famille. Ô Allah, je cherche refuge auprès de Toi contre les fatigues du voyage, les spectacles affligeants et un mauvais retour concernant les biens et la famille.',
      },
      source: 'Muslim',
    },
    {
      id: 't-return',
      arabic: 'آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ',
      repeat: 1,
      translation: {
        en: 'We return, repentant, worshipping, and praising our Lord.',
        fr: 'Nous revenons, repentants, adorant notre Seigneur et Le louant.',
      },
      note: {
        en: 'Add this on the way back.',
        fr: 'À ajouter au retour.',
        ar: 'ويزيد هذا عند الرجوع.',
      },
      source: 'Muslim',
    },
  ],
};

const eating: Category = {
  id: 'eating',
  icon: 'silverware-fork-knife',
  daily: false,
  title: { en: 'Eating', fr: 'Repas', ar: 'الطعام' },
  subtitle: { en: 'Before and after meals', fr: 'Avant et après le repas', ar: 'قبل الطعام وبعده' },
  items: [
    {
      id: 'f-bismillah',
      arabic: 'بِسْمِ اللَّهِ',
      repeat: 1,
      translation: { en: 'In the name of Allah.', fr: 'Au nom d’Allah.' },
      note: {
        en: 'If you forget at the start, say: “Bismillāhi awwalahu wa ākhirahu”.',
        fr: 'Si vous oubliez au début, dites : « Bismillāhi awwalahu wa ākhirahu ».',
        ar: 'فإن نسي في أوله فليقل: بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ.',
      },
      source: 'Abū Dāwūd, at-Tirmidhī',
    },
    {
      id: 'f-after',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      repeat: 1,
      translation: {
        en: 'All praise is for Allah who fed me this and provided it for me without any might or power from myself.',
        fr: 'Louange à Allah qui m’a nourri de ceci et me l’a accordé sans force ni puissance de ma part.',
      },
      source: 'Abū Dāwūd, at-Tirmidhī',
    },
  ],
};

const distress: Category = {
  id: 'distress',
  icon: 'hand-heart',
  daily: false,
  title: { en: 'Anxiety & distress', fr: 'Angoisse et peine', ar: 'الهم والكرب' },
  subtitle: {
    en: 'When the heart feels heavy',
    fr: 'Quand le cœur est lourd',
    ar: 'عند ضيق الصدر',
  },
  items: [
    {
      id: 'd-karb',
      arabic:
        'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
      repeat: 1,
      translation: {
        en: 'There is no deity but Allah, the Mighty, the Forbearing. There is no deity but Allah, Lord of the Mighty Throne. There is no deity but Allah, Lord of the heavens, Lord of the earth and Lord of the Noble Throne.',
        fr: 'Il n’y a de divinité qu’Allah, l’Immense, le Longanime. Il n’y a de divinité qu’Allah, Seigneur du Trône immense. Il n’y a de divinité qu’Allah, Seigneur des cieux, Seigneur de la terre et Seigneur du Trône noble.',
      },
      source: 'al-Bukhārī, Muslim',
    },
    {
      id: 'd-yunus',
      arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      repeat: 1,
      translation: {
        en: 'There is no deity but You; glory be to You. Indeed, I have been among the wrongdoers.',
        fr: 'Il n’y a de divinité que Toi ; gloire à Toi. J’ai été parmi les injustes.',
      },
      source: 'Qur’an 21:87 · at-Tirmidhī',
    },
    {
      id: 'd-hamm',
      arabic:
        'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
      repeat: 1,
      translation: {
        en: 'O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from miserliness and cowardice, from the burden of debt and from being overpowered by others.',
        fr: 'Ô Allah, je cherche refuge auprès de Toi contre le souci et la tristesse, l’incapacité et la paresse, l’avarice et la lâcheté, le poids des dettes et la domination des hommes.',
      },
      source: 'al-Bukhārī',
    },
    yaHayy('d-hayy'),
    hasbiyallah('d-hasbi'),
  ],
};

export const CATEGORIES: Category[] = [
  morning,
  evening,
  sleep,
  waking,
  afterPrayer,
  home,
  travel,
  eating,
  distress,
];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

/** Which daily routine fits the current hour. */
export function suggestedCategoryId(date = new Date()): string {
  const h = date.getHours();
  if (h >= 3 && h < 12) return 'morning';
  if (h >= 12 && h < 21) return 'evening';
  return 'sleep';
}
