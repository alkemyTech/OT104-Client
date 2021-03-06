jest.mock("../../../Services/activitiesService")

const createActivity = jest.fn().mockImplementation((fetchBody) => {
    if(
        (typeof fetchBody.name === "string" || typeof fetchBody.name === "null") &&
        (typeof fetchBody.slug === "string" || typeof fetchBody.slug === "null") &&
        (typeof fetchBody.image === "string" || typeof fetchBody.image === "null") &&
        (typeof fetchBody.description === "string" || typeof fetchBody.description === "null") &&
        (typeof fetchBody.created_at === "string" || typeof fetchBody.created_at === "null") &&
        (typeof fetchBody.updated_at === "string" || typeof fetchBody.updated_at === "null") &&
        (typeof fetchBody.id === "number" || typeof fetchBody.id === "null") &&
        (typeof fetchBody.user_id === "number" || typeof fetchBody.user_id === "null") &&
        (typeof fetchBody.category_id === "number" || typeof fetchBody.category_id === "null") &&
        (typeof fetchBody.deleted_at === "string" || typeof fetchBody.deleted_at === "null")
    )
        return {
            data:{
                success:true
            }
        }
    else
        return {
            data:{
                success:false
            }
        }
})
const updateActivity = jest.fn().mockImplementation((id, fetchBody) => {
    if(
        (typeof fetchBody.name === "string" || typeof fetchBody.name === "null") &&
        (typeof fetchBody.slug === "string" || typeof fetchBody.slug === "null") &&
        (typeof fetchBody.image === "string" || typeof fetchBody.image === "null") &&
        (typeof fetchBody.description === "string" || typeof fetchBody.description === "null") &&
        (typeof fetchBody.created_at === "string" || typeof fetchBody.created_at === "null") &&
        (typeof fetchBody.updated_at === "string" || typeof fetchBody.updated_at === "null") &&
        (typeof fetchBody.id === "number" || typeof fetchBody.id === "null") &&
        (typeof fetchBody.user_id === "number" || typeof fetchBody.user_id === "null") &&
        (typeof fetchBody.category_id === "number" || typeof fetchBody.category_id === "null") &&
        (typeof fetchBody.deleted_at === "string" || typeof fetchBody.deleted_at === "null")
    )
        return {
            data:{
                success:true
            }
        }
    else
        return {
            data:{
                success:false
            }
        }
})

const getActivity = jest.fn((id) => {
    if(typeof id === "number"){
        return {
            data:{
                data:{
                    category_id: 0,
                    created_at: "2021-11-30T19:35:04.000000Z",
                    deleted_at: null,
                    description: "El espacio de apoyo escolar es el coraz??n del ??rea educativa. Se realizan los talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el contraturno, Los s??bados tambi??n se realiza el taller para ni??os y ni??as que asisten a la escuela doble turno. Tenemos un espacio especial para los de 1er grado 2 veces por semana ya que ellos necesitan atenci??n especial! Actualmente se encuentran inscriptos a este programa 150 ni??os y ni??as de 6 a 15 a??os. Este taller est?? pensado para ayudar a los alumnos con el material que traen de la escuela, tambi??n tenemos una docente que les da clases de lengua y matem??tica con una planificaci??n propia que armamos en Manos para nivelar a los ni??os y que vayan con m??s herramientas a la escuela.",
                    group_id: null,
                    id: 932,
                    image: "http://ongapi.alkemy.org/storage/QrL9bAS2Yu.jpeg",
                    name: "Apoyo Escolar para el nivel Primario",
                    slug: "string",
                    updated_at: "2021-11-30T19:35:04.000000Z",
                    user_id: 0
                }
            }
        }
    }
    return undefined;
})

export {
    createActivity,
    updateActivity,
    getActivity
}

