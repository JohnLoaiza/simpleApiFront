import axios from "axios";
import { apiRoute } from "./configs";
import { Admin } from "./multiProjectLibrary/projectsManager";


export   const getData = async () => {
    const response = await axios.get(`${apiRoute}/${Admin.projectSelected!.props.name}/programas`).catch(() => {
     alert('Problemas con el API, no se pudo conectar')
    });

    if (response) {
     if (response.data.length > 0) {
        console.log('ya existen programas en la bd');
     
     } else {
            programs.forEach(async (p: any) => {
                const indexList =  Object.keys(p.propierties)
                indexList.forEach((i) => {
                    p.propierties[i] =  p.propierties[i] 
                })
                const response = await axios.post(`${apiRoute}/${Admin.projectSelected!.props.name}/programas/insert`, p.propierties).catch(() => {
                    console.log('Error al insertar');
                  });
            })
            console.log('Se insertan programas');
            
     }

    } 

    const response2 = await axios.get(`${apiRoute}/${Admin.projectSelected!.props.name}/universidad`).catch(() => {
        alert('Problemas con el API, no se pudo conectar')
       });
   
       if (response) {
        if (response.data.length > 0) {
           console.log('ya existen programas en la bd');
        
        } else {
               universities.forEach(async (p: any) => {
                const indexList =  Object.keys(p.propierties)
                indexList.forEach((i) => {
                    p.propierties[i] =  p.propierties[i] 
                })
                   const response = await axios.post(`${apiRoute}/${Admin.projectSelected!.props.name}/universidad/insert`, p.propierties).catch(() => {
                       console.log('Error al insertar');
                     });
               })
               console.log('Se insertan universidades');

        }
 
       } 

       const response3 = await axios.get(`${apiRoute}/${Admin.projectSelected!.props.name}/rutas`).catch(() => {
        alert('Problemas con el API, no se pudo conectar')
       });
   
       if (response) {
        if (response.data.length > 0) {
           console.log('ya existen programas en la bd');
        
        } else {
            rutes.forEach(async (p: any) => {
                const indexList =  Object.keys(p.propierties)
                indexList.forEach((i) => {
                    p.propierties[i] =  p.propierties[i] 
                })
                   const response = await axios.post(`${apiRoute}/${Admin.projectSelected!.props.name}/rutas/insert`, p.propierties).catch(() => {
                       console.log('Error al insertar');
                     });
               })
               console.log('Se insertan rutas');

        }
 
       } 
       const response4 = await axios.get(`${apiRoute}/${Admin.projectSelected!.props.name}/users`).catch(() => {
        alert('Problemas con el API, no se pudo conectar')
       });
   
       if (response) {
        if (response.data.length > 0) {
           console.log('ya existen programas en la bd');
        
        } else {
            users.forEach(async (p: any) => {
                const indexList =  Object.keys(p.propierties)
                indexList.forEach((i) => {
                    p.propierties[i] =  p.propierties[i] 
                })
                   const response = await axios.post(`${apiRoute}/${Admin.projectSelected!.props.name}/users/insert`, p.propierties).catch(() => {
                       console.log('Error al insertar');
                     });
               })
               console.log('Se insertan usuarios');

        }
 
       } 
  };



export const universities = [
    {
        "id": "67103895a7270cad8f69fb8d",
        "propierties": {
            "id": "45",
            "nombre": "ITM",
            "tipo": "Educación superior",
            "ciudad": "Medellin"
        }
    },
    {
        "id": "6710612e2d2a523d43846480",
        "propierties": {
            "id": "0",
            "nombre": "UDEA",
            "tipo": "Educacion superior",
            "ciudad": "Medellinnnn"
        }
    }
]

