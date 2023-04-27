const { Router } = require("express");
const { Activity, Country } = require("../db");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.post("/", async (req, res) => {
  const { countries, name, difficulty, duration, season } = req.body;
  try {
    const id = uuidv4();
    // creamos una nueva act en la base de datos utilizando los parámetros recibidos en el body de la solicitud HTTP
    const createActivity = await Activity.create({
      id,
      name,
      difficulty,
      duration,
      season,
    });
    //buscamos los países correspondientes a los ids enviados en el body de la solicitud HTTP
    const findCountry = await Country.findAll({
      where: {
        id: countries,
      },
    });
     // asociamos los países encontrados con la nueva actividad creada
    await createActivity.addCountries(findCountry);
    // console.log(req.body);
    return res.send("Actividad Creada"); //indica que se creo correctamente
    
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll(); //se buscan todas las acts
    return res.status(200).send(activities);//se envian las acts con un codigo de estado 200
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;


