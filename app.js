const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, inquirerPausa, leerInput, listadoTareasBorras, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

require('colors');

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                break;
            case '2':
                //console.log(tareas.listadoCompleto());
                tareas.listadoCompleto2();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorras( tareas.listadoArr );
                if( id !== '0'){
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
                break;

                
        }

        guardarDB( tareas.listadoArr );

        await inquirerPausa();
    }while(opt !== '0')

}

main();