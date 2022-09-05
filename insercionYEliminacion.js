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

// Insercion del registro
sequelize
  .sync()
  .then(() =>
    Users.create({
      nombre: 'Pedro',
      apellido: 'Gonzalez',
      edad: 44,
    }).then((response) => {
      console.log('Se creo el registro', response.toJSON());
    })
  )

  // Se elimina el registro
  .then(() =>
    Users.destroy({
      where: {
        apellido: 'Gonzalez',
      },
    }).then(() => {
      console.log('Registro eliminado');
    })
  );
