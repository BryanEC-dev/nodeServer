const Usuario = require("../models/usuario")

const express = require("express");
const app = express(); 
const bcrypt = require("bcrypt");
const _ = require("underscore");

app.get("/usuario", function (req, res) {

    let desde = Number(req.query.desde || 0);
    let cantidad = Number(req.query.desde || 5);

    Usuario.find({})
            .skip(desde)
            .limit(cantidad)
            .exec( (err , usuarios) => {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  err
                })
              }

              Usuario.count({} , (err, conteo) => {
                return res.json({
                  ok: true,
                  cantidad : conteo,
                  usuario: usuarios,
                });
              })
              
              
            }) 
});

app.post("/usuario", function (req, res) {
  let body = req.body;
 
  // se crea una nueva instancia del esquema
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10), // encriptando la contraseña 
    role: body.role,
  });


  // grabar el usuaio en la base de datos
  usuario.save((err, usuarioDB) => {
    if(err) {
        return res.status(400).json({
            ok: false,
            err
        })
    }
    return res.json({
      ok: true,
      usuario: usuarioDB,
    });

  });

});

app.put("/usuario/:id", function (req, res) {
  // obtener parametro
   let id = req.params.id;

   // por medio del paquete underscore determinamos que valores vamos a tomar del req.body
   let body =   _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

   // busca y actualiza los valores
   Usuario.findByIdAndUpdate(
     id,
     body,
     { new: true, runValidators: true },
     (err, usuarioDB) => {
       if (err) {
         return res.status(400).json({
           ok: false,
           err,
         });
       }

       res.json({
         ok: true,
         usuario: usuarioDB,
       });
     }
   );
 
 
 

});

app.delete("/usuario/:id", function (req, res) {
  let id = req.params.id;

  // por medio del paquete underscore determinamos que valores vamos a tomar del req.body
  let cambiaEstado = {
    estado : false
  }

  // busca y actualiza los valores
  Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );  
  

});


module.exports = app;