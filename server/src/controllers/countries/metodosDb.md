findAll : es un método de Sequelize que busca todos los registros de la tabla Country.

include: Es para indicar que se deben cargar las relaciones que le pasemos como atributo
ejemplo: include : Activity

attributes: { exclude: ["createdAt", "updatedAt"] } excluye los campos createdAt y updatedAt del resultado.
          : [name, area, poblacion]  puedes seleccionar las columnas especificas.

.get() : mapea todos los resultados que nos devuelve una base de datos y lo transforma en un json limpio para 
         ser leido en javascript.

ejemplo : 
 try {
        let allCountries = await Country.findAll({
            include: Activity,
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        allCountries = allCountries.map(country => country.get());
        return res.status(200).json(allCountries);
    } 

es tan facil como hacer cada objeto de la lista que nos devuelve el findAll, lo mapeemos con un get para transformalo.
y lo vamos a utilizar siempre que queremos obtner la info desde nuestra base de datos para trabajar con js.