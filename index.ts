import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

"use strict"
admin.initializeApp()
const db = admin.firestore();


export const nuevoGrupoHandler=functions.firestore
.document('/grupos/{idDoc}')
.onCreate(async(snapshot,context)=>{
    const idDoc=snapshot.id;
    const dataDelDocumento=snapshot.data();
    const idAuth=dataDelDocumento?.uid ?? "Hacker";
    const fecha=context.timestamp;
    const batch =db.batch();

    const referenciaMeta=db.collection("/gruposMeta").doc(idDoc);
    const referenciaAdmin=db.collection("/gruposAdmin").doc(idDoc);
    const referenciaVistaPrevia=db.collection("/gruposVistaPrevia").doc(idDoc);

    
    batch.set(referenciaMeta,{
        "fecha":fecha,
        "creador":idAuth,
        "privacidad":dataDelDocumento?.privacidad ?? "publico",
        "etiquetas":dataDelDocumento?.etiquetas ?? []
    });
    batch.set(referenciaAdmin,{
        "creador":idAuth});
    batch.set(referenciaVistaPrevia,{
        "imagenUrl":dataDelDocumento?.imagenUrl ?? "", 
        "nombre":dataDelDocumento?.nombre ?? "", 
        "descripcion":dataDelDocumento?.descripcion ?? "",
    });    

    await batch.commit();
});

export const modificarGrupoHandler=functions.firestore
.document('/grupos/{idDoc}')
.onUpdate(async (change, context) => {
    const antes=change.before;
    const despues=change.after;
    const idDoc=antes.id;
    const dataDelDocumento=despues.data();
    const fecha=context.timestamp;
    const batch =db.batch();

    const referenciaMeta=db.collection("/gruposMeta").doc(idDoc);
    const referenciaAdmin=db.collection("/gruposAdmin").doc(idDoc);
    const referenciaVistaPrevia=db.collection("/gruposVistaPrevia").doc(idDoc);

    
    batch.update(referenciaMeta,{
        "fecha":fecha,
        "privacidad":dataDelDocumento?.privacidad ?? "publico",
        "etiquetas":dataDelDocumento?.etiquetas ?? []
    });
    batch.update(referenciaAdmin,{
        "ultimaModificacion":fecha}
    );
    
    batch.update(referenciaVistaPrevia,{
        "imagenUrl":dataDelDocumento?.imagenUrl ?? "", 
        "nombre":dataDelDocumento?.nombre ?? "", 
        "descripcion":dataDelDocumento?.descripcion ?? "",
    })
    await batch.commit();
});


export const nuevoOrganizacionHandler=functions.firestore
.document('/organizacion/{idDoc}')
.onCreate(async(snapshot,context)=>{
    const idDoc=snapshot.id;
    const dataDelDocumento=snapshot.data();
    const idAuth=dataDelDocumento?.uid ?? "Hacker";
    const fecha=context.timestamp;
    const batch =db.batch();

    const referenciaMeta=db.collection("/organizacionMeta").doc(idDoc);
    const referenciaAdmin=db.collection("/organizacionAdmin").doc(idDoc);
    const referenciaVistaPrevia=db.collection("/organizacionVistaPrevia").doc(idDoc);

    
    batch.set(referenciaMeta,{
        "fecha":fecha,
        "creador":idAuth,
        "privacidad":dataDelDocumento?.privacidad ?? "publico",
        "etiquetas":dataDelDocumento?.etiquetas ?? []
    });
    batch.set(referenciaAdmin,{
        "creador":idAuth});
    batch.set(referenciaVistaPrevia,{
        "imagenUrl":dataDelDocumento?.imagenUrl ?? "", 
        "nombre":dataDelDocumento?.nombre ?? "", 
        "descripcion":dataDelDocumento?.descripcion ?? "",
    });    

    await batch.commit();
});

export const modificarOrganizacionHandler=functions.firestore
.document('/organizacion/{idDoc}')
.onUpdate(async (change, context) => {
    const antes=change.before;
    const despues=change.after;
    const idDoc=antes.id;
    const dataDelDocumento=despues.data();
    const fecha=context.timestamp;
    const batch =db.batch();

    const referenciaMeta=db.collection("/organizacionMeta").doc(idDoc);
    const referenciaAdmin=db.collection("/organizacionAdmin").doc(idDoc);
    const referenciaVistaPrevia=db.collection("/organizacionVistaPrevia").doc(idDoc);

    
    batch.update(referenciaMeta,{
        "fecha":fecha,
        "privacidad":dataDelDocumento?.privacidad ?? "publico",
        "etiquetas":dataDelDocumento?.etiquetas ?? []
    });
    batch.update(referenciaAdmin,{
        "ultimaModificacion":fecha}
    );
    
    batch.update(referenciaVistaPrevia,{
        "imagenUrl":dataDelDocumento?.imagenUrl ?? "", 
        "nombre":dataDelDocumento?.nombre ?? "", 
        "descripcion":dataDelDocumento?.descripcion ?? "",
    })
    await batch.commit();
});


