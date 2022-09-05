const Sequelize = require('sequelize');

const sequelize = new Sequelize('clase4', 'admin', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('La conexión se ha establecido exitosamente');
  })
  .catch((error) => {
    console.error(
      `No fue posible conectarse a la base de datos: ${sequelize.config.database}`,
      error
    );
  });

class Users extends Sequelize.Model {}

Users.init(
  {
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    edad: Sequelize.INTEGER,
  },
  {
    sequelize,
    modelName: 'usuarios',
  }
);

// Se inserta un registro
sequelize
  .sync()
  .then(() =>
    Users.bulkCreate([
      {
        nombre: 'Fernando',
        apellido: 'Bouchet',
        edad: 33,
      },
      {
        nombre: 'Carlos',
        apellido: 'Rodriguez',
        edad: 40,
      },
      {
        nombre: 'Franco',
        apellido: 'Gomez',
        edad: 38,
      },
      {
        nombre: 'Lorena',
        apellido: 'Garcia',
        edad: 33,
      },
    ]).then(() => {
      console.log('Registros insertados');
    })
  )

  // Se actualizan los registros
  .then(() =>
    Users.update(
      { edad: 32 },
      {
        where: {
          edad: 33,
        },
      }
    )
      .then(() => {
        console.log('Actualizado');
      })
      .catch((error) => {
        console.log(error);
      })
  );
