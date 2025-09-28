const SAMPLE_HEADLINES = [
    {
        groupNumber: 1,
        newspaperName: 'El Tiempo',
        headlines: [
            'Presidente anuncia nuevas medidas económicas para reactivar el país',
            'Colombia avanza en negociaciones de paz con grupos armados',
            'Inflación en Colombia muestra signos de desaceleración en octubre',
            'Gobierno presenta plan de inversión en infraestructura vial',
            'Exportaciones de café colombiano crecen 15% este año',
            'Nueva reforma tributaria genera debate en el Congreso',
            'Alcalde de Bogotá propone mejoras al sistema de transporte público',
            'Ministro de Salud confirma reducción de casos de dengue',
            'Banco de la República mantiene tasas de interés estables',
            'Empresarios piden mayor apoyo para reactivación económica'
        ],
        url: 'https://www.eltiempo.com'
    },
    {
        groupNumber: 2,
        newspaperName: 'El Espectador',
        headlines: [
            'Corte Suprema ordena investigar casos de corrupción en contratos públicos',
            'Universidad Nacional presenta nuevo programa de becas estudiantiles',
            'Arqueólogos descubren vestigios precolombinos en el Magdalena Medio',
            'Artistas colombianos ganan reconocimiento internacional en festival',
            'Ministerio de Ambiente anuncia nuevas áreas protegidas',
            'Deportistas colombianos se preparan para competencias internacionales',
            'Investigadores desarrollan vacuna contra enfermedades tropicales',
            'Alcaldes del país solicitan más recursos para obras de desarrollo',
            'Congreso debate proyecto de ley sobre energías renovables',
            'Policía Nacional reporta reducción del 20% en delitos urbanos'
        ],
        url: 'https://www.elespectador.com'
    },
    {
        groupNumber: 3,
        newspaperName: 'El Colombiano',
        headlines: [
            'Medellín inaugura nuevos parques tecnológicos para emprendimiento',
            'Antioquia lidera producción de flores para exportación mundial',
            'Metro de Medellín anuncia expansión hacia nuevos municipios',
            'Universidades paisas crean alianza para investigación científica',
            'Festival Internacional de Poesía celebra 30 años de historia',
            'Empresas antioqueñas invierten en tecnología e innovación',
            'Gobernación presenta plan de conectividad rural para la región',
            'Hospital Pablo Tobón Uribe recibe reconocimiento internacional',
            'Startups de Medellín atraen inversión extranjera millonaria',
            'Ruta de la seda paisa impulsa turismo cultural en Antioquia'
        ],
        url: 'https://www.elcolombiano.com'
    },
    {
        groupNumber: 4,
        newspaperName: 'Semana',
        headlines: [
            'Análisis: Los desafíos económicos de Colombia para el próximo año',
            'Entrevista exclusiva con líderes empresariales sobre innovación',
            'Investigación revela impacto del cambio climático en la agricultura',
            'Política colombiana enfrenta nuevos retos de gobernabilidad',
            'Cultura digital transforma la educación en instituciones del país',
            'Sector salud implementa telemedicina en zonas rurales remotas',
            'Economía circular gana terreno en industrias manufactureras',
            'Jóvenes emprendedores lideran proyectos de sostenibilidad ambiental',
            'Inversión extranjera directa muestra crecimiento en el trimestre',
            'Tecnología blockchain revoluciona sector financiero colombiano'
        ],
        url: 'https://www.semana.com'
    },
    {
        groupNumber: 5,
        newspaperName: 'El Universal',
        headlines: [
            'Cartagena fortalece su posición como destino turístico internacional',
            'Puerto de Barranquilla aumenta movimiento de carga en 25%',
            'Costa Caribe lidera proyectos de energía solar y eólica',
            'Universidades de la región desarrollan investigación marina',
            'Festival Vallenato celebra la cultura musical del Caribe colombiano',
            'Zonas francas del Atlántico atraen nuevas empresas extranjeras',
            'Gobierno nacional invierte en infraestructura portuaria regional',
            'Agricultura del Caribe adopta técnicas de riego inteligente',
            'Sector hotelero de la costa registra ocupación del 85%',
            'Pescadores artesanales reciben apoyo técnico y financiero'
        ],
        url: 'https://www.eluniversal.com.co'
    },
    {
        groupNumber: 6,
        newspaperName: 'Caracol Radio',
        headlines: [
            'Gobierno anuncia inversión millonaria en conectividad rural',
            'Caracol Radio celebra 70 años informando a los colombianos',
            'Nuevas medidas de seguridad vial reducen accidentalidad',
            'Sector agrícola recibe apoyo tecnológico para modernización',
            'Colombia participa en cumbre internacional sobre cambio climático',
            'Ministro de Educación presenta reforma al sistema universitario',
            'Deportista colombiana gana medalla de oro en competencia mundial',
            'Banco Central evalúa nuevas políticas monetarias',
            'Empresas colombianas lideran innovación en Latinoamérica',
            'Autoridades decomisan importante cargamento de sustancias ilegales'
        ],
        url: 'https://caracol.com.co'
    },
    {
        groupNumber: 7,
        newspaperName: 'RCN Radio',
        headlines: [
            'Colombia firma acuerdo comercial con países de la región',
            'RCN Radio lanza nueva plataforma digital de noticias',
            'Gobierno presenta plan nacional de vacunación actualizado',
            'Sector turístico colombiano supera expectativas del año',
            'Investigadores colombianos desarrollan nueva tecnología médica',
            'Congreso aprueba ley de protección a víctimas del conflicto',
            'Alcaldes del país se reúnen para discutir desarrollo urbano',
            'Colombia lidera exportación de productos orgánicos',
            'Ministerio del Interior anuncia nuevas políticas de seguridad',
            'Universidades colombianas mejoran en rankings internacionales'
        ],
        url: 'https://www.rcnradio.com'
    },
    {
        groupNumber: 8,
        newspaperName: 'Noticias RCN',
        headlines: [
            'Presidente inaugura nueva fase del metro de Bogotá',
            'Colombia registra crecimiento económico del 4% en el trimestre',
            'Ministerio de Salud reporta disminución de casos de malaria',
            'Sector tecnológico colombiano atrae inversión extranjera',
            'Gobierno lanza programa de vivienda gratuita para familias',
            'Colombia se posiciona como líder en energías renovables',
            'Fiscalía desmantela red de corrupción en entidades públicas',
            'Exportaciones no tradicionales crecen 20% en el último año',
            'Ministerio de Cultura promociona patrimonio colombiano',
            'Policía Nacional presenta balance positivo de seguridad'
        ],
        url: 'https://www.noticiasrcn.com'
    },
    {
        groupNumber: 9,
        newspaperName: 'Noticias Caracol',
        headlines: [
            'Colombia firma tratado de libre comercio con nuevo socio',
            'Caracol Televisión renueva compromiso con el periodismo',
            'Gobierno nacional anuncia construcción de nuevos hospitales',
            'Sector cafetero implementa prácticas sostenibles',
            'Colombia participa en foro mundial sobre innovación',
            'Ministerio de Transporte mejora infraestructura vial',
            'Empresarios colombianos invierten en startups tecnológicas',
            'Gobierno fortalece programas de educación rural',
            'Colombia reduce significativamente la deforestación',
            'Autoridades incautan récord histórico de drogas ilegales'
        ],
        url: 'https://noticias.caracoltv.com'
    },
    {
        groupNumber: 10,
        newspaperName: 'La República',
        headlines: [
            'Bolsa de Valores de Colombia registra máximo histórico',
            'Empresas nacionales lideran transformación digital',
            'Sector financiero colombiano se expande en la región',
            'Colombia atrae inversión récord en infraestructura',
            'Bancos colombianos implementan nuevas tecnologías',
            'Sector inmobiliario muestra signos de recuperación',
            'Colombia lidera índices de competitividad empresarial',
            'Empresas colombianas se expanden a mercados internacionales',
            'Sector retail adopta estrategias de comercio electrónico',
            'Colombia mejora calificación crediticia internacional'
        ],
        url: 'https://www.larepublica.co'
    },
    {
        groupNumber: 11,
        newspaperName: 'Portafolio',
        headlines: [
            'Sector tecnológico colombiano crece 35% en el último año',
            'Colombia lidera inversión en energías limpias',
            'Empresas colombianas adoptan estrategias ESG',
            'Sector agroindustrial implementa agricultura 4.0',
            'Colombia se consolida como hub logístico regional',
            'Startups colombianas atraen capital de riesgo internacional',
            'Sector minero adopta tecnologías sustentables',
            'Colombia mejora índices de facilidad para hacer negocios',
            'Empresas manufactureras modernizan sus procesos',
            'Sector servicios lidera crecimiento del PIB'
        ],
        url: 'https://www.portafolio.co'
    },
    {
        groupNumber: 12,
        newspaperName: 'El Heraldo',
        headlines: [
            'Barranquilla se consolida como puerto líder del Caribe',
            'Costa Atlántica lidera proyectos de turismo sostenible',
            'Región Caribe implementa corredores verdes urbanos',
            'Universidades del Atlántico fortalecen investigación marina',
            'Carnaval de Barranquilla declarado patrimonio cultural',
            'Sector hotelero del Caribe registra ocupación récord',
            'Gobierno invierte en modernización portuaria regional',
            'Atlántico lidera producción de energía eólica',
            'Región Caribe desarrolla clúster de biotecnología',
            'Barranquilla inaugura nuevo centro de convenciones'
        ],
        url: 'https://www.elheraldo.co'
    },
    {
        groupNumber: 13,
        newspaperName: 'Vanguardia',
        headlines: [
            'Santander lidera producción petrolera nacional',
            'Bucaramanga se posiciona como ciudad inteligente',
            'Región santandereana fortalece sector agroindustrial',
            'Universidad Industrial de Santander recibe reconocimiento',
            'Santander implementa corredores de movilidad sostenible',
            'Sector manufacturero regional adopta Industria 4.0',
            'Barrancabermeja moderniza refinería nacional',
            'Santander lidera exportación de productos químicos',
            'Región desarrolla clúster de software y tecnología',
            'Gobierno invierte en infraestructura educativa regional'
        ],
        url: 'https://www.vanguardia.com'
    },
    {
        groupNumber: 14,
        newspaperName: 'El País',
        headlines: [
            'Valle del Cauca lidera exportación de azúcar',
            'Cali se consolida como capital deportiva de Colombia',
            'Región vallecaucana fortalece sector de biotecnología',
            'Puerto de Buenaventura moderniza infraestructura',
            'Valle del Cauca implementa agricultura de precisión',
            'Universidades de Cali lideran investigación en salud',
            'Región desarrolla corredor logístico del Pacífico',
            'Sector industrial vallecaucano adopta energías limpias',
            'Cali inaugura sistema de transporte masivo ampliado',
            'Valle del Cauca lidera producción de biocombustibles'
        ],
        url: 'https://www.elpais.com.co'
    },
    {
        groupNumber: 15,
        newspaperName: 'W Radio',
        headlines: [
            'W Radio celebra 25 años de periodismo independiente',
            'Colombia desarrolla red nacional de banda ancha',
            'Gobierno anuncia política nacional de transformación digital',
            'Sector de telecomunicaciones invierte en tecnología 5G',
            'Colombia lidera índices de libertad de prensa regional',
            'Medios digitales transforman el panorama informativo',
            'Gobierno fortalece programas de alfabetización digital',
            'Colombia participa en cumbre mundial de comunicaciones',
            'Sector de medios adopta inteligencia artificial',
            'Regulador de comunicaciones moderniza marco normativo'
        ],
        url: 'https://www.wradio.com.co'
    }
];

module.exports = { SAMPLE_HEADLINES };