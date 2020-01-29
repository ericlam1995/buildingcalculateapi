const db = require("../connection/firebasecon");
getroomhabitbydesignid = (req, res, next) => {
    let designid = req.params.id;
    let floormodel = [];
    let object = {};
    db.collection('roomhabit').where("DesignID", "==", designid).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                object = { id: doc.id, data: doc.data() }
                floormodel.push(object);
            });
            res.json(floormodel);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
};

updateroomhabit = (req, res, next) => {
    try {
        const id = req.params.id;
        const room = req.body;
        if (!id) throw new Error('id is blank');
        if (!room) throw new Error('Text is blank');
        const data = {
            RoomID: room.RoomID,
            RoomType: room.RoomType,
            RoomArea: room.RoomArea,
            WindowList: room.WindowList,
            ProjectID: room.ProjectID,
            DesignID: room.DesignID,
            UserID: room.UserID
        };
        const ref = db.collection('roomhabit').doc(id).set(data, { merge: true });
        res.json({
            id,
            data
        });
    } catch (e) {
        next(e);
    }
};

postroomhabit = (req, res, next) =>{
    try {
        const room = req.body;
        if (!room) throw new Error('Text is blank');
        const data = {
            RoomID: room.RoomID,
            RoomType: room.RoomType,
            RoomArea: room.RoomArea,
            WindowList: room.WindowList,
            ProjectID: room.ProjectID,
            DesignID: room.DesignID,
            UserID: room.UserID
        };
        const ref = db.collection('roomhabit').add(data);
        res.json({
            id: ref.id,
            data
        });
    } catch (e) {
        next(e);
    }
};

deleteroomhabit = (req, res, next) => {
    try {

        const Id = req.params.id;

        if (!Id) throw new Error('id is blank');

        db.collection('roomhabit')
            .doc(Id)
            .delete();

        res.json({
            id: Id,
        })


    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getroomhabitbydesignid,
    updateroomhabit,
    postroomhabit,
    deleteroomhabit,
};