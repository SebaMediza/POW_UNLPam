const User = require("../model/usuario-model.js");
const Tarjeta = require("../model/tarjeta-model.js");

var admin = require("firebase-admin");
var FCM = require("fcm-node");
var serviceAccount = require("../bananatv-46374-firebase-adminsdk-1o4cu-021962a036.json")
const centerPath = admin.credential.cert(serviceAccount);
var fcm = new FCM(centerPath);


exports.registro = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "datos vacios!"
        });
    }
    const user = new User({
        nombre: req.body.nombre,
        mail: req.body.mail,
        password: req.body.password,
        tipoPlan: req.body.tipoPlan
    });

    const tarjeta = new Tarjeta({
        nroTarjeta: req.body.nroTarjeta,
        vencimiento: req.body.vencimiento,
        ccv: req.body.ccv,
        idUsuario: '',   //cambiar por la consulta a la bd para saber cual es el usaurio que la carga
    });
    User.registro(user, tarjeta, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "error al crear el nuevo usuario."
            });
        else res.send(data);
    });

};

exports.login = (req, res) => {
    const user = new User({
        nombre: req.body.nombre,
        mail: req.body.mail,
        password: req.body.password
    });
    User.login(user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `usuario no encontrado`
                });
            } else {
                res.status(500).send({
                    message: "error al buscar nombre"
                });
            }
        } else {
            //res.sendStatus(data);
            res.status(200).json({ message: "Inicio de sesión exitoso", data });

        }
    });

}

exports.enviarNotificacion = (req, res) => {

    User.notification((err, users) => {
        console.log(users);

        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }

        const tokens = users.map(user => user.token).filter(token => !!token);

        tokens.forEach(token => {
            const message = {
                to: token,
                notification: {
                    title: 'No te pierdas los nuevos lanzamientos',
                    body: 'Lo mejor esta por llegar a BananaTV'
                }
            };

            fcm.send(message, (err, res) => {
                if (err) {
                    console.error('¡Algo salió mal al enviar la notificación a', token, '!', err);
                } else {
                    console.log('Notificación enviada exitosamente a', token, 'con respuesta:', res);
                }
            });
        });
        res.status(200).json({ message: 'Notificaciones enviadas correctamente.' });


        /* const payload = {
            notification: {
                title: '¡No te pierdas los nuevos lanzamientos',
                body: 'Descubre las ultimas peliculas y series que tenemos para ti'
            },
            //token: tokens
        }
        admin.messaging().sendToDevice(tokens, payload)
            .then(response => {
                console.log('Notificaciones enviadas correctamente:', response);
                res.status(200).json({ message: 'Notificaciones enviadas correctamente.' });
            })
            .catch(error => {
                console.error('Error al enviar notificaciones:', error);
                res.status(500).json({ error: 'Error al enviar notificaciones.' });
            }); */
    });
}