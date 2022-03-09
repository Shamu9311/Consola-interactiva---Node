const Tarea = require('./tarea')
const colors = require('colors');
/**
 *  _listado
 *      { 'uuid-445654-4564-65-456: {id: 12, desc:asadasd, completadoEn: 798494}}
 *      { 'uuid-445654-4564-65-456: {id: 12, desc:asadasd, completadoEn: 798494}}
 *      { 'uuid-445654-4564-65-456: {id: 12, desc:asadasd, completadoEn: 798494}}
 */

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            listado.push( this._listado[key] );
        })

        return listado;
    }
    constructor(){
        this._listado = {};
    }


    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray ( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }


    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );
        this._listado[ tarea.id ] = tarea;
    }

    listadoCompleto(){
        let i = 1;
        let salida = ''
        this.listadoArr.forEach(tarea => {
            if( tarea.completadoEn){
                salida += `${colors.blue(i)}${':'.blue} ${colors.blue(tarea.desc)} :: ${'Completada'.green} | Pendiente\n`
            } else{
                salida += `${colors.blue(i)}${':'.blue} ${colors.blue(tarea.desc)} :: Completado | ${'Pendiente'.red }\n`
            }
            i++;
        });
        return salida;
    }

    listadoCompleto2(){
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });
    }

    listarPendientesCompletadas( completada = true ){
        console.log();
        let idx = 0;
        this.listadoArr.forEach( (tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;
            if( completada ){
                if( tarea.completadoEn ){
                    idx += 1;
                    console.log(`${ (idx + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            }else{
                if( !tarea.completadoEn ){
                    idx += 1;
                    console.log(`${ (idx + '.').green } ${ desc } :: ${ estado }`);
                }
            }
        });
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;

            }
        });
    }

}

module.exports = Tareas;