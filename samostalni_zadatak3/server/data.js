class Proizvod {
    constructor(id, naziv, cijena, velicine, opis, slike, dostupne_boje, karakteristike) {
      this.id = id;
      this.naziv = naziv;
      this.cijena = cijena;
      this.velicine = velicine;
      this.opis = opis;
      this.slike = slike;
      this.dostupne_boje = dostupne_boje;
      this.karakteristike = karakteristike;
    }
  }

const proizvodi = [
    new Proizvod(1, 'Obična crna majica', 100, ['XS', 'S', 'M', 'L'], 'Obicna crna maica koja dobro stoji', [
        // slike
        'https://lumer-shop.eu/wp-content/uploads/2019/09/muska-crna-jpg.webp', 
        'https://cdn.4f.com.pl/media/catalog/product/cache/c7948d663b21982fa4a80ec214224aae/4/F/4FWAW24TTSHU1657-20S-M-03-MAIN.jpg', 
        'https://www.bolf.com.hr/scr_pl_Crna-obicna-muska-majica-Bolf-MT3001-90846_2.jpg', 
        'https://pennyshop.ba/assets/photos/product/medium/157570.jpg'
        ],
        ['black', 'white'],
        { materijal: 'pamuk', težina: '200g', održavanje: 'pranje na 30°C' }
    ),
    new Proizvod(2, "Levi's 501 traperice", 110, ['S', 'M', 'L'], 'nesto jako zanimljivo virujen', [
        // slike
        'https://img01.ztat.net/article/spp-media-p1/eaa75d3773e24dbea9398b3ddb2d6f4b/931d18ee70144c16a08b1f89a9563e5a.jpg?imwidth=762',
        'https://europa92.eu/upload/catalog/product/11983/thumb/4ff93453-72a5-4556-9ccb-f19b81cd893e_661b051c728f7_990xr.webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kdjUx0BE_ja3HJinGoJu-QltrB2d6CL_iA&s',
        'https://europa92.eu/upload/catalog/product/10265/thumb/5e9fe5f3-f70f-4677-9af1-be817c35caa2_661b1f4ea0244_990xr.webp'
        ],
        ['crna', 'bijela'],
        { materijal: 'pamuk', težina: '200g', održavanje: 'pranje na 30°C' }
    ),
    new Proizvod(3, 'Zimska kapa', 40, 'onesize', 'zimska kapa', [
        // slike
        'https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/1/8187O-MLC-010-1-565071_3.jpg',
        'https://www.fanaticshop.hr/picture/61433e05a7b7d/w960/da_zc_effort.jpg',
        'https://cdn.4camping.hr/files/photos/1600/0/0263b5bc-zimska-kapa-columbia-city-trek-heavyweight-beanie-crna.webp',
        'https://malizakladi.hr/media/catalog/product/cache/ee595ad2b94fe9d840a6c7a940b85399/j/a/jamiks-zimska-kapa-kelsi-grey-jze141j563-001.jpg'
        ],
        ['black', 'white'],
        { materijal: 'pamuk', težina: '200g', održavanje: 'pranje na 30°C' }
    ),
    new Proizvod(4, 'Čarape Adidas', 20, ['34-36', '37-39', '40-42'], 'carape za noge', [
        // slike
        'https://img01.ztat.net/article/spp-media-p1/b8257221318f474d9ecf726faf4bf6c7/c80724d8789845bb826bfcb1c966327b.jpg?imwidth=1800&filter=packshot',
        'https://www.buzzsneakers.hr/files/thumbs/files/images/slike-proizvoda/media/IU2/IU2661/images/thumbs_900/IU2661_900_900px.jpg',
        'https://www.buzzsneakers.hr/files/thumbs/files/images/slike-proizvoda/media/GD3/GD3575/images/thumbs_800/GD3575_800_800px.jpg',
        'https://www.buzzsneakers.hr/files/images/slike-proizvoda/media/S21/S21489/images/S21489.jpg'
        ],
        ['black', 'white'],
        { materijal: 'pamuk', težina: '200g', održavanje: 'pranje na 30°C' }
    ),
    new Proizvod(5, 'Tenisice Nike', 200, ['38', '39', '40', '41', '42', '43', '44', '45'], 'patike za hodat u njima', [
        // slike
        'https://www.sportvision.hr/files/images/slike_proizvoda/media/AH8/AH8050-002/images/AH8050-002.jpg',
        'https://img.bazzar.cloud/z2q27w4/s:1000:1000/czM6Ly9kYXRhc3Rv/cmUuYmF6emFyLmhy/L1ZkU01OblJROHBv/SHBlbk1ma3k4TVdS/Wg',
        'https://img01.ztat.net/article/spp-media-p1/3bfb7f8430434147bce905fedb72f4fe/a5916e4a832742b7b9318f6e34575fb2.jpg?imwidth=1800&filter=packshot',
        'https://static.glami.hr/img/800x800bt/235328295-nike-sportswear-niske-tenisice-air-max-270-crna.jpg'
        ],
        ['black', 'white'],
        { materijal: 'pamuk', težina: '200g', održavanje: 'pranje na 30°C' }
    )
  ];

export { Proizvod, proizvodi };