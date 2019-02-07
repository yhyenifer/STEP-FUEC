# STEPnpm 
SISTEMA DE INFORMACION DE UN MOTOR VEHICULAR DE TRASPORTE ESPECIAL DE PASAJEROS


** instalar bcrypt, para cifrar las contraseñas
> npm install -g node-gyp
> npm install --g --production windows-build-tools
npm --add-python-to-path='true' --debug install --global windows-build-tools
> npm install bcrypt
npm install bcrypt@2.0.1

>npm install ngx-mat-select-search



actualizar masivo una coleccion
*db.conductores.update( {}, { $set: { state: true }}, {multi: true} )
se edita el 
vi /etc/mongod.conf
 -- network interfaces, se debe avilitar la red local 127.0.0.1 y deshabilitar la de la ip
 guardar cambios

restaurar el servicio de mongo 
sudo systemctl restart mongod

entrar a la shel de mongo
mongo
agregar usuario con admin
use admin
db.createUser(
  {
    user: "AdminSammy",
    pwd: "AdminSammy'sSecurePassword",
    roles: [ { role: "readWrite", db: "fuec" } ]
  }
)
volver habilitar la interfa de red de ip
restaurar servicio de mango
levantar firewall del servidor 
sudo ufw allow 27017

probar conexion

