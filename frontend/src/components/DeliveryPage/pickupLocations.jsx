/* eslint max-len: ["error", { "code": 200 }] */

const pickupLocationsData = [
  {
    value: 'FS Motos, Hipolito Irigoyen 566, Entre Ríos, Victoria, 03436-425197', title: 'FS Motos', latitude: -32.623430, longitude: -60.151828,
  },
  {
    value: 'Cacace Moto, Hipolito Yrigoyen 24100, Buenos Aires, Guernica, 02224-490320', title: 'Cacace Moto', latitude: -34.917955, longitude: -58.384476,
  },
// Add title , latitude and longitude
//   {"value": 'MotoZuni, Av. Enrique Santamarina 202, Buenos Aires, Monte Grande, 011 4119-6686'},
// {"value": 'CYCLE WORLD MOTORS, Av Triunvirato 3651, Buenos Aires, Ciudad de Buenos Aires, 4521-1801'},
// {"value": 'URQUIZA MOTOS, Av. Triunvirato 5657, Villa Urquiza, Buenos Aires, Ciudad de Buenos Aires, 4541-7248'},
// {"value": 'MOTOSHOPPING LA PLATA, Av. 13 247 1/2, Casco Urbano, B1902CSE, Buenos Aires, La Plata, 0221 482-4600'},
// {"value": 'UNO MOTOS, Av. Warnes 963, Buenos Aires, Ciudad de Buenos Aires, 4855-8633'},
// {"value": 'MUÑOZ HOGAR, Gral. José María Paz 1385, Buenos Aires, Ituzaingo, 011 4458-0700'},
// {"value": 'CAMPANA MOTOS, Bv. Sarmiento 733, Buenos Aires, Campana, (0348) 942-5513'},
// {"value": 'Urquiza Motos, Av. Ader 4081, Buenos Aires, Villa Adelina, 011 30703883'},
// {"value": 'Urquiza Motos, Av. La Plata 827, Buenos Aires, Ciudad de Buenos Aires, 011 25327259'},
// {"value": 'Urquiza Motos, Av. Cordoba 3131, Buenos Aires, Ciudad de Buenos Aires, 011 57529220'},
// {"value": 'Urquiza Motos, Av. Constituyentes 5739, Buenos Aires, Ciudad de Buenos Aires, 011 4571 0337'},
// {"value": 'Km8 Motos, Darwin 811 - San Martin, Buenos Aires, San Martin, (011) 47576336'},
// {"value": 'Ruggeri Motos, Av. Don Bosco 705, Buenos Aires, Haedo, 4460-5791'},
// {"value": 'El Garage Motos (Lijo Fernando), Camino Moron 701, Buenos Aires, Boulogne, 4710-4593'},
// {"value": 'Rolling Motors, Pres. Juan Domingo Perón 3244, Buenos Aires, San Justo, 4441-3481'},
// {"value": 'Showroom Hero Vicente Lopez, Av Del Libertador 1150, Buenos Aires, Vicente Lopez, 4796-5514'},
// {"value": 'Mototeam, Presidente Peron 2136, Buenos Aires, San Miguel, 4664-8990'},
// {"value": 'Automotolanus, Av.25 de Mayo 1600, Buenos Aires, Lanus, 011 4247-8687'},
// {"value": 'Moto Vega, Av Lope de Vega 2402, Buenos Aires, Ciudad de Buenos Aires, 011 4648-2935'},
// {"value": 'BB Motonautica, Don Bosco 1301, Bahía Blanca, Buenos Aires, Bahia Blanca, 0291 430-4109'},
// {"value": 'Maxi Motos, Laprida 1087 - Baradero Pcia de Buenos Aires, Buenos Aires, Baradero,'},
// {"value": 'AG Motos, Santa Fe 2467 - Martinez, Buenos Aires, Martinez,'},
// {"value": 'Motoshop Ezeiza, Presidente N. Kirchner 865, Buenos Aires, Ezeiza, 4232 8476'},
// {"value": 'Ciclofox, Av. Pueyrredon 940, Buenos Aires, Ciudad de Buenos Aires, 4962-9823'},
// {"value": 'Motos MR, Bv. Buenos Aires 1568 - Monte Grande, Buenos Aires, Monte Grande, 011 4281-3799'},
// {"value": 'Motopro, Uruguay 21 - Moreno, Buenos Aires, Moreno, 0237-4602422'},
// {"value": 'PM Motos, Brown 350 - Bahia Blanca, Buenos Aires, Bahia Blanca, 0291-5711859'},
// {"value": 'Arizona Motos,  Av. Rivadavia 18358, Buenos Aires, Moron, 011 4627-2993'},
// {"value": 'Motoshop 46, Av. Pres. Juan Domingo Perón 23760, Buenos Aires, San Antonio de Padua, 0220 485-3927'},
// {"value": 'SP46, Bartolomé Mitre 2299, Buenos Aires, San Pedro, 03329 42-7821'},
// {"value": 'Motos Vicente, Eva Peron 4139, Buenos Aires, Lanus, 011 4246-5802'},
// {"value": 'Ruta 3, Av. J M de Rosas 4399, Buenos Aires, San Justo, 4651-984'},
// {"value": 'Champion Motos, Av. Savio 267, Buenos Aires, San Nicolas, (0336) 4427315'},
// {"value": 'TT Motos, Av. Colón 4302, Buenos Aires, Mar del Plata, 0223 472-2603'},
// {"value": 'DBM Motos, Av. Rivadavia 10792, Buenos Aires, Ciudad de Buenos Aires, 116-904-3372'},
// {"value": 'Motoren, Av Piaza 1557, Buenos Aires, Azul, 0228-1435940'},
// {"value": 'Servicio Tecnico Oficial Hero - Motek, Italia 561, Buenos Aires, Vicente Lopez, 4797-6281'},
// {"value": 'Videla Motos, Hipolito Yrigoyen 8562, Buenos Aires, Lomas de Zamora, 4139-7891'},
// {"value": 'Moto Bass, Gral Tomas Villegas 601, Buenos Aires, Ramos Mejia, 11 1551276290'},
// {"value": 'Yuhmak, Sarmiento 133, Catamarca, Catamarca, 0383 443-6292'},
// {"value": 'Yuhmak, Rivera Indarte 470, 5000JAJ Córdoba, Córdoba, Cordoba, 0351 421-7573'},
// {"value": 'JCR Motos, Mauricio Yadarola 1659, Córdoba, Cordoba, 0351 472-6118'},
// {"value": 'Moto Mundo Libres, Belgrano 1155 - Paso de los Libres, Corrientes, Paso de los Libres,'},
// {"value": 'CAMPS Motos, Rivadavia 473, Buenos Aires, Henderson, 02314 451359/ 15510855'},
// {"value": 'Yuhmak, Juana Manuela Gorriti 830, 4600 San Salvador de Jujuy, Jujuy, Jujuy, San Salvador de Jujuy,'},
// {"value": 'Alonso Motos, Av San Martin 890, La Pampa, Gral Pico, 02302 - 433200'},
// {"value": 'Yuhmak, Abel Bazán y Bustos 600-698, La Rioja, La Rioja, La Rioja,'},
// {"value": 'Coyote Motos, Santiago del Estero 796, Neuquén, Plotier, (0299) 4937437'},
// {"value": 'Yuhmak, Córdoba 749, 4400 Salta, Argentina, Salta, Salta, +54 387 496-0992'},
// {"value": 'Mundo Motos Omar Ferraro, Av. Podio 240, Santa Fe, Rafaela, 03492 - 570607'},
// {"value": 'Spagna Motos, Av. Facundo Zuviría 5167, Santa Fe, Santa Fe, 0342 488-2719'},
// {"value": 'Santino Motos, Av. San Martin 4265, Santa Fe, Rosario, 0341 - 4654778'},
// {"value": 'Yuhmak, Av. Moreno Sur 703, Santiago del Estero, Santiago del Estero,'},
// {"value": 'Yuhmak, Av. Avellaneda 50, San Miguel de Tucumán, Tucumán, Tucumán, Tucuman,'},
// {"value": 'Yuhmak, Santiago del Estero 970, San Miguel de Tucumán, Tucumán, Tucumán, Tucuman,'},
// {"value": 'Yuhmak, Alem 419, San Miguel de Tucumán, Tucumán, Tucumán, Tucuman,'},
// {"value": 'Suzuki Quilmes, Entre Rios 3075, Buenos Aires, Quilmes Oeste, 011 4250-0494'},
// {"value": 'Kando, San Luis 516, Neuquén, Neuquen, 0299-4477853 / 0299-6056578.'},
// {"value": 'MOTOMUNDO BELLA VISTA, Salta 1159, Corrientes, Bella Vista, 3777 656492'},
// {"value": 'MOTOMUNDO CURUZU CUATIA, Caa Guazu 720, Corrientes, Curuzu Cuatia, 3772 449012'},
// {"value": 'MOTOMUNDO GDOR .VIRASORO, Mocito Acuña 838, Corrientes, Gdor. Virasoro, 3772 561384'},
// {"value": 'MOTOMUNDO GOYA, Colon 848, Corrientes, Goya, 3772 460799'},
// {"value": 'MOTOMUNDO ITUZAINGO, Belgrano 1611, Corrientes, Ituzaingo, 3772 460802'},
// {"value": 'MOTOMUNDO MONTE CASEROS, Eva Peron 1360, Corrientes, Monte Caseros, 3772 408473'},
// {"value": 'MOTOMUNDO PASO DE LOS LIBRES, Belgrano 1155, Corrientes, Paso De Los Libres, 3772 435271'},
// {"value": 'MOTOMUNDO SALADAS, Sarmiento 802 (Esquina Leopoldo Lugones), Corrientes, Saladas, 3772 503638'},
// {"value": 'MOTOMUNDO SANTA LUCIA, Av. San Martin y Cabo Berdun  (EJIDO NORTE), Corrientes, Santa Lucia, 3772 460801'},
// {"value": 'MOTOMUNDO SANTO TOME, Brasil 960, Corrientes, Santo Tome, 3772 449015'},
// {"value": 'MOTOMUNDO YAPEYU, Paso de Los Patos 477, Corrientes, Yapeyu, 3772 456144'},
// {"value": 'Neo Motos, Junin 1845 entre Cordoba y Bolivar, Misiones, Posadas, 0376 - 4420961/4427445/4437179'},
// {"value": 'Neo Motos, Av Uruguay 3688, Misiones, Posadas, 0376 - 4420961/4427445/4437179'},
// {"value": 'Neo Motos, Av Uruguay y Av Trincheras de San Jose, Misiones, Posadas, 0376 - 4420961/4427445/4437179'},
// {"value": 'Vickmat, Justa Lima de Atucha 1451, Buenos Aires, Zarate, 0348715610754'},
// {"value": 'Mobi motos, Colon 650, Misiones, Posadas, 0376-4424562 /4423021'},
// {"value": 'Moto X Serra, Eva Peron 38, Buenos Aires, Lanus Oeste, 21218018'},
// {"value": 'Fracalossi Motos, Av San Lorenzo Este 84, Entre Ríos, Concordia, 0345-422-7297'},
// {"value": 'Fabian Gonzalez Motos, Galarza 1378, Entre Ríos, Concepción del Uruguay, 03442-430085'},
];

const pickupLocations = pickupLocationsData.map((obj) => {
  const rObj = {};
  rObj.value = obj.value;
  rObj.text = obj.value;
  rObj.value = obj.value;
  rObj.title = obj.title;
  rObj.latitude = obj.latitude;
  rObj.longitude = obj.longitude;
  return rObj;
});

export default pickupLocations;