export const rutes = [
    {
        "id": "673e13b3976fbebfca982ed0",
        "propierties": {
            "rol": "Admin",
            "rutas": [
                "universidad",
                "users",
                "programas",
                "rutas"
            ]
        }
    },
    {
        "id": "673e1417976fbebfca982ed1",
        "propierties": {
            "rol": "Profesor",
            "rutas": [
                "Cursos",
                "Estudiantes",
                "Asignaturas",
                "Notas",
                "Evaluaciones"
            ]
        }
    },
    {
        "id": "673e144f976fbebfca982ed2",
        "propierties": {
            "rol": "Estudiante",
            "rutas": [
                "Mis cursos",
                "Liquidación de matricula",
                "Horario"
            ]
        }
    }
]

export const users = [
    {
        "id": "671bf70afb454e862955e071",
        "propierties": {
            "username": "John",
            "password": "$2a$11$BQ8jMrHF5wkBu2tDdOitc.oKUo1YDDJqK2GIbAN6oW8Lyp8yz1jEK",
            "roles": [
                "Profesor",
                "Estudiante"
            ]
        }
    },
    {
        "id": "671c21e44871d60e650b1946",
        "propierties": {
            "username": "Daniel",
            "password": "$2a$11$5WXC9dPL9FyKDDB.VPWIeuFrDt.msS1DwZ7GxIUVS3Y.B165AZThG",
            "roles": [
                "Estudiante"
            ]
        }
    },
    {
        "id": "671c22624871d60e650b1947",
        "propierties": {
            "username": "Mario",
            "password": "$2a$11$rZqAFVcSAbXsXneWDBbyDeuAPkUi70syOrnuQQwA2OIOoeCfihhWS",
            "roles": [
                "Profesor"
            ]
        }
    },
    {
        "id": "672e510a7c1b4ff122232c00",
        "propierties": {
            "username": "Loaiza",
            "password": "$2a$11$MDfZw96bo/tiQUWSXzuvTOn1JTbv673lrppIAWnfcwn3GzDS2PtAy",
            "roles": [
                "Admin",
                "Profesor",
                "Estudiante"
            ]
        }
    },
    {
        "id": "672e59807c1b4ff122232c01",
        "propierties": {
            "username": "Luis",
            "password": "$2a$11$huJRRyTDHtZ3zfy5zXKdReHkX01OGQfSTnD8NAHvSg.RJdFQonlMS",
            "roles": [
                "Estudiante"
            ]
        }
    },
    {
        "id": "673e75ce836b75e9b23e05cd",
        "propierties": {
            "username": "Dora",
            "password": "$2a$11$.mwuMQNwlOf4/Yvh2YFAfOUlsZy8F1cpmH70bqpwix3LaBf0pLR3i",
            "roles": [
                "Estudiante"
            ]
        }
    },
    {
        "id": "673e7613836b75e9b23e05ce",
        "propierties": {
            "username": "Lucho",
            "password": "$2a$11$ULKbKUIHhrs6J9cxUlq.A.B3j6IgRS73CyY9JLSRpoVShxQrg0UsK",
            "roles": [
                "Admin",
                "Profesor"
            ]
        }
    }
]

