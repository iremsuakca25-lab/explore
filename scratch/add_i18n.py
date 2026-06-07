import re

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    for old, new in replacements:
        if old not in content:
            print(f"WARNING: Could not find '{old}' in {filepath}")
        content = content.replace(old, new)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

replacements = [
    # Routes
    ('<span>5 Gün</span>', '<span data-i18n="route_days_5">5 Gün</span>'),
    ('<span>7 Gün</span>', '<span data-i18n="route_days_7">7 Gün</span>'),
    ('<span>6 Gün</span>', '<span data-i18n="route_days_6">6 Gün</span>'),
    ('<span>4 Gün</span>', '<span data-i18n="route_days_4">4 Gün</span>'),
    ('<span>3 Gün</span>', '<span data-i18n="route_days_3">3 Gün</span>'),
    
    ('<span>Kolay</span>', '<span data-i18n="route_easy">Kolay</span>'),
    ('<span>Orta</span>', '<span data-i18n="route_medium">Orta</span>'),
    ('<span>Zor</span>', '<span data-i18n="route_hard">Zor</span>'),

    ('Peri bacalarından balon turlarına, yeraltı şehirlerinden antik kiliselere\n                            uzanan büyülü bir rota.', 'Peri bacalarından balon turlarına, yeraltı şehirlerinden antik kiliselere\n                            uzanan büyülü bir rota.'), # Let's match more simply
    
    ('<p class="route-desc">Peri bacalarından balon turlarına, yeraltı şehirlerinden antik kiliselere\n                            uzanan büyülü bir rota.</p>', '<p class="route-desc" data-i18n="route_capadocia_desc">Peri bacalarından balon turlarına, yeraltı şehirlerinden antik kiliselere\n                            uzanan büyülü bir rota.</p>'),
    ('<p class="route-desc">Turkuaz koylardan antik kentlere, zeytinliklerden butik otellere uzanan\n                            huzurlu bir Akdeniz yolculuğu.</p>', '<p class="route-desc" data-i18n="route_aegean_desc">Turkuaz koylardan antik kentlere, zeytinliklerden butik otellere uzanan\n                            huzurlu bir Akdeniz yolculuğu.</p>'),
    ('<p class="route-desc">Sisli yaylalar, yeşil vadiler, ahşap yayla evleri ve eşsiz doğa\n                            manzaraları.</p>', '<p class="route-desc" data-i18n="route_blacksea_desc">Sisli yaylalar, yeşil vadiler, ahşap yayla evleri ve eşsiz doğa\n                            manzaraları.</p>'),
    ('<p class="route-desc">Bizans\'tan Osmanlı\'ya, tarihi yarımadadan Boğaz kıyılarına uzanan kültürel\n                            bir yolculuk.</p>', '<p class="route-desc" data-i18n="route_istanbul_desc">Bizans\'tan Osmanlı\'ya, tarihi yarımadadan Boğaz kıyılarına uzanan kültürel\n                            bir yolculuk.</p>'),
    ('<p class="route-desc">Karlarla kaplı Anadolu manzaraları eşliğinde unutulmaz bir tren yolculuğu\n                            ve Ani Harabeleri.</p>', '<p class="route-desc" data-i18n="route_kars_desc">Karlarla kaplı Anadolu manzaraları eşliğinde unutulmaz bir tren yolculuğu\n                            ve Ani Harabeleri.</p>'),
    ('<p class="route-desc">Antik tapınaklar, bambu ormanları ve geleneksel çay evleriyle huzur dolu\n                            bir Japonya keşfi.</p>', '<p class="route-desc" data-i18n="route_kyoto_desc">Antik tapınaklar, bambu ormanları ve geleneksel çay evleriyle huzur dolu\n                            bir Japonya keşfi.</p>'),
    ('<p class="route-desc">Louvre\'dan Montmartre sokaklarına, Seine nehri kıyısında romantik ve\n                            sanatsal bir yolculuk.</p>', '<p class="route-desc" data-i18n="route_paris_desc">Louvre\'dan Montmartre sokaklarına, Seine nehri kıyısında romantik ve\n                            sanatsal bir yolculuk.</p>'),
    ('<p class="route-desc">Kolezyum\'dan Trevi Çeşmesi\'ne uzanan, tarih ve eşsiz İtalyan lezzetleriyle\n                            dolu bir yolculuk.</p>', '<p class="route-desc" data-i18n="route_rome_desc">Kolezyum\'dan Trevi Çeşmesi\'ne uzanan, tarih ve eşsiz İtalyan lezzetleriyle\n                            dolu bir yolculuk.</p>'),
    ('<p class="route-desc">Buzul gölleri, ahşap dağ evleri ve muhteşem doğa yürüyüşleriyle kusursuz\n                            bir dinlenme.</p>', '<p class="route-desc" data-i18n="route_swiss_desc">Buzul gölleri, ahşap dağ evleri ve muhteşem doğa yürüyüşleriyle kusursuz\n                            bir dinlenme.</p>'),
    ('<p class="route-desc">Çöllerin ortasında yükselen devasa piramitler ve Nil Nehri boyunca antik\n                            firavunların izleri.</p>', '<p class="route-desc" data-i18n="route_egypt_desc">Çöllerin ortasında yükselen devasa piramitler ve Nil Nehri boyunca antik\n                            firavunların izleri.</p>'),
    
    ('<button class="route-explore-btn">Rotayı Keşfet', '<button class="route-explore-btn" data-i18n="btn_explore_route">Rotayı Keşfet'),

    # Cities 
    ('<span class="city-country">Türkiye</span>', '<span class="city-country" data-i18n="country_tr">Türkiye</span>'),
    ('<span class="city-country">Fransa</span>', '<span class="city-country" data-i18n="country_fr">Fransa</span>'),
    ('<span class="city-country">Japonya</span>', '<span class="city-country" data-i18n="country_jp">Japonya</span>'),
    ('<span class="city-country">İtalya</span>', '<span class="city-country" data-i18n="country_it">İtalya</span>'),
    ('<span class="city-country">İzlanda</span>', '<span class="city-country" data-i18n="country_is">İzlanda</span>'),
    ('<span class="city-country">Yunanistan</span>', '<span class="city-country" data-i18n="country_gr">Yunanistan</span>'),
    ('<span class="city-country">Fas</span>', '<span class="city-country" data-i18n="country_ma">Fas</span>'),
    
    ('<span class="city-tag">Tarih</span>', '<span class="city-tag" data-i18n="tag_history">Tarih</span>'),
    ('<span class="city-tag">Gastronomi</span>', '<span class="city-tag" data-i18n="tag_gastro">Gastronomi</span>'),
    ('<span class="city-tag">Kültür</span>', '<span class="city-tag" data-i18n="tag_culture">Kültür</span>'),
    ('<span class="city-tag">Doğa</span>', '<span class="city-tag" data-i18n="tag_nature">Doğa</span>'),
    ('<span class="city-tag">Deniz</span>', '<span class="city-tag" data-i18n="tag_sea">Deniz</span>'),
    ('<span class="city-tag">Macera</span>', '<span class="city-tag" data-i18n="tag_adventure">Macera</span>'),
    ('<span class="city-tag">Kış</span>', '<span class="city-tag" data-i18n="tag_winter">Kış</span>'),
    ('<span class="city-tag">Sanat</span>', '<span class="city-tag" data-i18n="tag_art">Sanat</span>'),
    ('<span class="city-tag">Romantizm</span>', '<span class="city-tag" data-i18n="tag_romance">Romantizm</span>'),
    ('<span class="city-tag">Zen</span>', '<span class="city-tag" data-i18n="tag_zen">Zen</span>'),
    ('<span class="city-tag">Baharat</span>', '<span class="city-tag" data-i18n="tag_spice">Baharat</span>'),

    # Experiences
    ('<span class="section-label">DENEYİMLER</span>', '<span class="section-label" data-i18n="section_experiences">DENEYİMLER</span>'),
    ('<h3 class="experience-word">MACERA</h3>', '<h3 class="experience-word" data-i18n="exp_adv">MACERA</h3>'),
    ('<p>Adrenalin dolu aktiviteler, keşfedilmemiş rotalar ve sınırlarını zorlayan deneyimler.</p>', '<p data-i18n="exp_adv_desc">Adrenalin dolu aktiviteler, keşfedilmemiş rotalar ve sınırlarını zorlayan deneyimler.</p>'),
    ('<h3 class="experience-word">KÜLTÜR</h3>', '<h3 class="experience-word" data-i18n="exp_cult">KÜLTÜR</h3>'),
    ('<p>Tarihi yapılar, müzeler, yerel gelenekler ve medeniyetlerin izinde bir yolculuk.</p>', '<p data-i18n="exp_cult_desc">Tarihi yapılar, müzeler, yerel gelenekler ve medeniyetlerin izinde bir yolculuk.</p>'),
    ('<h3 class="experience-word">LEZZET</h3>', '<h3 class="experience-word" data-i18n="exp_taste">LEZZET</h3>'),
    ('<p>Yerel mutfaklar, sokak lezzetleri, şarap turları ve gastronomi deneyimleri.</p>', '<p data-i18n="exp_taste_desc">Yerel mutfaklar, sokak lezzetleri, şarap turları ve gastronomi deneyimleri.</p>'),
    ('<h3 class="experience-word">DOĞA</h3>', '<h3 class="experience-word" data-i18n="exp_nature">DOĞA</h3>'),
    ('<p>Ormanlar, dağlar, denizler ve doğanın en saf halini keşfedin.</p>', '<p data-i18n="exp_nature_desc">Ormanlar, dağlar, denizler ve doğanın en saf halini keşfedin.</p>'),
    ('<h3 class="experience-word">SANAT</h3>', '<h3 class="experience-word" data-i18n="exp_art">SANAT</h3>'),
    ('<p>Galeriler, sokak sanatı, performans ve yerel sanat atölyeleri.</p>', '<p data-i18n="exp_art_desc">Galeriler, sokak sanatı, performans ve yerel sanat atölyeleri.</p>'),

    # Stories
    ('<span class="section-label">HİKÂYELER</span>', '<span class="section-label" data-i18n="section_stories">HİKÂYELER</span>'),
    ('<h2 class="story-main-title">İstanbul\'da <br><em>48 Saat</em></h2>', '<h2 class="story-main-title"><span data-i18n="story_title_1">İstanbul\'da</span> <br><em data-i18n="story_title_2">48 Saat</em></h2>'),
    ('<h4>Sabah</h4>', '<h4 data-i18n="story_morning">Sabah</h4>'),
    ('<p>Sultanahmet\'te güneşin ilk ışıklarıyla uyanın. Ayasofya\'nın görkemli kubbesi altında\n                                tarihe dokunun, ardından simit ve çayla güne başlayın.</p>', '<p data-i18n="story_morning_desc">Sultanahmet\'te güneşin ilk ışıklarıyla uyanın. Ayasofya\'nın görkemli kubbesi altında\n                                tarihe dokunun, ardından simit ve çayla güne başlayın.</p>'),
    ('<h4>Öğle</h4>', '<h4 data-i18n="story_noon">Öğle</h4>'),
    ('<p>Kapalıçarşı\'nın labirentlerinde kaybolun. Rengarenk baharatlar, el yapımı seramikler ve\n                                yüzyıllık zanaat geleneğiyle tanışın.</p>', '<p data-i18n="story_noon_desc">Kapalıçarşı\'nın labirentlerinde kaybolun. Rengarenk baharatlar, el yapımı seramikler ve\n                                yüzyıllık zanaat geleneğiyle tanışın.</p>'),
    ('<h4>Akşam</h4>', '<h4 data-i18n="story_evening">Akşam</h4>'),
    ('<p>Galata Kulesi\'nden gün batımını izleyin. Boğaz\'ın iki yakasını birleştiren ışıklar,\n                                şehrin büyüsünü gözler önüne serer.</p>', '<p data-i18n="story_evening_desc">Galata Kulesi\'nden gün batımını izleyin. Boğaz\'ın iki yakasını birleştiren ışıklar,\n                                şehrin büyüsünü gözler önüne serer.</p>'),
    ('<h4>Gece</h4>', '<h4 data-i18n="story_night">Gece</h4>'),
    ('<p>Kadıköy sokaklarında canlı müzik eşliğinde meyhane kültürünü deneyimleyin. Rakı ve meze\n                                ile İstanbul gecelerinin tadını çıkarın.</p>', '<p data-i18n="story_night_desc">Kadıköy sokaklarında canlı müzik eşliğinde meyhane kültürünü deneyimleyin. Rakı ve meze\n                                ile İstanbul gecelerinin tadını çıkarın.</p>'),

    # Guides
    ('<span class="section-label">REHBERLER</span>', '<span class="section-label" data-i18n="section_guides">REHBERLER</span>'),
    ('<span class="title-line">Yerel rehberlerle</span>', '<span class="title-line" data-i18n="guides_title_1">Yerel rehberlerle</span>'),
    ('<span class="title-line">gerçek <em>keşiflere</em> çıkın.</span>', '<span class="title-line" data-i18n="guides_title_2">gerçek <em>keşiflere</em> çıkın.</span>'),
    ('<a href="mailto:ahmet.yilmaz@explore.com" class="guide-contact-btn">İletişime Geç</a>', '<a href="mailto:ahmet.yilmaz@explore.com" class="guide-contact-btn" data-i18n="guide_contact">İletişime Geç</a>'),
    ('<a href="mailto:elif.kaya@explore.com" class="guide-contact-btn">İletişime Geç</a>', '<a href="mailto:elif.kaya@explore.com" class="guide-contact-btn" data-i18n="guide_contact">İletişime Geç</a>'),
    ('<a href="mailto:mert.ozdemir@explore.com" class="guide-contact-btn">İletişime Geç</a>', '<a href="mailto:mert.ozdemir@explore.com" class="guide-contact-btn" data-i18n="guide_contact">İletişime Geç</a>'),
    ('<a href="mailto:zeynep.demir@explore.com" class="guide-contact-btn">İletişime Geç</a>', '<a href="mailto:zeynep.demir@explore.com" class="guide-contact-btn" data-i18n="guide_contact">İletişime Geç</a>'),
    ('<span>Tur</span>', '<span data-i18n="guide_tour">Tur</span>'),
    ('<span>Puan</span>', '<span data-i18n="guide_score">Puan</span>'),
    ('<span class="guide-specialty">Tarih Rehberi</span>', '<span class="guide-specialty" data-i18n="guide_history_spec">Tarih Rehberi</span>'),
    ('<p class="guide-bio">20 yıllık deneyimle İstanbul\'un gizli tarihî noktalarını keşfettiren uzman\n                        rehber.</p>', '<p class="guide-bio" data-i18n="guide_history_bio">20 yıllık deneyimle İstanbul\'un gizli tarihî noktalarını keşfettiren uzman\n                        rehber.</p>'),
    ('<span class="guide-specialty">Gastronomi Uzmanı</span>', '<span class="guide-specialty" data-i18n="guide_gastro_spec">Gastronomi Uzmanı</span>'),
    ('<p class="guide-bio">Yerel lezzetlerin peşinde, sokak yemeklerinden haute cuisine\'e kadar gastronomi\n                        turları.</p>', '<p class="guide-bio" data-i18n="guide_gastro_bio">Yerel lezzetlerin peşinde, sokak yemeklerinden haute cuisine\'e kadar gastronomi\n                        turları.</p>'),
    ('<span class="guide-specialty">Fotoğraf Rehberi</span>', '<span class="guide-specialty" data-i18n="guide_photo_spec">Fotoğraf Rehberi</span>'),
    ('<p class="guide-bio">En iyi kadrajları yakalayın. Fotoğraf odaklı turlarla görsel hikâyeler\n                        oluşturun.</p>', '<p class="guide-bio" data-i18n="guide_photo_bio">En iyi kadrajları yakalayın. Fotoğraf odaklı turlarla görsel hikâyeler\n                        oluşturun.</p>'),
    ('<span class="guide-specialty">Doğa Rehberi</span>', '<span class="guide-specialty" data-i18n="guide_nature_spec">Doğa Rehberi</span>'),
    ('<p class="guide-bio">Dağlardan denizlere, doğanın kalbinde rehberlik eden macera uzmanı.</p>', '<p class="guide-bio" data-i18n="guide_nature_bio">Dağlardan denizlere, doğanın kalbinde rehberlik eden macera uzmanı.</p>'),

    # Stats
    ('<span class="stat-label">Şehir</span>', '<span class="stat-label" data-i18n="stat_city">Şehir</span>'),
    ('<span class="stat-label">Deneyim</span>', '<span class="stat-label" data-i18n="stat_exp">Deneyim</span>'),
    ('<span class="stat-label">Ülke</span>', '<span class="stat-label" data-i18n="stat_country">Ülke</span>'),
    ('<span class="stat-label">Gezgin</span>', '<span class="stat-label" data-i18n="stat_traveler">Gezgin</span>'),

    # Quote
    ('<span class="quote-word">Seyahat</span>', '<span class="quote-word" data-i18n="quote_1">Seyahat</span>'),
    ('<span class="quote-word">ettiğiniz</span>', '<span class="quote-word" data-i18n="quote_2">ettiğiniz</span>'),
    ('<span class="quote-word">yerler</span>', '<span class="quote-word" data-i18n="quote_3">yerler</span>'),
    ('<span class="quote-word">sizi</span>', '<span class="quote-word" data-i18n="quote_4">sizi</span>'),
    ('<span class="quote-word">değiştirmez.</span>', '<span class="quote-word" data-i18n="quote_5">değiştirmez.</span>'),
    ('<span class="quote-word">Yaşadığınız</span>', '<span class="quote-word" data-i18n="quote_6">Yaşadığınız</span>'),
    ('<span class="quote-word"><em>deneyimler</em></span>', '<span class="quote-word" data-i18n="quote_7"><em>deneyimler</em></span>'),
    ('<span class="quote-word">değiştirir.</span>', '<span class="quote-word" data-i18n="quote_8">değiştirir.</span>'),

    # CTA
    ('<span class="cta-title-line">Bir sonraki hikâyen</span>', '<span class="cta-title-line" data-i18n="cta_title_1">Bir sonraki hikâyen</span>'),
    ('<span class="cta-title-line">seni <em>bekliyor.</em></span>', '<span class="cta-title-line" data-i18n="cta_title_2">seni <em>bekliyor.</em></span>'),
    ('placeholder="Bir şehir, rota veya deneyim ara..."', 'placeholder="Bir şehir, rota veya deneyim ara..." data-i18n="cta_placeholder"'),
    ('<span>Şimdi Keşfet</span>', '<span data-i18n="cta_btn">Şimdi Keşfet</span>'),

    # Footer
    ('<p class="footer-tagline">Keşfetmenin yeni yolu.</p>', '<p class="footer-tagline" data-i18n="footer_tagline">Keşfetmenin yeni yolu.</p>'),
    ('<h4>Keşfet</h4>', '<h4 data-i18n="footer_col_1">Keşfet</h4>'),
    ('<h4>Hakkımızda</h4>', '<h4 data-i18n="footer_col_2">Hakkımızda</h4>'),
    ('<h4>İletişim</h4>', '<h4 data-i18n="footer_col_3">İletişim</h4>'),
    ('<a href="#" class="footer-info-link" data-type="story">Hikâyemiz</a>', '<a href="#" class="footer-info-link" data-type="story" data-i18n="footer_story">Hikâyemiz</a>'),
    ('<a href="#" class="footer-info-link" data-type="blog">Blog</a>', '<a href="#" class="footer-info-link" data-type="blog" data-i18n="footer_blog">Blog</a>'),
    ('<a href="#" class="chat-trigger-link">Destek</a>', '<a href="#" class="chat-trigger-link" data-i18n="footer_support">Destek</a>'),
    ('<a href="#" class="chat-trigger-link">Bize Ulaşın</a>', '<a href="#" class="chat-trigger-link" data-i18n="footer_contact">Bize Ulaşın</a>'),
    ('<a href="#" class="chat-trigger-link">SSS</a>', '<a href="#" class="chat-trigger-link" data-i18n="footer_faq">SSS</a>'),
    ('<span>© 2026 EXPLORE. Tüm hakları saklıdır.</span>', '<span data-i18n="footer_copyright">© 2026 EXPLORE. Tüm hakları saklıdır.</span>'),
]

replace_in_file('/Users/iremsuakca/Desktop/explore-platform/index.html', replacements)
print("Finished replacements")