//Para crear un grupo dentro de una organziación
export const nuevoGrupoEnOrganizacionHandler=functions.firestore
.document('/organizacion/{idDocOrganizacion}/grupos/{idDocGrupo}')
.onCreate(async(snapshot,context)=>{
    const idDoc=snapshot.id;
    const dataDelDocumento=snapshot.data();
    const fecha=context.timestamp;
    const batch =db.batch();

    //Principales Actores
    const idAuth=dataDelDocumento?.uid ?? "Hacker"; //El que realizo la peticion
    //const uidBeneficiado=dataDelDocumento?.uidBeneficiado ?? "Hacker";  //El que recibira el grupo
    //const idDocOrganizacion=context.params.idDocOrganizacion; //Organizacion que desea crear el grupo
    //const idDocGrupo=context.params.idDocGrupo; //Grupo a crear
    
    
    //Referencias
    const referenciaMeta=db.collection("/gruposMeta").doc(idDoc);
    const referenciaAdmin=db.collection("/gruposAdmin").doc(idDoc);
    const referenciaVistaPrevia=db.collection("/gruposVistaPrevia").doc(idDoc);
    
    //Datos a enviar
    batch.set(referenciaMeta,{
        "fecha":fecha,
        "creador":idAuth,
        "privacidad":dataDelDocumento?.privacidad ?? "publico",
        "etiquetas":dataDelDocumento?.etiquetas ?? []
    });
    batch.set(referenciaAdmin,{
        "creador":idAuth});
    batch.set(referenciaVistaPrevia,{
        "imagenUrl":dataDelDocumento?.imagenUrl ?? "", 
        "nombre":dataDelDocumento?.nombre ?? "", 
        "descripcion":dataDelDocumento?.descripcion ?? "",
    });    
    await batch.commit();

});

export const modificarGrupoEnOrganizacionHandler=functions.firestore
.document('/organizacion/{idDocOrganizacion}/grupos/{idDocGrupo}')
.onUpdate(async (change, context) => {
    const antes=change.before;
    const despues=change.after;
    const idDoc=antes.id;
    const dataDelDocumento=despues.data();
    const fecha=context.timestamp;
    const batch =db.batch();

    const referenciaMeta=db.collection("/gruposMeta").doc(idDoc);
    const referenciaAdmin=db.collection("/gruposAdmin").doc(idDoc);
    const referenciaVistaPrevia=db.collection("/gruposVistaPrevia").doc(idDoc);

    
    batch.update(referenciaMeta,{
        "fecha":fecha,
        "privacidad":dataDelDocumento?.privacidad ?? "publico",
        "etiquetas":dataDelDocumento?.etiquetas ?? []
    });
    batch.update(referenciaAdmin,{
        "ultimaModificacion":fecha}
    );
    
    batch.update(referenciaVistaPrevia,{
        "imagenUrl":dataDelDocumento?.imagenUrl ?? "", 
        "nombre":dataDelDocumento?.nombre ?? "", 
        "descripcion":dataDelDocumento?.descripcion ?? "",
    })
    await batch.commit();
});

//Para manejar los permisos del grupo
export const nuevoPermisoGrupoEnOrganizacionHandler=functions.firestore
.document('/organizacion/{idDocOrganizacion}/grupos/{idDocGrupo}/permisos/{uidBeneficiado}')
.onCreate(async(snapshot,context)=>{
    //const idDoc=snapshot.id;
    const dataDelDocumento=snapshot.data();
    //const fecha=context.timestamp;
    const batch =db.batch();

    //Principales Actores
    //const idAuth=dataDelDocumento?.uid ?? "Hacker"; //El que realizo la peticion
    const uidBeneficiado=snapshot.id ?? "Hacker";  //El que recibira el grupo
    const idDocOrganizacion=snapshot.ref.parent.parent?.parent.id ?? "blacklist"; //Organizacion que desea crear el grupo
    const idDocGrupo=snapshot.ref.parent.parent?.id ?? "blacklist"; //Grupo a crear
    
    //Referencias
    const referenciaPermisosUsuario=db.collection("/usuario").doc(uidBeneficiado)
    .collection("/permisos").doc(idDocGrupo);
    const referenciaPermisosGrupos=db.collection("/organizaciones").doc(idDocOrganizacion)
    .collection("/grupos").doc(idDocGrupo).collection("/permisos").doc(uidBeneficiado);
    


    //Datos a enviar
    batch.set(referenciaPermisosUsuario,{
        "tipo":dataDelDocumento?.tipo ?? "",
        "rango":dataDelDocumento?.rango ?? "",
        "organizacion":idDocOrganizacion ?? "",
        "grupo":idDocGrupo ?? "",
    })
    batch.set(referenciaPermisosGrupos,{
        "nombre":dataDelDocumento?.nombre ?? "", //Nombre de la persona
        "correo":dataDelDocumento?.correo ?? "",//Correo de la persona
        "tipo":dataDelDocumento?.tipo ?? "",
        "rango":dataDelDocumento?.rango ?? "",
        "uid":dataDelDocumento?.uid ?? "",//Quien realiza la peticion
        "uidBeneficiado":dataDelDocumento?.uidBeneficiado ?? "", //Quien recibe el permiso
    })
    await batch.commit();

});