export var programs: any = [
    {
        "id": "67228d2ad72d463494c19eef",
        propierties: {
            "nombre": "Arquitectura",
            "tipo": "Pregrado",
            "nivel": "Profesional",
            "fecha_creacion": "2015-03-01",
            "fecha_cierre": "2035-03-0111111",
            "numero_cohortes": "20",
            "cant_graduados": "800",
            "fecha_actualizacion": "2023-09-10",
            "ciudad": "Medellín",
            "facultad_id": "20",
            "acreditaciones": [
                {
                    "acreditacion_id": "acreditacion_1",
                    "resolucion": "RES-2018-005",
                    "fecha_inicio": "2018-06-04",
                    "fecha_fin": "2023-06-011"
                },
                {
                    "acreditacion_id": "acreditacion_2",
                    "resolucion": "RES-2021-009",
                    "fecha_inicio": "2021-02-01",
                    "fecha_fin": "2026-02-01"
                }
            ],
            "car_innovacion": [
                {
                    "car_innovacion_id": "innovacion_1",
                    "nombre": "Smart City Project",
                    "descripcion": "Desarrollo de soluciones arquitectónicas sostenibles para ciudades inteligentes.",
                    "contexto": "Aplicable en entornos urbanos"
                },
                {
                    "car_innovacion_id": "innovacion_2",
                    "nombre": "Uso de materiales reciclados",
                    "descripcion": "Investigación sobre la incorporación de materiales reciclados en construcción.",
                    "contexto": "Construcción sostenible"
                }
            ],
            "actividades_academicas": [
                {
                    "actividad_academica_id": "act_acad_1",
                    "tipo": "Taller",
                    "descripcion": "Diseño de espacios públicos",
                    "fecha_inicio": "2023-01-15",
                    "fecha_fin": "2023-06-30",
                    "estado": "En proceso"
                },
                {
                    "actividad_academica_id": "act_acad_2",
                    "tipo": "Seminario",
                    "descripcion": "Sostenibilidad en la arquitectura",
                    "fecha_inicio": "2023-03-01",
                    "fecha_fin": "2023-04-15",
                    "estado": "Completado"
                }
            ],
            "premios": [
                {
                    "premio_id": "premio_1",
                    "nombre": "Premio Nacional de Arquitectura",
                    "descripcion": "Reconocimiento a la mejor obra arquitectónica del año.",
                    "fecha": "2023-10-05",
                    "entidad_otorgante": "Asociación de Arquitectos",
                    "pais": "Colombia"
                }
            ],
            "pasantias": [
                {
                    "pasantia_id": "pasantia_1",
                    "nombre": "Pasantía en diseño arquitectónico",
                    "empresa": "Arquitectura Moderna S.A.",
                    "fecha_inicio": "2023-07-01",
                    "fecha_fin": "2023-12-01"
                },
                {
                    "pasantia_id": "pasantia_2",
                    "nombre": "Pasantía en urbanismo",
                    "empresa": "Planificación Urbana Ltda.",
                    "fecha_inicio": "2023-08-15",
                    "fecha_fin": "2024-01-15"
                }
            ],
            "practicas_estrategias": [
                {
                    "estrategia_id": "estrategia_1",
                    "descripcion": "Implementación de software de modelado 3D",
                    "impacto": "Mejorar la visualización de proyectos"
                },
                {
                    "estrategia_id": "estrategia_2",
                    "descripcion": "Talleres de sostenibilidad",
                    "impacto": "Promover prácticas de diseño sostenible"
                }
            ],
            "registros_calificados": [
                {
                    "registro_calificado_id": "reg_2",
                    "codigo": "RC-002",
                    "fecha": "2022-09-20",
                    "actividades_academicas": [
                        {
                            "actividad_id": "act_2",
                            "nombre": "Taller de técnicas de construcción",
                            "semestre": "2023-1",
                            "estado": "Activo"
                        }
                    ],
                    "enfoques": [
                        {
                            "enfoque_id": "enfoque_1",
                            "descripcion": "Enfoque en diseño sostenible"
                        },
                        {
                            "enfoque_id": "enfoque_2",
                            "descripcion": "Énfasis en urbanismo"
                        }
                    ]
                }
            ],
            "aspectos_formativos": [
                {
                    "aspecto_id": "aspecto_1",
                    "descripcion": "Diseño y planificación urbana"
                },
                {
                    "aspecto_id": "aspecto_2",
                    "descripcion": "Ética profesional en arquitectura"
                },
                {
                    "aspecto_id": "aspecto_3",
                    "descripcion": "Historia de la arquitectura"
                }
            ]
        }
    },
    {
        "id": "67229169d72d463494c19ef0",
        "propierties": {
            "nombre": "Ingeniería de Sistemas",
            "tipo": "Pregrado",
            "nivel": "Profesional",
            "fecha_creacion": "2000-08-01",
            "fecha_cierre": "2030-08-01",
            "numero_cohortes": "30",
            "cant_graduados": "1500",
            "fecha_actualizacion": "2023-07-15",
            "ciudad": "Bogotá",
            "facultad_id": "1",
            "acreditaciones": [
                {
                    "acreditacion_id": "acreditacion_1",
                    "resolucion": "RES-2020-001",
                    "fecha_inicio": "2020-01-01",
                    "fecha_fin": "2025-01-01"
                },
                {
                    "acreditacion_id": "acreditacion_2",
                    "resolucion": "RES-2022-004",
                    "fecha_inicio": "2022-03-15",
                    "fecha_fin": "2027-03-15"
                },
                {
                    "acreditacion_id": "acreditacion_3",
                    "resolucion": "RES-2023-007",
                    "fecha_inicio": "2023-06-10",
                    "fecha_fin": "2028-06-10"
                },
                {
                    "acreditacion_id": "34",
                    "resolucion": "Melooo",
                    "fecha_inicio": "2024-09-18",
                    "fecha_fin": "2025-10-11"
                }
            ],
            "car_innovacion": [
                {
                    "car_innovacion_id": "innovacion_1",
                    "nombre": "Proyecto AI para educación",
                    "descripcion": "Desarrollar una IA que personalice el aprendizaje.",
                    "contexto": "Aplica en contextos de aprendizaje virtual"
                },
                {
                    "car_innovacion_id": "innovacion_2",
                    "nombre": "Sistema de blockchain educativo",
                    "descripcion": "Usar blockchain para verificar certificaciones",
                    "contexto": "Escuelas y universidades"
                }
            ],
            "actividades_academicas": [
                {
                    "actividad_academica_id": "act_acad_1",
                    "tipo": "Investigación",
                    "descripcion": "Estudio de metodologías ágiles",
                    "fecha_inicio": "2023-01-01",
                    "fecha_fin": "2023-12-31",
                    "estado": "En proceso",
                    "aa_rc": {
                        "descripcion": "Investigación aprobada por el comité de ética",
                        "documento": "Doc123.pdffff"
                    }
                },
                {
                    "actividad_academica_id": "act_acad_2",
                    "tipo": "Extensión",
                    "descripcion": "Curso de programación web",
                    "fecha_inicio": "2023-05-01",
                    "fecha_fin": "2023-07-01",
                    "estado": "Completado"
                }
            ],
            "premios": [
                {
                    "premio_id": "premio_1",
                    "nombre": "Premio a la innovación",
                    "descripcion": "Reconocimiento a la mejor innovación en educación",
                    "fecha": "2023-08-10",
                    "entidad_otorgante": "Fundación X",
                    "pais": "Colombia"
                },
                {
                    "premio_id": "premio_2",
                    "nombre": "Premio a la innovación",
                    "descripcion": "Reconocimiento a la mejor innovación en educación",
                    "fecha": "2023-08-10",
                    "entidad_otorgante": "Fundación X",
                    "pais": "México"
                }
            ],
            "pasantias": [
                {
                    "pasantia_id": "pasantia_1",
                    "nombre": "Pasantía en desarrollo de software",
                    "empresa": "TechCorp",
                    "fecha_inicio": "2023-06-01",
                    "fecha_fin": "2023-12-01"
                },
                {
                    "pasantia_id": "pasantia_2",
                    "nombre": "Pasantía en ciencia de datos",
                    "empresa": "DataSolutions",
                    "fecha_inicio": "2023-09-01",
                    "fecha_fin": "2024-02-01"
                }
            ],
            "practicas_estrategias": [
                {
                    "estrategia_id": "estrategia_1",
                    "descripcion": "Implementación de laboratorios virtuales",
                    "impacto": "Mejorar el aprendizaje práctico"
                },
                {
                    "estrategia_id": "estrategia_2",
                    "descripcion": "Talleres de soft skills",
                    "impacto": "Preparar a los estudiantes para el entorno laboral"
                }
            ],
            "registros_calificados": [
                {
                    "registro_calificado_id": "reg_1",
                    "codigo": "RC-0011111",
                    "fecha": "2021-08-15",
                    "actividades_academicas": [
                        {
                            "actividad_id": "act_1",
                            "nombre": "Desarrollo de habilidades digitales",
                            "semestre": "2023-1",
                            "estado": "Activo"
                        }
                    ],
                    "enfoques": [
                        {
                            "enfoque_id": "enfoque_1",
                            "descripcion": "Enfoque en inteligencia artificial"
                        },
                        {
                            "enfoque_id": "enfoque_2",
                            "descripcion": "Énfasis en aplicaciones móviles"
                        }
                    ]
                }
            ],
            "aspectos_formativos": [
                {
                    "aspecto_id": "aspecto_1",
                    "descripcion": "Ética en ingeniería de software"
                },
                {
                    "aspecto_id": "aspecto_2",
                    "descripcion": "Pensamiento crítico y resolución de problemas"
                },
                {
                    "aspecto_id": "aspecto_3",
                    "descripcion": "Capacidades de investigación y análisis de datos"
                }
            ]
        }
    },
    {
        "id": "673b68c8cb27715b01a3938f",
        "propierties": {
            "nombre": "Fisica mecanica",
            "tipo": "Fisica",
            "nivel": "4",
            "fecha_creacion": "2020-20-12",
            "fecha_cierre": "2030-20-12",
            "numero_cohortes": "4",
            "cant_graduados": "405",
            "fecha_actualizacion": "2024-10-18",
            "ciudad": "Medellin",
            "facultad_id": "34",
            "acreditaciones": [
                {
                    "acreditacion_id": "acreditacion_1",
                    "resolucion": "RES-2018-005",
                    "fecha_inicio": "2018-06-04",
                    "fecha_fin": "2023-06-01"
                }
            ],
            "car_innovacion": [
                {
                    "car_innovacion_id": "innovacion_1",
                    "nombre": "Smart City Project",
                    "descripcion": "Desarrollo de soluciones arquitectónicas sostenibles para ciudades inteligentes.",
                    "contexto": "Aplicable en entornos urbanos"
                }
            ],
            "actividades_academicas": [
                {
                    "actividad_academica_id": "act_acad_1",
                    "tipo": "Taller",
                    "descripcion": "Diseño de espacios públicos",
                    "fecha_inicio": "2023-01-15",
                    "fecha_fin": "2023-06-30",
                    "estado": "En proceso"
                }
            ],
            "premios": [
                {
                    "premio_id": "premio_1",
                    "nombre": "Premio Nacional de Arquitectura",
                    "descripcion": "Reconocimiento a la mejor obra arquitectónica del año.",
                    "fecha": "2023-10-05",
                    "entidad_otorgante": "Asociación de Arquitectos",
                    "pais": "Colombia"
                }
            ],
            "pasantias": [
                {
                    "pasantia_id": "pasantia_1",
                    "nombre": "Pasantía en diseño arquitectónico",
                    "empresa": "Arquitectura Moderna S.A.",
                    "fecha_inicio": "2023-07-01",
                    "fecha_fin": "2023-12-01"
                }
            ],
            "practicas_estrategias": [
                {
                    "estrategia_id": "estrategia_1",
                    "descripcion": "Implementación de software de modelado 3D",
                    "impacto": "Mejorar la visualización de proyectos"
                }
            ],
            "registros_calificados": [
                {
                    "registro_calificado_id": "reg_2",
                    "codigo": "RC-002",
                    "fecha": "2022-09-20",
                    "actividades_academicas": [
                        {
                            "actividad_id": "act_2",
                            "nombre": "Taller de técnicas de construcción",
                            "semestre": "2023-1",
                            "estado": "Activo"
                        }
                    ],
                    "enfoques": [
                        {
                            "enfoque_id": "enfoque_1",
                            "descripcion": "Enfoque en diseño sostenible"
                        },
                        {
                            "enfoque_id": "enfoque_2",
                            "descripcion": "Énfasis en urbanismo"
                        }
                    ]
                }
            ],
            "aspectos_formativos": [
                {
                    "aspecto_id": "aspecto_1",
                    "descripcion": "Diseño y planificación urbana"
                }
            ]
        }
    }
]