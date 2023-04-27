const { Router } = require("express");
const { Activity, Country } = require("../db");
const axios = require("axios");
const router = Router();

const getCountries = async () => {
  const countriesTable = await Country.findAll({
    include: [{ model: Activity }], // // Busca todos los países en la tabla "Country" junto con sus actividades asociadas 
  });

  if (countriesTable.length === 0) {   //si no se encuentra ninguno en la tabla 
    try {
      const apiUrl = await axios.get("https://restcountries.com/v3/all"); // // llamamos a la apo externa para obtener info de todos los paises
      const apiInfo = await apiUrl.data.map((e) => {  //// Mapeamos la respuesta de la api para crear un objeto con la info que necesitamos
        return {
          name: e.name.common,
          id: e.cca3,
          flag: e.flags[1],
          continent: e.continents[0],
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        };
      });

      apiInfo.map(async (e) => { //// mapeamos la infor obtenida de la api para crear o actualizar cada pais en la tabla "Country" usando sql
        await Country.findOrCreate({
          where: {
            id: e.id,
            name: e.name.toUpperCase(),
            flag: e.flag,
            continent: e.continent,
            capital: e.capital ? e.capital[0] : "Capital not found",
            subregion: e.subregion ? e.subregion : "Subregion not found",
            area: e.area,
            population: e.population,
          },
        });
      });
      return apiInfo; // dvulve la info
    } catch (error) {
      console.log(error);
    }
  } else {
    return countriesTable;
  }
};





router.get("/", async (req, res) => {
  const { name } = req.query;
  const allCountries = await getCountries();  //busca todos los países 
  try {
    if (name) {               //si el parámetro de consulta "name" está presente
      const nameCountry = await allCountries.filter((e) =>  // filtra los países que 
                                                          //incluyen el valor de "name" en su nombre y devuelve el resultado
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      nameCountry.length
        ? res.status(200).json(nameCountry)
        : res.status(404).json("No existe el pais");
    } else {
      res.json(allCountries);  //Si el parámetro de consulta no está presente, devuelve todos los países en la base de datos
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id; //se extrae el id de la solicitud HTTP 
  
  try {                                           //busca un registro en la tabla 
    const getCountry = await Country.findByPk(id, { //"Country" que tenga el valor del 
                                                    //campo "id" igual al valor del 
                                                    //parámetro "id"
      include: { // incluye las act asociadas al pais
        model: Activity,
      },
    })
    return res.send(getCountry) //devuelve la respuesta 
  } catch (error) {
    console.log(error);
  }
  
});

router.get("/name", async (req, res) => {
  const name = req.query.name; // Obtener el valor de la query "name" enviada en la solicitud HTTP

  try {
    const countries = await Country.findAll({
      where: {
        // Buscar en la columna "name" un valor que incluya (LIKE) el texto enviado en la query "name"
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [{ model: Activity }], // Incluir las actividades asociadas a los países encontrados
    });

    if (countries.length === 0) { // Si no se encontraron países, enviar una respuesta adecuada
      return res.status(404).send({ error: "No se encontraron países con ese nombre" });
    }

    return res.status(200).send(countries); // Enviar los países encontrados
  } catch (error) {
    return res.status(400).send({ error: error.message }); // Enviar un mensaje de error si hubo algún problema en la búsqueda
  }
});




module.exports = router;