export const modificarPermisoGrupoEnOrganizacionHandler=functions.firestore
.document('/organizacion/{idDocOrganizacion}/grupos/{idDocGrupo}/permisos/{uidBeneficiado}')
.onUpdate(async (change, context) => {
    //const antes=change.before;
    const despues=change.after;
    //const idDoc=antes.id;
    const dataDelDocumento=despues.data();
    //const fecha=context.timestamp;
    const batch =db.batch();

    //Principales Actores
    //const idAuth=dataDelDocumento?.uid ?? "Hacker"; //El que realizo la peticion
    //const idAuth=dataDelDocumento?.uid ?? "Hacker"; //El que realizo la peticion
    const uidBeneficiado=despues.id ?? "Hacker";  //El que recibira el grupo
    const idDocOrganizacion=despues.ref.parent.parent?.parent.id ?? "blacklist"; //Organizacion que desea crear el grupo
    const idDocGrupo=despues.ref.parent.parent?.id ?? "blacklist"; //Grupo a crear
    
    
    //Referencias
    const referenciaPermisosUsuario=db.collection("/usuario").doc(uidBeneficiado)
    .collection("/permisos").doc(idDocGrupo);
    const referenciaPermisosGrupos=db.collection("/organizaciones").doc(idDocOrganizacion)
    .collection("/grupos").doc(idDocGrupo).collection("/permisos").doc(uidBeneficiado);
    


    //Datos a enviar
    batch.set(referenciaPermisosUsuario,{
        "tipo":dataDelDocumento?.tipo ?? "",
        "rango":dataDelDocumento?.rango ?? "",
        "organizacion":dataDelDocumento?.organizacion ?? "",
        "grupo":dataDelDocumento?.grupo ?? "",
    })
    batch.set(referenciaPermisosGrupos,{
        "nombre":dataDelDocumento?.nombre ?? "", //Nombre de la persona
        "correo":dataDelDocumento?.correo ?? "",//Correo de la persona
        "tipo":dataDelDocumento?.tipo ?? "",
        "rango":dataDelDocumento?.rango ?? "",
        "uid":dataDelDocumento?.uid ?? "",//Quien realiza la peticion
        "uidBeneficiado":dataDelDocumento?.uidBeneficiado ?? "", //Quien recibe el permiso
    })
    await batch.commit();

});


//Para manejar los permisos de la organizacion
export const nuevoPermisoOrganizacionHandler=functions.firestore
.document('/organizacion/{idDocOrganizacion}/permiso/{uidBeneficiado}')
.onCreate(async(snapshot,context)=>{
    //const idDoc=snapshot.id;
    const dataDelDocumento=snapshot.data();
    //const fecha=context.timestamp;
    const batch =db.batch();

    //Principales Actores
    //const idAuth=dataDelDocumento?.uid ?? "Hacker"; //El que realizo la peticion
    const uidBeneficiado=snapshot.id;  //El que recibira el grupo
    const idDocGrupo=snapshot.ref.parent.parent?.id ?? "Blacklist" ; //Grupo a crear
    
    
    //Referencias
    const referenciaPermisosUsuario=db.collection("usuario").doc(uidBeneficiado)
    .collection("permiso").doc(idDocGrupo);

    //Datos a enviar
    batch.set(referenciaPermisosUsuario,{
        "tipo":dataDelDocumento?.tipo ?? "",
        "rango":dataDelDocumento?.rango ?? "",
        "organizacion":idDocGrupo ?? "",
        "grupo":dataDelDocumento?.grupo ?? "",
    })
    await batch.commit();
});

export const modificarPermisoOrganizacionHandler=functions.firestore
.document('/organizacion/{idDocOrganizacion}/permiso/{uidBeneficiado}')
.onUpdate(async (change, context) => {
    //const antes=change.before;
    const despues=change.after;
    //const idDoc=antes.id;
    const dataDelDocumento=despues.data();
    //const fecha=context.timestamp;
    const batch =db.batch();

    //Principales Actores
    //const idAuth=dataDelDocumento?.uid ?? "Hacker"; //El que realizo la peticion
    const uidBeneficiado=despues.id;  //El que recibira el grupo
    const idDocOrganizacion=despues.ref.parent.parent?.id ?? "Blacklist" ; //Grupo a crear
    
    
    //Referencias
    const referenciaPermisosUsuario=db.collection("/usuario").doc(uidBeneficiado)
    .collection("/permiso").doc(idDocOrganizacion);
    
    //Datos a enviar
    batch.set(referenciaPermisosUsuario,{
        "tipo":dataDelDocumento?.tipo ?? "",
        "rango":dataDelDocumento?.rango ?? "",
        "organizacion":idDocOrganizacion ?? "",
        "grupo":dataDelDocumento?.grupo ?? "",
    })
    await batch.commit();

});