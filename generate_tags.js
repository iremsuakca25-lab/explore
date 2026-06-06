const fs = require('fs');

const tags = {
    'fethiyeparasut': {
        type: 'domestic',
        badge: 'Yurtiçi',
        title: 'Fethiye Paraşüt',
        icon: '🪂',
        subtitle: 'Ölüdeniz semalarında unutulmaz bir uçuş',
        description: 'Babadağ\'dan atlayış ile Ölüdeniz\'in turkuaz sularını kuşbakışı görün. Tandem uçuş sayesinde hiçbir deneyime ihtiyacınız yok. Dünyanın en iyi yamaç paraşütü merkezlerinden birinde bu heyecanı yaşayın.',
        stats: [{ value: '1960m', label: 'Yükseklik' }, { value: '30dk', label: 'Uçuş Süresi' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '📸', title: 'Muhteşem Manzara', desc: 'Ölüdeniz lagünü, Kelebekler Vadisi ve Rodos adasına kadar uzanan bir manzara.' },
            { icon: '🪂', title: 'Tandem Uçuş', desc: 'Sertifikalı ve tecrübeli pilotlar eşliğinde %100 güvenli bir uçuş deneyimi.' }
        ],
        destinations: ['Babadağ', 'Ölüdeniz', 'Fethiye', 'Belcekız Plajı'],
        tips: ['Güneş gözlüğünüzü unutmayın.', 'Uçuş sırasında telefonunuzu pilotunuzun izniyle kullanabilirsiniz.']
    },
    'kasdalis': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Kaş Dalış', icon: '🤿',
        subtitle: 'Türkiye\'nin dalış başkenti',
        description: 'Akdeniz\'in berrak sularında; batıkları, kanyonları ve zengin su altı canlılığını keşfedin. Kaş, hem yeni başlayanlar hem de profesyoneller için eşsiz dalış noktaları sunar.',
        stats: [{ value: '30+', label: 'Dalış Noktası' }, { value: '25m', label: 'Görüş Mesafesi' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '✈️', title: 'Uçak Batığı', desc: 'Dakota C-47 uçak batığına yapılabilecek unutulmaz bir dalış.' },
            { icon: '🐢', title: 'Deniz Canlıları', desc: 'Caretta carettalar, orfozlar ve renkli nudibranch türlerini gözlemleme fırsatı.' }
        ],
        destinations: ['Kanyon', 'Uçak Batığı', 'Bescenler', 'Kaş Merkez'],
        tips: ['Sabah erken dalışlarında deniz daha sakin olur.', 'Dalıştan önce hafif bir kahvaltı yapın.']
    },
    'kackartrekking': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Kaçkar Trekking', icon: '🥾',
        subtitle: 'Bulutların üzerinde bir yürüyüş',
        description: 'Doğu Karadeniz\'in muhteşem doğasında, buzul gölleri, endemik bitkiler ve yemyeşil yaylalar arasında geçen zorlu ama büyüleyici bir trekking rotası.',
        stats: [{ value: '3932m', label: 'Zirve' }, { value: '4-6 Gün', label: 'Süre' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🏔️', title: 'Buzul Gölleri', desc: 'Deniz Gölü ve Yedigöller gibi doğa harikası oluşumlar.' },
            { icon: '🏕️', title: 'Yayla Kültürü', desc: 'Ayder, Pokut, Sal gibi yaylalarda yöresel kültür ve kamp deneyimi.' }
        ],
        destinations: ['Ayder', 'Kavrun', 'Deniz Gölü', 'Pokut'],
        tips: ['Katmanlı giyinin, hava aniden soğuyabilir.', 'Sağlam bir trekking botu ve su geçirmez ekipman şart.']
    },
    'isvicrealplertrekking': {
        type: 'international', badge: 'Yurtdışı', title: 'İsviçre Alpleri', icon: '⛰️',
        subtitle: 'Avrupa\'nın çatısında doğa yürüyüşü',
        description: 'Dünyaca ünlü Matterhorn ve Jungfrau zirvelerinin eteklerinde, buzul vadileri ve kristal berraklığındaki Alp gölleri arasında unutulmaz bir yürüyüş deneyimi.',
        stats: [{ value: '4000m+', label: 'Zirveler' }, { value: '100+', label: 'Rota' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🏔️', title: 'Matterhorn Manzarası', desc: 'Zermatt bölgesinde dünyanın en ikonik dağının eşsiz manzarası.' },
            { icon: '🚂', title: 'Panoramik Trenler', desc: 'Yürüyüş rotalarına ulaşırken kullanılan muhteşem manzaralı Alp trenleri.' }
        ],
        destinations: ['Zermatt', 'Interlaken', 'Grindelwald', 'Chamonix'],
        tips: ['Swiss Travel Pass alarak ulaşımı ucuza getirin.', 'Yaz aylarında rotalar kalabalık olabilir, erken saatte başlayın.']
    },
    'misircolsafari': {
        type: 'international', badge: 'Yurtdışı', title: 'Mısır Çöl Safari', icon: '🐪',
        subtitle: 'Altın kumlarda sonsuzluk hissi',
        description: 'Sahra veya Sina çölünde 4x4 araçlar, ATV veya develerle yapılan macera dolu bir keşif. Bedevi köylerinde konaklama ve yıldızların altında geceleme fırsatı.',
        stats: [{ value: '3 Gün', label: 'Ort. Süre' }, { value: '40°C', label: 'Gündüz Sıcaklığı' }, { value: '⭐ 4.7', label: 'Puan' }],
        highlights: [
            { icon: '⛺', title: 'Bedevi Kampı', desc: 'Geleneksel Bedevi çadırlarında akşam yemeği ve kültür keşfi.' },
            { icon: '🌌', title: 'Yıldız Gözlemi', desc: 'Işık kirliliğinden tamamen uzak çöl gecelerinde Samanyolu manzarası.' }
        ],
        destinations: ['Sina Çölü', 'Beyaz Çöl', 'Hurghada', 'Sharm El Sheikh'],
        tips: ['Gündüz sıcağından korunmak için geniş kenarlı şapka kullanın.', 'Gece çöl çok soğuk olur, kalın kıyafet bulundurun.']
    },

    // Kültür
    'kapadokyayeraltisehirleri': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Kapadokya Yeraltı Şehirleri', icon: '🕯️',
        subtitle: 'Binlerce yıllık gizemli dehlizler',
        description: 'Derinkuyu ve Kaymaklı başta olmak üzere, tüf kayalara oyulmuş 8 katlı devasa yeraltı şehirlerinde antik dönem insanlarının izini sürün.',
        stats: [{ value: '8 Kat', label: 'Derinlik' }, { value: 'M.Ö. 800', label: 'Tarih' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '⛪', title: 'Tarihi Şapeller', desc: 'Yerin metrelerce altında gizlenmiş antik dini yapılar.' },
            { icon: '🛡️', title: 'Savunma Tünelleri', desc: 'Düşmanlardan korunmak için tasarlanmış dev sürgü taşları ve dar tüneller.' }
        ],
        destinations: ['Derinkuyu', 'Kaymaklı', 'Özkonak', 'Mazı'],
        tips: ['Klostrofobiniz varsa dar tünellere girmeden önce rehberinize danışın.', 'Yeraltı yazın bile serin olur, yanınıza ince bir hırka alın.']
    },
    'efesantikkenti': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Efes Antik Kenti', icon: '🏛️',
        subtitle: 'Antik Çağın metropolü',
        description: 'Roma İmparatorluğu\'nun en önemli şehirlerinden biri olan Efes\'te, Celsus Kütüphanesi, Büyük Tiyatro ve yamaç evlerinin muazzam kalıntıları arasında yürüyün.',
        stats: [{ value: 'M.Ö. 6000', label: 'Kuruluş' }, { value: '25.000', label: 'Tiyatro Kapasitesi' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '📚', title: 'Celsus Kütüphanesi', desc: 'Antik dönemin en büyük 3. kütüphanesinin büyüleyici restore edilmiş cephesi.' },
            { icon: '🏛️', title: 'Yamaç Evler', desc: 'Romalı zenginlerin yaşadığı muhteşem mozaiklerle kaplı villalar.' }
        ],
        destinations: ['Selçuk', 'Meryem Ana Evi', 'Şirince', 'Artemis Tapınağı'],
        tips: ['Yazın ziyaret edecekseniz sabah çok erken saatleri tercih edin.', 'Müze Kart geçerlidir, önceden edinin.']
    },
    'gobeklitepe': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Göbeklitepe', icon: '🗿',
        subtitle: 'Tarihin Sıfır Noktası',
        description: 'Stonehenge\'den ve Mısır piramitlerinden binlerce yıl daha eski olan, insanlık tarihini yeniden yazdıran dünyanın bilinen en eski kült yapılar topluluğu.',
        stats: [{ value: '12.000 Yıllık', label: 'Yaş' }, { value: 'T Sütunlar', label: 'Mimari' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🦊', title: 'Hayvan Kabartmaları', desc: 'Devasa T sütunlar üzerindeki tilki, aslan, yılan ve akrep motifleri.' },
            { icon: '🏛️', title: 'UNESCO Mirası', desc: 'İnsanlık tarihinin bilinen ilk tapınaklarının eşsiz atmosferi.' }
        ],
        destinations: ['Şanlıurfa Merkez', 'Balıklıgöl', 'Harran', 'Karahantepe'],
        tips: ['Şanlıurfa Arkeoloji Müzesi\'ni Göbeklitepe öncesi veya sonrası mutlaka gezin.', 'Alanı sanal gerçeklik ile deneyimlemeyi unutmayın.']
    },
    'romakolezyum': {
        type: 'international', badge: 'Yurtdışı', title: 'Roma Kolezyum', icon: '⚔️',
        subtitle: 'Gladyatörlerin devasa arenası',
        description: 'Antik Roma\'nın kalbi, dünyanın en büyük amfitiyatrosu. İhtişamlı mimarisiyle imparatorluğun gücünü simgeleyen bu devasa yapıda geçmişe yolculuk yapın.',
        stats: [{ value: 'M.S. 80', label: 'Yapım' }, { value: '50.000', label: 'Kapasite' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🏟️', title: 'Arena Zemin', desc: 'Gladyatörlerin dövüştüğü asıl zemin ve altındaki tünel sistemleri.' },
            { icon: '🏛️', title: 'Roma Forumu', desc: 'Kolezyum biletine dahil olan, Roma\'nın antik şehir merkezi kalıntıları.' }
        ],
        destinations: ['Roma Forumu', 'Palatino Tepesi', 'Kolezyum', 'Panteon'],
        tips: ['Biletleri aylar öncesinden online alın, kapıda saatlerce beklersiniz.', 'Rehberli tur almak yapının tarihini anlamak için çok önemli.']
    },
    'parislouvre': {
        type: 'international', badge: 'Yurtdışı', title: 'Paris Louvre', icon: '🖼️',
        subtitle: 'Dünyanın en büyük sanat müzesi',
        description: 'Mona Lisa, Milo Venüsü ve Semadirek Kanatlı Zaferi gibi paha biçilmez başyapıtların sergilendiği, eski bir Fransız sarayı olan ikonik müze.',
        stats: [{ value: '35.000+', label: 'Eser' }, { value: '73.000 m²', label: 'Alan' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🎨', title: 'Rönesans Eserleri', desc: 'Leonardo da Vinci ve diğer büyük ustaların eşsiz tabloları.' },
            { icon: '🏛️', title: 'Cam Piramit', desc: 'Ieoh Ming Pei tarafından tasarlanan müzenin meşhur modern girişi.' }
        ],
        destinations: ['Louvre Sarayı', 'Tuileries Bahçesi', 'Seine Nehri', 'Palais Royal'],
        tips: ['Müzeyi tek günde gezmek imkansızdır, en çok görmek istediğiniz eserleri önceden belirleyin.', 'Ana piramit girişi yerine Carrousel du Louvre girişini kullanın.']
    },
    'misirpiramitleri': {
        type: 'international', badge: 'Yurtdışı', title: 'Mısır Piramitleri', icon: '🛕',
        subtitle: 'Antik Dünyanın Yedi Harikası',
        description: 'Giza Platosu\'nda yükselen firavun mezarları. Keops, Kefren ve Mikerinos piramitlerinin devasa taş blokları ve Sfenks heykelinin gizemi.',
        stats: [{ value: 'M.Ö. 2500', label: 'Yapım' }, { value: '146m', label: 'Büyük Piramit' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🦁', title: 'Büyük Sfenks', desc: 'İnsan başlı aslan gövdeli, piramitlerin efsanevi bekçisi.' },
            { icon: '🔦', title: 'Mezar Odaları', desc: 'Piramitlerin içine girerek firavunların dar dehlizlerini keşfetme imkanı.' }
        ],
        destinations: ['Giza', 'Kahire', 'Sakkara', 'Mısır Müzesi'],
        tips: ['Piramitlerin içine girmek klostrofobik olabilir.', 'Deve veya at turu yaparken fiyatı önceden sıkı bir şekilde pazarlık yapın.']
    },

    // Lezzet
    'gaziantepsokaklezzetleri': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Gaziantep Lezzetleri', icon: '🌶️',
        subtitle: 'Gastronominin başkenti',
        description: 'UNESCO Gastronomi şehri Gaziantep\'te beyran çorbasından katmere, baklavadan küşlemeye kadar damak çatlatan sokak ve restoran lezzetleri turu.',
        stats: [{ value: '10+', label: 'Tadım' }, { value: 'UNESCO', label: 'Şehir' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🥣', title: 'Sabah Beyranı', desc: 'Güne gerçek Antepliler gibi sıcak ve acılı beyran çorbası içerek başlayın.' },
            { icon: '🍯', title: 'Fıstık & Baklava', desc: 'Dünyanın en iyi baklavasını tarihi çarşılardaki asırlık dükkanlarda yiyin.' }
        ],
        destinations: ['Bakırcılar Çarşısı', 'Elmacı Pazarı', 'Zeugma', 'Tahmis Kahvesi'],
        tips: ['Mide ilaçlarınızı yanınıza alın, porsiyonlar ve çeşitlilik çok fazladır.', 'Kahvaltıyı atlayıp güne doğrudan katmerle başlayabilirsiniz.']
    },
    'urlasarapbaglari': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Urla Şarap Bağları', icon: '🍷',
        subtitle: 'Ege\'nin Toskana\'sı',
        description: 'Antik çağlardan beri şarap üretilen Urla yarımadasında, modern ve butik şarap evlerini ziyaret edin. Bağların arasında gün batımında tadım yapın.',
        stats: [{ value: '7+', label: 'Bağ Evi' }, { value: 'Bornova', label: 'Üzümü' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🍇', title: 'Bağ Bozumu', desc: 'Eylül ayında düzenlenen bağ bozumu etkinliklerinde üzüm hasadına katılın.' },
            { icon: '🧀', title: 'Tadım Tabakları', desc: 'Yerel Ege peynirleri ve zeytinyağları eşliğinde premium şarap tadımları.' }
        ],
        destinations: ['Urla Bağ Yolu', 'Klazomenai', 'Sanat Sokağı', 'Çeşmealtı'],
        tips: ['Tadımlar için bağ evlerinden önceden rezervasyon yaptırın.', 'Kendi aracınız yerine tadım turlarına katılmayı tercih edin.']
    },
    'karadenizmuhlama': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Karadeniz Muhlama', icon: '🧀',
        subtitle: 'Yaylaların vazgeçilmez lezzeti',
        description: 'Rize ve Trabzon yaylalarında, mısır unu, tereyağı ve kolot peyniriyle hazırlanan efsanevi muhlama/kuymak lezzetini yerinde deneyimleyin.',
        stats: [{ value: 'Karadeniz', label: 'Bölge' }, { value: 'Kahvaltı', label: 'Öğün' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🧈', title: 'Hakiki Tereyağı', desc: 'Yüksek rakımlı yaylalarda otlayan ineklerin sütünden yapılan organik tereyağı.' },
            { icon: '⛰️', title: 'Yayla Kahvaltısı', desc: 'Bulutların üzerinde ahşap masalarda yöresel zengin bir kahvaltı sofrası.' }
        ],
        destinations: ['Ayder Yaylası', 'Uzungöl', 'Hamsiköy', 'Rize Merkez'],
        tips: ['Muhlamanın yanına şekersiz Karadeniz çayı çok iyi gider.', 'Elle koparılan taze mısır ekmeğiyle yemesi makbuldür.']
    },
    'romapizzaaltaglio': {
        type: 'international', badge: 'Yurtdışı', title: 'Roma Pizza', icon: '🍕',
        subtitle: 'Dilim dilim İtalyan lezzeti',
        description: 'Roma sokaklarında ayaküstü yenilen, fırın tepsilerinde pişip makasla kesilerek tartıyla satılan çıtır hamurlu meşhur Roma pizzası.',
        stats: [{ value: 'Roma', label: 'Şehir' }, { value: 'Sokak', label: 'Kültür' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🍅', title: 'Taze Malzemeler', desc: 'San Marzano domatesleri, taze fesleğen ve mozzarella di bufala.' },
            { icon: '✂️', title: 'Makasla Kesim', desc: 'İstediğiniz büyüklükte kesilip gramajına göre fiyatlandırılan pratik lezzet.' }
        ],
        destinations: ['Trastevere', 'Campo de Fiori', 'Testaccio', 'Roma Merkez'],
        tips: ['Günün her saati atıştırmalık olarak tüketebilirsiniz.', 'Farklı tepsilerden küçük dilimler alarak birçok çeşidi tadın.']
    },
    'pariskruvasan': {
        type: 'international', badge: 'Yurtdışı', title: 'Paris Kruvasan', icon: '🥐',
        subtitle: 'Tereyağlı Fransız sabahları',
        description: 'Paris\'in köşe başı fırınlarından (Boulangerie) sabahları yayılan taze kruvasan ve kahve kokusu eşliğinde otantik bir Fransız kahvaltısı.',
        stats: [{ value: 'Boulangerie', label: 'Mekan' }, { value: 'Sabah', label: 'Öğün' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '☕', title: 'Café au Lait', desc: 'Çıtır çıtır kruvasanı geleneksel sütlü Fransız kahvesine batırarak yeme ritüeli.' },
            { icon: '🥖', title: 'Baget & Pain au Chocolat', desc: 'Kruvasan haricinde çikolatalı çöreklerin ve taze bagetlerin tadına varın.' }
        ],
        destinations: ['Le Marais', 'Montmartre', 'Saint-Germain', 'Latin Çeyreği'],
        tips: ['"Croissant au beurre" (tereyağlı) istemeyi unutmayın, diğerleri margarinli olabilir.', 'En iyileri sabah saat 7-8 civarında fırından yeni çıkmış olanlardır.']
    },
    'fastajini': {
        type: 'international', badge: 'Yurtdışı', title: 'Fas Tajini', icon: '🍲',
        subtitle: 'Kuzey Afrika baharatları',
        description: 'Koni şeklindeki özel toprak kaplarda, kısık ateşte saatlerce pişen; et, tavuk, sebze, meyve ve aromatik baharatların muhteşem uyumu.',
        stats: [{ value: 'Marakeş', label: 'Merkez' }, { value: 'Toprak Kap', label: 'Pişirme' }, { value: '⭐ 4.7', label: 'Puan' }],
        highlights: [
            { icon: '🍋', title: 'Limon & Zeytin', desc: 'Tavuk tajinlerinde marine edilmiş limon ve yeşil zeytinlerin mayhoş tadı.' },
            { icon: '🌶️', title: 'Ras el Hanout', desc: 'Onlarca baharatın karışımından oluşan Fas mutfağının temel lezzetlendiricisi.' }
        ],
        destinations: ['Jemaa el-Fnaa', 'Fes', 'Kazablanka', 'Chefchaouen'],
        tips: ['Sokak tezgahlarında yanan kömür ateşinde pişenleri en lezzetlileridir.', 'Tajinin yanında her zaman taze Fas naneli çayı isteyin.']
    },

    // Doğa
    'rizeyaylakampi': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Rize Yayla Kampı', icon: '🏕️',
        subtitle: 'Doğanın kalbinde uyanmak',
        description: 'Rize\'nin el değmemiş yaylalarında, ahşap evlerin ve çam ormanlarının arasında çadır veya bungalov kampı. Sisten denizi ve doğanın sessizliği.',
        stats: [{ value: '2000m+', label: 'Rakım' }, { value: 'Temiz Havası', label: 'Özellik' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '☁️', title: 'Bulut Denizi', desc: 'Sabahları vadilere çöken sisin oluşturduğu görsel bir şölen.' },
            { icon: '🔥', title: 'Kamp Ateşi', desc: 'Serin yayla akşamlarında kamp ateşi etrafında toplanıp çay içme keyfi.' }
        ],
        destinations: ['Pokut', 'Gito', 'Sal Yaylası', 'Huser'],
        tips: ['Hazırlıklı gidin, yaylalarda market veya tesis bulmak zor olabilir.', 'Gece sıcaklıkları yazın bile çok düşebilir, uyku tulumunuz kaliteli olsun.']
    },
    'karscildirgolu': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Kars Çıldır Gölü', icon: '❄️',
        subtitle: 'Buz tutmuş bir gölde macera',
        description: 'Kış aylarında tamamen donan Çıldır Gölü üzerinde atlı kızaklarla gezinti yapın. Eskimo usulü buz kırılarak tutulan sarı balığın tadına bakın.',
        stats: [{ value: '1959m', label: 'Rakım' }, { value: 'Ocak-Mart', label: 'Sezon' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🐎', title: 'Atlı Kızak', desc: 'Ayna gibi parlayan buz üzerinde çıngırak sesleri eşliğinde nostaljik tur.' },
            { icon: '🐟', title: 'Sarı Balık', desc: 'Buz kırılarak gölden taze taze çıkarılan leziz sazan balığı ziyafeti.' }
        ],
        destinations: ['Çıldır Gölü', 'Kars Merkez', 'Sarıkamış', 'Ani Harabeleri'],
        tips: ['-20 dereceleri görebilirsiniz, termal içlik hayat kurtarır.', 'Güneş gözlüğü buzdan yansıyan ışıktan korunmak için şarttır.']
    },
    'yedigollersonbahar': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Yedigöller', icon: '🍁',
        subtitle: 'Sonbaharın tüm renkleri',
        description: 'Bolu Yedigöller Milli Parkı\'nda sonbaharın gelişiyle kırmızı, sarı ve turuncunun binbir tonuna bürünen kayın ve meşe ormanlarında doğa yürüyüşü.',
        stats: [{ value: '7 Göl', label: 'Alan' }, { value: 'Kasım', label: 'En İyi Dönem' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '📸', title: 'Fotoğraf Safarisi', desc: 'Göllere yansıyan sonbahar renkleri eşliğinde muazzam doğa fotoğrafları.' },
            { icon: '🚶‍♂️', title: 'Göl Yürüyüşleri', desc: 'Büyükgöl, Seringöl, Deringöl gibi göller arasında hafif parkurlu yürüyüşler.' }
        ],
        destinations: ['Yedigöller', 'Bolu', 'Abant', 'Gölcük Tabiat Parkı'],
        tips: ['Hafta sonları aşırı kalabalık olabilir, imkanınız varsa hafta içi gidin.', 'Kamp yapacaksanız milli park kurallarına uyun, ateş yakmak yasaktır.']
    },
    'izlandakuzeyisiklari': {
        type: 'international', badge: 'Yurtdışı', title: 'İzlanda Kuzey Işıkları', icon: '✨',
        subtitle: 'Gökyüzündeki sihirli dans',
        description: 'Aurora Borealis\'in büyüleyici yeşil ve pembe ışık şölenini, İzlanda\'nın volkanik ve karlı manzaraları eşliğinde izleme deneyimi.',
        stats: [{ value: 'Eylül-Nisan', label: 'Sezon' }, { value: 'Kp İndeksi', label: 'Takip' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🌌', title: 'Aurora Dansı', desc: 'Karanlık kış gecelerinde gökyüzünü kaplayan olağanüstü doğa olayı.' },
            { icon: '🌋', title: 'Volkanik Kaplıcalar', desc: 'Gündüzleri sıcak termal sularda rahatlama (Blue Lagoon vb.).' }
        ],
        destinations: ['Reykjavik', 'Thingvellir', 'Vik', 'Jökulsárlón'],
        tips: ['Kuzey ışıkları garantili değildir, bulutsuz havaya ve güneş aktivitesine bağlıdır.', 'Işıkları fotoğraflamak için tripoda ve manuel ayarlı kameraya ihtiyacınız olacak.']
    },
    'isvicrebuzulgolleri': {
        type: 'international', badge: 'Yurtdışı', title: 'Buzul Gölleri', icon: '💧',
        subtitle: 'Alplerin turkuaz aynaları',
        description: 'İsviçre Alplerinin eteklerinde, buzul sularından beslenen Oeschinensee veya Blausee gibi masmavi göllerin etrafında doğa yürüyüşü.',
        stats: [{ value: 'Turkuaz', label: 'Su Rengi' }, { value: 'Dağ Havası', label: 'Atmosfer' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🚣', title: 'Kayık Turu', desc: 'Sakin ve kristal berraklığındaki göllerde ahşap kayıklarla romantik tur.' },
            { icon: '🌲', title: 'Çam Ormanları', desc: 'Gölleri çevreleyen dev çam ormanlarında temiz havaya doyacağınız yürüyüşler.' }
        ],
        destinations: ['Oeschinensee', 'Blausee', 'Lucerne', 'Brienz'],
        tips: ['Teleferik ile ulaşım göllere çıkışı çok kolaylaştırır.', 'Göl suları yazın bile yüzmek için çok soğuk olabilir, hazırlıklı olun.']
    },
    'santorinigunbatimi': {
        type: 'international', badge: 'Yurtdışı', title: 'Santorini Gün Batımı', icon: '🌇',
        subtitle: 'Ege Denizi\'nde romantizm',
        description: 'Yunan adası Santorini\'nin mavi kubbeli beyaz evleri arasından, Ege Denizi sularına gömülen muhteşem güneşin batışını izleme ritüeli.',
        stats: [{ value: 'Oia', label: 'En İyi Konum' }, { value: 'Kaldera', label: 'Manzara' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🥂', title: 'Şarap Eşliğinde', desc: 'Yamaçlardaki teras barlarda yerel Asyrtiko şarabıyla gün batımı keyfi.' },
            { icon: '📸', title: 'İkonik Fotoğraflar', desc: 'Dünyanın en çok fotoğraflanan gün batımı manzaralarından biri.' }
        ],
        destinations: ['Oia', 'Fira', 'Imerovigli', 'Amoudi Körfezi'],
        tips: ['Oia\'da gün batımını iyi bir yerden izlemek için saatler öncesinden yerinizi almalısınız.', 'Teraslı bir restoranda rezervasyon yaparak kalabalıktan kurtulabilirsiniz.']
    },

    // Sanat
    'istanbulmodernsanat': {
        type: 'domestic', badge: 'Yurtiçi', title: 'İstanbul Modern', icon: '🖼️',
        subtitle: 'Boğaz kenarında çağdaş sanat',
        description: 'Renzo Piano tarafından tasarlanan yeni binasında, Türkiye\'nin modern ve çağdaş sanat eserlerini Boğaziçi manzarası eşliğinde inceleyin.',
        stats: [{ value: 'Karaköy', label: 'Konum' }, { value: 'Modern', label: 'Tür' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🎨', title: 'Çağdaş Eserler', desc: 'Türk ve uluslararası sanatçıların resim, heykel ve dijital enstalasyonları.' },
            { icon: '🌊', title: 'Boğaz Manzarası', desc: 'Müze terasından ve kafesinden tarihi yarımada ve Boğaz\'ın eşsiz görünümü.' }
        ],
        destinations: ['Karaköy', 'Galataport', 'Tophane', 'Beyoğlu'],
        tips: ['Perşembe günleri Türkiye'de ikamet edenlere ücretsizdir.', 'Galataport yürüyüşünüz ile müze ziyaretinizi birleştirebilirsiniz.']
    },
    'karakoysokaksanati': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Karaköy Sokak Sanatı', icon: '🖌️',
        subtitle: 'Sokakların renkli dili',
        description: 'İstanbul\'un en trend semti Karaköy ve Kadıköy Yeldeğirmeni sokaklarında yerel ve uluslararası duvar sanatçılarının (mural) eserlerini keşfedin.',
        stats: [{ value: 'Mural', label: 'Sanat Türü' }, { value: 'Açık Hava', label: 'Konum' }, { value: '⭐ 4.7', label: 'Puan' }],
        highlights: [
            { icon: '📸', title: 'Instagram Rotası', desc: 'Ara sokaklarda gizlenmiş birbirinden renkli devasa duvar resimleri.' },
            { icon: '☕', title: '3. Nesil Kafeler', desc: 'Sokak sanatını gezerken butik kahvecilerde mola verme imkanı.' }
        ],
        destinations: ['Karaköy', 'Galata', 'Kadıköy', 'Yeldeğirmeni'],
        tips: ['Rahat ayakkabılar giyin, bol bol sokak arşınlayacaksınız.', 'Duvar resimlerinin önünde park etmiş arabalar fotoğraf çekmeyi zorlaştırabilir.']
    },
    'ebruatolyesi': {
        type: 'domestic', badge: 'Yurtiçi', title: 'Ebru Atölyesi', icon: '💧',
        subtitle: 'Su üzerinde dans eden renkler',
        description: 'Geleneksel Türk el sanatı Ebru\'nun inceliklerini öğrenin. Su yüzeyine boyalarla desenler çizip kendi sanat eserinizi kağıda aktarın.',
        stats: [{ value: '2 Saat', label: 'Süre' }, { value: 'Geleneksel', label: 'Tür' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🌸', title: 'Lale Motifleri', desc: 'Usta öğreticiler eşliğinde Ebru sanatının klasik çiçek desenlerini yapma.' },
            { icon: '📜', title: 'Hatıra Eser', desc: 'Kendi yaptığınız eşsiz Ebru çalışmasını çerçeveletip eve götürme şansı.' }
        ],
        destinations: ['Sultanahmet', 'Balat', 'Üsküdar', 'Kapadokya'],
        tips: ['Boya sıçrama ihtimaline karşı önlük isteyin veya eski kıyafetler giyin.', 'Sabır gerektiren meditatif bir deneyimdir, acele etmeyin.']
    },
    'parismontmartre': {
        type: 'international', badge: 'Yurtdışı', title: 'Paris Montmartre', icon: '🎨',
        subtitle: 'Ressamların bohem mahallesi',
        description: 'Picasso, Van Gogh ve Renoir gibi dâhilerin yaşadığı dar sokaklarda gezin. Place du Tertre meydanında sokak ressamlarına portrenizi çizdirin.',
        stats: [{ value: 'Bohem', label: 'Atmosfer' }, { value: 'Tepelik', label: 'Konum' }, { value: '⭐ 4.8', label: 'Puan' }],
        highlights: [
            { icon: '🖌️', title: 'Ressamlar Meydanı', desc: 'Onlarca sanatçının açık havada şövalyeleri başında çalıştığı tarihi meydan.' },
            { icon: '⛪', title: 'Sacré-Cœur', desc: 'Tepenin zirvesinden tüm Paris\'i ayaklarınızın altına seren beyaz bazilika.' }
        ],
        destinations: ['Montmartre', 'Place du Tertre', 'Moulin Rouge', 'Le Marais'],
        tips: ['Ressamlarla portre için önceden net bir fiyat pazarlığı yapın.', 'Tepede çok fazla merdiven var, rahat yürüyüş ayakkabısı şart.']
    },
    'floransaronesansturu': {
        type: 'international', badge: 'Yurtdışı', title: 'Floransa Rönesansı', icon: '🏛️',
        subtitle: 'Sanatın yeniden doğuşu',
        description: 'Uffizi Galerisi, Michelangelo\'nun Davut heykeli ve Duomo ile Rönesans\'ın doğduğu şehirde sanat tarihinin en önemli eserlerini inceleyin.',
        stats: [{ value: 'Rönesans', label: 'Dönem' }, { value: 'İtalya', label: 'Ülke' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🖼️', title: 'Uffizi Galerisi', desc: 'Botticelli\'nin "Venüs\'ün Doğuşu" dahil binlerce paha biçilmez eser.' },
            { icon: '🗿', title: 'Davut Heykeli', desc: 'Michelangelo\'nun Galleria dell\'Accademia\'daki kusursuz mermer başyapıtı.' }
        ],
        destinations: ['Uffizi', 'Ponte Vecchio', 'Duomo', 'Accademia'],
        tips: ['Uffizi ve Accademia biletlerini aylar öncesinden ayırtmanız gerekir.', 'Sanat yorgunluğuna karşı sık sık gelato (dondurma) molası verin.']
    },
    'vatikanmuzeleri': {
        type: 'international', badge: 'Yurtdışı', title: 'Vatikan Müzeleri', icon: '⛪',
        subtitle: 'Din, tarih ve sanatın zirvesi',
        description: 'Papalık koleksiyonlarının sergilendiği, dünyanın en zengin müzelerinden biri. İnanılmaz freskler, heykeller ve Michelangelo\'nun ölümsüz eseri Sistina Şapeli.',
        stats: [{ value: '54 Galeri', label: 'Büyüklük' }, { value: 'Sistina', label: 'Şapel' }, { value: '⭐ 4.9', label: 'Puan' }],
        highlights: [
            { icon: '🖌️', title: 'Sistina Şapeli', desc: 'Michelangelo\'nun tavana çizdiği dünyaca ünlü "Adem\'in Yaratılışı" freski.' },
            { icon: '🏛️', title: 'Raphael Odaları', desc: 'Rönesans\'ın büyük ustası Raphael tarafından boyanmış papa odaları.' }
        ],
        destinations: ['Vatikan', 'San Pietro Bazilikası', 'Roma', 'Trastevere'],
        tips: ['Sistina Şapeli\'nde fotoğraf çekmek ve konuşmak kesinlikle yasaktır.', 'Omuzları ve dizleri kapatan kıyafet kuralına mutlaka uyun.']
    }
};

const scriptCode = `const tagInfoData = ${JSON.stringify(tags, null, 4)};`;
fs.writeFileSync('tagData.js', scriptCode);
console.log('tagData.js has been generated successfully.');
