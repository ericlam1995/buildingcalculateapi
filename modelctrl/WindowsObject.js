const db = require("../connection/firebasecon");
getwindowbyID = async(req, res, next) => {
    let projectid = req.params.id;
    let window = [];
    let object = {};
    const ref = await db.collection('window').where("DesignID", "==", projectid).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                object = { id: doc.id, data: doc.data() }
                window.push(object);
            });
            res.status(200).json(window);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
};

insertwindow = async(req, res, next) => {
    try {
        const window = req.body;
        if (!window) throw new Error('Text is blank');
        const data = {
            WindowName: window.WindowName,
            ConstructionRValue: window.ConstructionRValue,
            Width: window.Width,
            Height: window.Height,
            OWA: window.OWA,
            Area: window.Area,
            DesignID: window.DesignID,
            ProjectID: window.ProjectID,
            UserID: window.UserID,
            DateCreated: window.DateCreated
        };
        const ref = await db.collection('window').add(data);
        res.status(200).json({
            id: ref.id,
            data
        });
    } catch (e) {
        next(e);
    }
};

updatewindow = async(req, res, next) => {
    try {
        const id = req.params.id;
        const window = req.body;
        if (!id) throw new Error('id is blank');
        if (!window) throw new Error('Text is blank');
        const data = {
            WindowName: window.WindowName,
            ConstructionRValue: window.ConstructionRValue,
            Width: window.Width,
            Height: window.Height,
            OWA: window.OWA,
            Area: window.Area,
            DesignID: window.DesignID,
            ProjectID: window.ProjectID,
            UserID: window.UserID
        };
        const ref = await db.collection('window').doc(id).set(data, { merge: true });
        res.status(200).json({
            id,
            data
        });
    } catch (e) {
        next(e);
    }
};

deletewindow = async(req, res, next) => {
    try {

        const Id = req.params.id;

        if (!Id) throw new Error('id is blank');

        await db.collection('window')
            .doc(Id)
            .delete();

        res.status(200).json({
            id: Id,
        })


    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getwindowbyID,
    insertwindow,
    updatewindow,
    deletewindow
};