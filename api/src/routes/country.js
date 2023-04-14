const { Router } = require("express");
const { Activity, Country } = require("../db");
const axios = require("axios");
const router = Router();

const getCountries = async () => {
  const countriesTable = await Country.findAll({
    include: [{ model: Activity }],
  });

  if (countriesTable.length === 0) {
    try {
      const apiUrl = await axios.get("https://restcountries.com/v3/all");
      const apiInfo = await apiUrl.data.map((e) => {
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

      apiInfo.map(async (e) => {
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
      return apiInfo;
    } catch (error) {
      console.log(error);
    }
  } else {
    return countriesTable;
  }
};


router.get("/", async (req, res) => {
  const { name } = req.query;
  const allCountries = await getCountries();
  try {
    if (name) {
      const nameCountry = await allCountries.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      nameCountry.length
        ? res.status(200).json(nameCountry)
        : res.status(404).json("No existe el pais");
    } else {
      res.json(allCountries);
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getCountry = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    })
    return res.send(getCountry)
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;